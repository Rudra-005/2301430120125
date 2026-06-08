import { Box, CircularProgress, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface LoaderProps {
  message?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export default function Loader({ message = 'Loading…', size = 40, sx = {} }: LoaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '240px',
        textAlign: 'center',
        px: 2,
        ...((typeof sx === 'function' ? sx : sx) as object),
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}
