import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { env } from '@/env';

export enum LogStack {
  Frontend = 'FRONTEND',
  UI = 'UI',
  API = 'API',
  AUTH = 'AUTH',
  Data = 'DATA',
  SYSTEM = 'SYSTEM',
}

export enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warning = 'WARNING',
  Error = 'ERROR',
  Fatal = 'FATAL',
}

export enum LogPackage {
  Affordmed = 'AFFORDMED',
  Notifications = 'NOTIFICATIONS',
  Shared = 'SHARED',
  Component = 'COMPONENT',
}

export interface LogPayload {
  readonly stack: LogStack;
  readonly level: LogLevel;
  readonly package: LogPackage;
  readonly message: string;
  readonly timestamp: string;
  readonly context?: Record<string, unknown>;
}

export interface LogResponse {
  readonly logID: string;
  readonly status: string;
  readonly message?: string;
}

import { getAccessToken } from '@/services/authService';

const loggerClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

loggerClient.interceptors.request.use(
  async config => {
    try {
      const token = await getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[Logger] Failed to get access token for logging', err);
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

loggerClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export async function Log(
  stack: LogStack,
  level: LogLevel,
  packageName: LogPackage,
  message: string,
  context?: Record<string, unknown>,
): Promise<string | null> {
  const payload: LogPayload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString(),
    ...(context ? { context } : {}),
  };

  try {
    const response: AxiosResponse<LogResponse> = await loggerClient.post('/logs', payload);
    return response.data?.logID ?? null;
  } catch (error) {
    // Fail gracefully: preserve the error but do not break application flow.
    // eslint-disable-next-line no-console
    if (import.meta.env.DEV) {
      console.warn('[Logger] Failed to send log', error);
    }
    return null;
  }
}
