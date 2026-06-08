import axiosClient from './axiosClient';
import type { AxiosResponse } from 'axios';
import type { NotificationApiResponse, NotificationQueryParams, ApiResponse } from '@/types/api';
import type { Notification } from '@/types/notification';

export type NotificationResponse = ApiResponse<Notification>;

export async function getNotifications(params: NotificationQueryParams): Promise<NotificationApiResponse> {
  try {
    const response = await axiosClient.get<NotificationApiResponse>('/notifications', {
      params,
    });

    return response.data;
  } catch (error) {
    console.error('[notificationApi] getNotifications failed', error);
    throw error;
  }
}

export async function getNotificationById(id: string): Promise<NotificationResponse> {
  try {
    const response = await axiosClient.get<NotificationResponse>(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('[notificationApi] getNotificationById failed', error);
    throw error;
  }
}

export async function getUnreadNotifications(params: Omit<NotificationQueryParams, 'unread'> = {}): Promise<NotificationApiResponse> {
  try {
    const response = await axiosClient.get<NotificationApiResponse>('/notifications', {
      params: {
        ...params,
        unread: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error('[notificationApi] getUnreadNotifications failed', error);
    throw error;
  }
}

export async function markAsRead(id: string): Promise<NotificationResponse> {
  try {
    const response = await axiosClient.patch<NotificationResponse>(`/notifications/${id}/read`, {
      read: true,
    });

    return response.data;
  } catch (error) {
    console.error('[notificationApi] markAsRead failed', error);
    throw error;
  }
}
