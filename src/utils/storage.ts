const VIEWED_KEY = 'campus-notifications-viewed';

export function loadViewedNotifications() {
  const stored = window.localStorage.getItem(VIEWED_KEY);
  if (!stored) return [] as string[];

  try {
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function saveViewedNotifications(ids: string[]) {
  window.localStorage.setItem(VIEWED_KEY, JSON.stringify(ids));
}
