import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/env';
import { getAccessToken, clearToken } from '@/services/authService';

export interface ApiError {
  readonly status?: number;
  readonly message: string;
  readonly details?: unknown;
  readonly originalError?: unknown;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip auth for the /auth endpoint itself
    if (config.url?.includes('/auth')) {
      return config;
    }

    try {
      const token = await getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[API] Failed to get access token', err);
      }
    }

    return config;
  },
  error => Promise.reject(normalizeAxiosError(error)),
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.info(
        `[API] ✓ ${response.config.method?.toUpperCase() ?? 'UNKNOWN'} ${response.config.url}`,
        { status: response.status },
      );
    }
    return response;
  },
  async error => {
    const config = error.config as RetryConfig | undefined;
    // If we get a 401, clear the token and retry once
    if (axios.isAxiosError(error) && error.response?.status === 401 && config && !config._retried) {
      clearToken();
      config._retried = true;
      try {
        const token = await getAccessToken();
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return axiosClient(config);
      } catch (retryErr) {
        return Promise.reject(normalizeAxiosError(retryErr));
      }
    }

    if (import.meta.env.DEV) {
      const url = axios.isAxiosError(error) ? error.config?.url : 'UNKNOWN';
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      console.error(`[API] ✗ ${url}`, { status, message: error?.message });
    }
    return Promise.reject(normalizeAxiosError(error));
  },
);

function normalizeAxiosError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const serverMessage =
      responseData && typeof responseData === 'object' && 'message' in responseData
        ? String((responseData as Record<string, unknown>).message)
        : undefined;

    return {
      status: error.response?.status,
      message:
        serverMessage ??
        error.message ??
        'An unexpected network error occurred.',
      details: error.response?.data,
      originalError: error,
    };
  }

  return {
    message: error instanceof Error ? error.message : String(error ?? 'Unknown error'),
    originalError: error,
  };
}

export default axiosClient;
export type { AxiosRequestConfig, AxiosResponse, AxiosError };
