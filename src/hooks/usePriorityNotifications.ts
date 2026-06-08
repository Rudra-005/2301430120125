import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllNotifications, type NotificationListParams, type NotificationCollectionResponse } from '@/services/notificationService';
import { getTopNotifications } from '@/utils/ranking';
import { notificationQueryKeys } from '@/state/notificationQueries';
import type { Notification, NotificationType } from '@/types/notification';

export interface UsePriorityNotificationsOptions {
  readonly notificationType?: NotificationType;
  readonly page?: number;
  readonly limit?: number;
  readonly topN?: number;
  readonly enabled?: boolean;
  readonly referenceTime?: Date;
}

export function usePriorityNotifications({
  notificationType,
  page = 1,
  limit = 10,
  topN = 5,
  enabled = true,
  referenceTime,
}: UsePriorityNotificationsOptions = {}) {
  const params: NotificationListParams = {
    notification_type: notificationType,
    page,
    limit,
  };

  const query = useQuery({
    queryKey: notificationQueryKeys.lists(params as unknown as Record<string, unknown>),
    queryFn: () => getAllNotifications(params),
    placeholderData: (prev: NotificationCollectionResponse | undefined) => prev,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled,
  });

  const notifications: Notification[] = query.data?.data ?? [];

  const priorityNotifications = useMemo(
    () => getTopNotifications(notifications, topN, referenceTime),
    [notifications, topN, referenceTime],
  );

  return {
    priorityNotifications,
    notificationCount: notifications.length,
    page,
    limit,
    topN,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    data: query.data,
  };
}
