import { Container } from '@mui/material';
import { AppShell } from '@/components/layout/AppShell';
import { AppRoutes } from './AppRoutes';

function App() {
  return (
    <AppShell>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <AppRoutes />
      </Container>
    </AppShell>
  );
}

export default App;
