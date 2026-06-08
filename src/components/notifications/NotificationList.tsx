import { Grid, Typography } from '@mui/material';
import type { Notification } from '@/types/notification';
import NotificationCard from './NotificationCard';
import Loader from '@/components/common/Loader';
import EmptyState from '@/components/common/EmptyState';

interface NotificationListProps {
  notifications: Notification[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export default function NotificationList({
  notifications,
  isLoading = false,
  isError = false,
  error = null,
  onRetry,
}: NotificationListProps) {
  if (isLoading) {
    return <Loader message="Loading notifications..." />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load notifications"
        description={error?.message ?? 'An error occurred while fetching notifications.'}
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (notifications.length === 0) {
    return <EmptyState title="No notifications" description="There are no notifications to display." />;
  }

  return (
    <Grid container spacing={2}>
      {notifications.map(notification => (
        <Grid key={notification.id} item xs={12} sm={6} md={12}>
          <NotificationCard notification={notification} />
        </Grid>
      ))}
    </Grid>
  );
}
