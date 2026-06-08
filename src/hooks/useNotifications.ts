import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllNotifications, type NotificationListParams, type NotificationCollectionResponse } from '@/services/notificationService';
import type { Notification, NotificationType } from '@/types/notification';
import { notificationQueryKeys } from '@/state/notificationQueries';
import { rankNotificationsByPriority } from '@/utils/ranking';

const DEFAULT_PAGE_SIZE = 10;

export function useNotifications() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationType | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [topN, setTopN] = useState(5);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_PAGE_SIZE);

  // Main list feed query (standard page size 10)
  const params: NotificationListParams = {
    limit,
    page,
    notification_type: selectedCategory,
  };

  const query = useQuery({
    queryKey: notificationQueryKeys.lists(params as unknown as Record<string, unknown>),
    queryFn: () => getAllNotifications(params),
    placeholderData: (prev: NotificationCollectionResponse | undefined) => prev,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  // Sidebar query (gets at least 20 items to allow slicing up to topN = 20)
  const topParams: NotificationListParams = {
    limit: Math.max(20, topN),
    notification_type: selectedCategory,
  };

  const topQuery = useQuery({
    queryKey: ['notifications', 'top-sidebar', topParams],
    queryFn: () => getAllNotifications(topParams),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const notifications: Notification[] = query.data?.data ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const filteredNotifications = useMemo(() => {
    const normalizedTerm = searchQuery.trim().toLowerCase();
    if (!normalizedTerm) {
      return notifications;
    }

    return notifications.filter(notification => notification.title.toLowerCase().includes(normalizedTerm));
  }, [notifications, searchQuery]);

  const topNotificationsRaw = topQuery.data?.data ?? [];
  const topNotifications = useMemo(() => {
    const ranked = rankNotificationsByPriority(topNotificationsRaw, { topN });
    const normalizedTerm = searchQuery.trim().toLowerCase();
    if (!normalizedTerm) {
      return ranked;
    }
    return ranked.filter(notification => notification.title.toLowerCase().includes(normalizedTerm));
  }, [topNotificationsRaw, topN, searchQuery]);

  const priorityNotifications = useMemo(() => {
    return rankNotificationsByPriority(filteredNotifications);
  }, [filteredNotifications]);

  const unreadCount = useMemo(
    () => filteredNotifications.filter(notification => !notification.viewed).length,
    [filteredNotifications],
  );

  return {
    notifications: filteredNotifications,
    priorityNotifications,
    topNotifications,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    topN,
    setTopN,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    unreadCount,
    isLoading: query.isLoading || topQuery.isLoading,
    isFetching: query.isFetching || topQuery.isFetching,
    isError: query.isError || topQuery.isError,
    error: query.error || topQuery.error,
    refetch: () => {
      query.refetch();
      topQuery.refetch();
    },
  };
}
