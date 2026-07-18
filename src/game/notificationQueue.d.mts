export interface NotificationEntry {
  message: string;
  duration: number;
}

export interface NotificationState {
  notification: string;
  notificationTimer: number;
  notificationQueue: NotificationEntry[];
}

export const DEFAULT_NOTIFICATION_DURATION: number;

export function enqueueNotification(
  state: NotificationState,
  message: string,
  duration?: number,
): NotificationState;

export function tickNotificationState(
  state: NotificationState,
  dt: number,
): NotificationState;
