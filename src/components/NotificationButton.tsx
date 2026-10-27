"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Bell } from "lucide-react";
import {
  getNotificationsSnapshot,
  getServerNotificationsSnapshot,
  markAllNotificationsRead,
  markNotificationRead,
  STORE_NOTIFICATIONS,
  subscribeToNotifications,
} from "@/data/notifications";
import styles from "./NotificationButton.module.css";

export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const readNotificationIds = useSyncExternalStore(
    subscribeToNotifications,
    getNotificationsSnapshot,
    getServerNotificationsSnapshot
  );
  const unreadCount = STORE_NOTIFICATIONS.filter(
    (notification) => !readNotificationIds.includes(notification.id)
  ).length;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.trigger}
        onClick={handleToggle}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={isOpen}
        aria-controls="store-notifications"
        type="button"
      >
        <Bell size={22} strokeWidth={1.8} className={styles.icon} />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <section
          className={styles.panel}
          id="store-notifications"
          aria-label="Notifications"
        >
          <div className={styles.panelHeader}>
            <h2 className={styles.title}>Notifications</h2>
            {unreadCount > 0 && (
              <button
                className={styles.markRead}
                onClick={markAllNotificationsRead}
                type="button"
              >
                Mark all read
              </button>
            )}
          </div>

          {STORE_NOTIFICATIONS.length > 0 ? (
            <ul className={styles.list}>
              {STORE_NOTIFICATIONS.map((notification) => {
                const isRead = readNotificationIds.includes(notification.id);
                return (
                  <li key={notification.id}>
                    <button
                      className={`${styles.notification} ${isRead ? styles.read : ""}`}
                      onClick={() => markNotificationRead(notification.id)}
                      aria-label={`${isRead ? "Read" : "Mark as read"}: ${notification.title}`}
                      type="button"
                    >
                      <span className={styles.statusDot} aria-hidden="true" />
                      <span className={styles.content}>
                        <span className={styles.notificationTitle}>{notification.title}</span>
                        <span className={styles.message}>{notification.message}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>You&apos;re all caught up.</p>
          )}
        </section>
      )}
    </div>
  );
}
