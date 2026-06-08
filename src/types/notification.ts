export type NotificationType = 'Placement' | 'Result' | 'Event';

export type NotificationPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface NotificationResponse {
  readonly ID: string;
  readonly Type: NotificationType;
  readonly Message: string;
  readonly Timestamp: string;
  readonly Priority?: NotificationPriority;
}

export interface Notification {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: NotificationType;
  readonly createdAt: string;
  readonly viewed?: boolean;
  readonly priority?: NotificationPriority;
}

export interface PriorityNotification extends Notification {
  readonly priority: NotificationPriority;
  readonly isPriority: true;
}
