import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNotification } from '@/hooks/useNotification';

export default function NotificationDetailsPage() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const { notification, isLoading, isError } = useNotification(notificationId);

  const hasNotification = useMemo(() => Boolean(notification), [notification]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !hasNotification || !notification) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4" gutterBottom>
          Notification not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Return home</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {notification.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {notification.category} • {new Date(notification.createdAt).toLocaleString()}
          </Typography>
          <Typography sx={{ mt: 2 }}>{notification.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
