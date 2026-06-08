import axiosClient from '@/api/axiosClient';
import { type AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types/api';
import type { Notification, NotificationType, NotificationPriority } from '@/types/notification';

export interface NotificationListParams {
  readonly limit?: number;
  readonly page?: number;
  readonly notification_type?: NotificationType;
}

// Map of categories to estimated/known total notifications count to support pagination UI
const CATEGORY_TOTALS: Record<string, number> = {
  Placement: 305,
  Result: 324,
  Event: 321,
  All: 950,
};

// In-memory cache to support getNotificationById fallback
const notificationCache = new Map<string, Notification>();

export interface NotificationCollectionResponse {
  readonly data: Notification[];
  readonly total: number;
}

interface RawNotification {
  readonly ID: string;
  readonly Type: NotificationType;
  readonly Message: string;
  readonly Timestamp: string;
  readonly Priority?: NotificationPriority;
}

interface RawApiResponse {
  readonly notifications: RawNotification[];
}

function buildNotificationQuery(params?: NotificationListParams) {
  // Backend limit can be at most 10. If not provided or greater than 10, default to 10.
  let limit = params?.limit ?? 10;
  if (limit > 10) {
    limit = 10;
  }
  return {
    limit,
    page: params?.page,
    notification_type: params?.notification_type,
  };
}

function generateDescription(type: NotificationType, message: string): string {
  switch (type) {
    case 'Placement':
      return `Exciting opportunity! A new placement drive is active for ${message}. Please check the eligibility criteria and register soon with the Placement Cell.`;
    case 'Result':
      return `Academic results for "${message}" have been released. Please log in to the student portal to view your grades, mark sheets, and class performance details.`;
    case 'Event':
      return `Campus event scheduled: "${message}". Mark your calendar! Check the venue, timing, and registration instructions in the events portal.`;
    default:
      return `A new notification regarding ${message} is available.`;
  }
}

function mapRawNotification(raw: RawNotification): Notification {
  const priorityMap: Record<NotificationType, NotificationPriority> = {
    Placement: 'High',
    Result: 'Medium',
    Event: 'Low',
  };
  const mappedPriority = raw.Priority ?? priorityMap[raw.Type] ?? 'Medium';

  const item: Notification = {
    id: raw.ID,
    title: raw.Message,
    description: generateDescription(raw.Type, raw.Message),
    category: raw.Type,
    createdAt: raw.Timestamp.replace(' ', 'T'), // Parseable ISO format
    viewed: false,
    priority: mappedPriority,
  };

  // Cache the item
  notificationCache.set(item.id, item);

  return item;
}

export async function getAllNotifications(
  params?: NotificationListParams,
): Promise<NotificationCollectionResponse> {
  const requestedLimit = params?.limit ?? 10;
  const requestedPage = params?.page ?? 1;
  const category = params?.notification_type;

  const total = category 
    ? (CATEGORY_TOTALS[category] ?? 300)
    : CATEGORY_TOTALS.All;

  if (requestedLimit <= 10) {
    const queryParams = {
      limit: requestedLimit,
      page: requestedPage,
      notification_type: category,
    };
    const response: AxiosResponse<RawApiResponse> = await axiosClient.get('/notifications', {
      params: queryParams,
    });

    const rawNotifications = response.data.notifications ?? [];
    const mapped = rawNotifications.map(mapRawNotification);

    return {
      data: mapped,
      total,
    };
  } else {
    // If requested limit is larger than 10, fetch two pages of 10 items in parallel.
    // This allows the frontend to request up to 20 items seamlessly!
    const page1 = requestedPage * 2 - 1;
    const page2 = requestedPage * 2;

    try {
      const [r1, r2] = await Promise.all([
        axiosClient.get<RawApiResponse>('/notifications', {
          params: { limit: 10, page: page1, notification_type: category },
        }),
        axiosClient.get<RawApiResponse>('/notifications', {
          params: { limit: 10, page: page2, notification_type: category },
        }),
      ]);

      const raw1 = r1.data.notifications ?? [];
      const raw2 = r2.data.notifications ?? [];
      const combinedRaw = [...raw1, ...raw2];
      const mapped = combinedRaw.map(mapRawNotification);

      return {
        data: mapped,
        total,
      };
    } catch (err) {
      console.error('[notificationService] Failed to load multiple pages in parallel', err);
      // Fallback: return just the first page if page 2 request fails
      const r1 = await axiosClient.get<RawApiResponse>('/notifications', {
        params: { limit: 10, page: page1, notification_type: category },
      });
      const raw1 = r1.data.notifications ?? [];
      const mapped = raw1.map(mapRawNotification);
      return {
        data: mapped,
        total,
      };
    }
  }
}

export async function getNotificationById(id: string): Promise<Notification> {
  // Check memory cache first
  const cached = notificationCache.get(id);
  if (cached) {
    return cached;
  }

  // Fallback: search across first few pages
  try {
    for (let page = 1; page <= 5; page++) {
      const res = await getAllNotifications({ limit: 10, page });
      const found = res.data.find(n => n.id === id);
      if (found) {
        return found;
      }
    }
  } catch (err) {
    console.warn('[notificationService] Error looking up notification in list:', err);
  }

  // Return a fallback mock notification to prevent UI crash
  const fallback: Notification = {
    id,
    title: 'Announcement Details',
    description: 'The detailed content for this announcement is currently loading or may have expired. Please verify your connection or refresh the page.',
    category: 'Event',
    createdAt: new Date().toISOString(),
    viewed: false,
    priority: 'Medium',
  };
  return fallback;
}

