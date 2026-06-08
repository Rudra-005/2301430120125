import { Box, Button, Paper, Typography } from '@mui/material';
import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      component={Paper}
      role="alert"
      elevation={3}
      sx={{
        p: 4,
        m: 4,
        textAlign: 'center',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        An unexpected error occurred while loading the page.
      </Typography>
      <Typography variant="body2" color="error" sx={{ mb: 3 }}>
        {error?.message ?? 'Please try again.'}
      </Typography>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </Box>
  );
}
