import axios from 'axios';
import { env } from '@/env';

interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Gets a valid access token, automatically refreshing if expired.
 * The Afford Medical API tokens expire every ~15 minutes.
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && tokenExpiresAt > now + 60_000) {
    return cachedToken;
  }

  // Request a new token
  const response = await axios.post<AuthResponse>(
    `${env.apiBaseUrl}/auth`,
    {
      clientID: env.clientId,
      clientSecret: env.clientSecret,
      email: env.authEmail,
      name: env.authName,
      rollNo: env.authRollNo,
      accessCode: env.authAccessCode,
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    },
  );

  cachedToken = response.data.access_token;
  // expires_in is a Unix timestamp (seconds), convert to ms
  tokenExpiresAt = response.data.expires_in * 1000;

  if (import.meta.env.DEV) {
    console.info('[Auth] ✓ New token obtained, expires at', new Date(tokenExpiresAt).toLocaleString());
  }

  return cachedToken;
}

/**
 * Clears the cached token, forcing a refresh on next request.
 */
export function clearToken(): void {
  cachedToken = null;
  tokenExpiresAt = 0;
}
