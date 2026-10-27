export interface StoreNotification {
  id: string;
  title: string;
  message: string;
}

export const STORE_NOTIFICATIONS: StoreNotification[] = [
  {
    id: "welcome",
    title: "Welcome to Tamilnadu.shop",
    message: "Browse refurbished laptops from leading brands.",
  },
  {
    id: "demo-catalog",
    title: "Demo catalog",
    message: "Product listings are sample data. Order and delivery updates are not connected yet.",
  },
];

const STORAGE_KEY = "tamilnadu_read_notifications";
const SERVER_SNAPSHOT: string[] = [];
const listeners = new Set<() => void>();
let currentSnapshot: string[] | null = null;

function readSnapshot(): string[] {
  if (currentSnapshot) return currentSnapshot;

  try {
    const savedIds = localStorage.getItem(STORAGE_KEY);
    if (savedIds) {
      const parsedIds: unknown = JSON.parse(savedIds);
      if (Array.isArray(parsedIds) && parsedIds.every((id) => typeof id === "string")) {
        currentSnapshot = parsedIds;
        return currentSnapshot;
      }
      console.error("Saved notification state is invalid.");
    }
  } catch (error) {
    console.error("Failed to load notification state:", error);
  }

  currentSnapshot = [];
  return currentSnapshot;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;

  if (!event.newValue) {
    currentSnapshot = [];
  } else {
    try {
      const parsedIds: unknown = JSON.parse(event.newValue);
      if (Array.isArray(parsedIds) && parsedIds.every((id) => typeof id === "string")) {
        currentSnapshot = parsedIds;
      } else {
        console.error("Saved notification state is invalid.");
        currentSnapshot = [];
      }
    } catch (error) {
      console.error("Failed to load notification state:", error);
      currentSnapshot = [];
    }
  }
  notifyListeners();
}

export function subscribeToNotifications(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", handleStorageChange);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageChange);
    }
  };
}

export function getNotificationsSnapshot() {
  return readSnapshot();
}

export function getServerNotificationsSnapshot() {
  return SERVER_SNAPSHOT;
}

export function markNotificationRead(notificationId: string) {
  const readIds = readSnapshot();
  if (readIds.includes(notificationId)) return;

  currentSnapshot = [...readIds, notificationId];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSnapshot));
  } catch (error) {
    console.error("Failed to save notification state:", error);
  }
  notifyListeners();
}

export function markAllNotificationsRead() {
  currentSnapshot = STORE_NOTIFICATIONS.map((notification) => notification.id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSnapshot));
  } catch (error) {
    console.error("Failed to save notification state:", error);
  }
  notifyListeners();
}
