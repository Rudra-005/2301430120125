import type { Notification, NotificationType } from '@/types/notification';

export type PriorityScore = number;

export interface RankedNotification extends Notification {
  readonly typeWeight: number;
  readonly recencyScore: number;
  readonly priorityScore: PriorityScore;
}

export const notificationTypeWeights: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const RECENCY_SCORE_MAX = 5;
export const RECENCY_WINDOW_HOURS = 24;

export function getTypeWeight(type: NotificationType): number {
  return notificationTypeWeights[type] ?? 0;
}

export function calculateRecencyScore(timestamp: string, referenceTime = new Date()): number {
  const eventTime = new Date(timestamp);
  if (Number.isNaN(eventTime.getTime())) {
    return 0;
  }

  const elapsedHours = Math.max(0, (referenceTime.getTime() - eventTime.getTime()) / 3600000);
  const decayStep = RECENCY_WINDOW_HOURS / RECENCY_SCORE_MAX;
  return Math.max(0, RECENCY_SCORE_MAX - Math.floor(elapsedHours / decayStep));
}

export function calculatePriorityScore(notification: Notification, referenceTime = new Date()): PriorityScore {
  const typeWeight = getTypeWeight(notification.category);
  const recencyScore = calculateRecencyScore(notification.createdAt, referenceTime);
  return typeWeight + recencyScore;
}

export function rankNotificationsByPriority(
  notifications: Notification[],
  options?: { topN?: number; referenceTime?: Date },
): RankedNotification[] {
  const referenceTime = options?.referenceTime ?? new Date();

  const scoredNotifications = notifications.map(notification => {
    const typeWeight = getTypeWeight(notification.category);
    const recencyScore = calculateRecencyScore(notification.createdAt, referenceTime);
    const priorityScore = typeWeight + recencyScore;

    return {
      ...notification,
      typeWeight,
      recencyScore,
      priorityScore,
    };
  });

  scoredNotifications.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    if (b.typeWeight !== a.typeWeight) {
      return b.typeWeight - a.typeWeight;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (options?.topN !== undefined) {
    return scoredNotifications.slice(0, options.topN);
  }

  return scoredNotifications;
}

export function getTopNotifications(notifications: Notification[], topN: number, referenceTime?: Date) {
  return rankNotificationsByPriority(notifications, { topN, referenceTime });
}
