import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  title?: string;
  retryLabel?: string;
  children?: ReactNode;
}

export default function ErrorMessage({
  message,
  onRetry,
  title = 'An error occurred',
  retryLabel = 'Retry',
  children,
}: ErrorMessageProps) {
  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Alert severity="error" action={onRetry ? <Button color="inherit" size="small" onClick={onRetry}>{retryLabel}</Button> : undefined}>
        <AlertTitle>{title}</AlertTitle>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {message}
        </Typography>
        {children && <Box sx={{ mt: 1 }}>{children}</Box>}
      </Alert>
    </Box>
  );
}
