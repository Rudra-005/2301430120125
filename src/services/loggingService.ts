export function logInfo(message: string, metadata?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.info('[Logging]', message, metadata ?? {});
  }
}

export function logError(message: string, error?: unknown) {
  if (import.meta.env.DEV) {
    console.error('[Logging]', message, error);
  }
}
