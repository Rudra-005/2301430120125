import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <Typography variant="h2" gutterBottom>
        404 — Page Not Found
      </Typography>
      <Typography sx={{ mb: 3 }}>The page you are looking for does not exist.</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go home</Button>
    </Box>
  );
}
