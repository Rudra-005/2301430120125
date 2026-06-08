export const notificationQueryKeys = {
  all: ['notifications'] as const,
  lists: (filters?: Record<string, unknown>) => [...notificationQueryKeys.all, 'list', filters] as const,
  details: (id: string) => [...notificationQueryKeys.all, 'detail', id] as const,
};
