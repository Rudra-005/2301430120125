import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { Notification } from '@/types/notification';
import NotificationCard from './NotificationCard';

interface PrioritySectionProps {
  notifications: Notification[];
  topNotifications: Notification[];
}

export default function PrioritySection({ notifications, topNotifications }: PrioritySectionProps) {
  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Top Notifications</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Highlighted based on priority and recency.
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          {topNotifications.length === 0 ? (
            <Typography>No top notifications available.</Typography>
          ) : (
            topNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Priority Feed</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Priority notifications are grouped by placement and result updates.
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          {notifications.length === 0 ? (
            <Typography>No priority notifications available.</Typography>
          ) : (
            notifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
