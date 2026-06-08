import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Campus Notifications</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
