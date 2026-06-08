import type { Notification, NotificationType } from '@/types/notification';

export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
}

export interface PaginationParams {
  readonly page?: number;
  readonly limit?: number;
}

export interface PaginationMeta {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  readonly meta: PaginationMeta;
}

export interface ApiError {
  readonly status?: number;
  readonly message: string;
  readonly details?: unknown;
  readonly code?: string;
  readonly originalError?: unknown;
}

export interface NotificationApiResponse extends PaginatedApiResponse<Notification[]> {}

export interface NotificationQueryParams extends PaginationParams {
  readonly notification_type?: NotificationType;
  readonly unread?: boolean;
}
