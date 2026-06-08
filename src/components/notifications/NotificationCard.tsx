import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Notification } from '@/types/notification';

interface NotificationCardProps {
  notification: Notification;
  href?: string;
}

export default function NotificationCard({ notification, href }: NotificationCardProps) {
  const formattedDate = new Date(notification.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card
      variant="outlined"
      role="article"
      aria-labelledby={`notification-title-${notification.id}`}
      sx={{
        mb: 2,
        borderLeft: theme => {
          const colors: Record<string, string> = {
            Placement: theme.palette.placement?.main ?? '#10b981',
            Result: theme.palette.result?.main ?? '#f59e0b',
            Event: theme.palette.event?.main ?? '#8b5cf6',
          };
          return `6px solid ${colors[notification.category] || theme.palette.primary.main}`;
        },
        transition: theme => theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          boxShadow: theme => theme.shadows[4],
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={href ?? `/notifications/${notification.id}`}
        aria-label={`View notification details for ${notification.title}`}
      >
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1}
          >
            <Typography
              id={`notification-title-${notification.id}`}
              component="h3"
              variant="h6"
              sx={{ fontWeight: 600 }}
              noWrap
            >
              {notification.title}
            </Typography>
            <Stack direction="row" spacing={1}>
              {notification.priority && (
                <Chip
                  label={notification.priority}
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    borderColor: theme => {
                      const colors: Record<string, string> = {
                        Critical: theme.palette.critical?.main ?? '#ef4444',
                        High: theme.palette.secondary.main,
                        Medium: theme.palette.info.main,
                      };
                      return colors[notification.priority!] || theme.palette.text.secondary;
                    },
                    color: theme => {
                      const colors: Record<string, string> = {
                        Critical: theme.palette.critical?.main ?? '#ef4444',
                        High: theme.palette.secondary.main,
                        Medium: theme.palette.info.main,
                      };
                      return colors[notification.priority!] || theme.palette.text.secondary;
                    },
                  }}
                />
              )}
              <Chip
                label={notification.category}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  backgroundColor: theme => {
                    const colors: Record<string, string> = {
                      Placement: theme.palette.placement?.main ?? '#10b981',
                      Result: theme.palette.result?.main ?? '#f59e0b',
                      Event: theme.palette.event?.main ?? '#8b5cf6',
                    };
                    return colors[notification.category] || theme.palette.primary.main;
                  },
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {notification.description}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            {formattedDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
