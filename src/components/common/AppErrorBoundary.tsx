import { ErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { Log, LogLevel, LogPackage, LogStack } from '@/logging/logger';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        void Log(LogStack.Frontend, LogLevel.Error, LogPackage.Component, 'Unhandled React error', {
          error: error instanceof Error ? error.message : String(error),
          info,
        });
      }}
      onReset={() => {
        // Reset logic can be handled here if additional state is needed
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
