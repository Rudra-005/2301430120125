import { useQuery } from '@tanstack/react-query';
import { getNotificationById } from '@/services/notificationService';
import { notificationQueryKeys } from '@/state/notificationQueries';
import type { Notification } from '@/types/notification';

interface UseNotificationResult {
  notification?: Notification;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export function useNotification(id?: string): UseNotificationResult {
  const query = useQuery({
    queryKey: id ? notificationQueryKeys.details(id) : ['notifications', 'detail', 'unknown'],
    queryFn: () => getNotificationById(id ?? ''),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    notification: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
