import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, backgroundColor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Campus Notifications. Built with React and Material UI.
        </Typography>
      </Container>
    </Box>
  );
}
