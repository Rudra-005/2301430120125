const getEnv = (key: string, fallback?: string): string => {
  const value = import.meta.env[key] as string | undefined;
  if (value && value.trim() !== '') {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(`Missing required environment variable: ${key}`);
};

export const env = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'http://4.224.186.213/evaluation-service'),
  clientId: getEnv('VITE_CLIENT_ID', ''),
  clientSecret: getEnv('VITE_CLIENT_SECRET', ''),
  authEmail: getEnv('VITE_AUTH_EMAIL', ''),
  authName: getEnv('VITE_AUTH_NAME', ''),
  authRollNo: getEnv('VITE_AUTH_ROLL_NO', ''),
  authAccessCode: getEnv('VITE_AUTH_ACCESS_CODE', ''),
};

export type Env = typeof env;
