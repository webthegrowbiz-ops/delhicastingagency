"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { API_URL } from "@/config/env";
import { getAuthToken } from "@/lib/auth";
import { NotificationDropdown } from "./NotificationDropdown";
import type { NotificationItem } from "./notification-utils";

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className = "" }: NotificationBellProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // 1. FETCH UNREAD NOTIFICATION COUNT
  // ============================================================
  const fetchUnreadCount = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        success: boolean;
        count?: number;
      };

      if (data.success && typeof data.count === "number") {
        setUnreadCount(data.count);
      }
    } catch {
      // Silent failure for badge background polling
    }
  }, []);

  // Fetch unread count on mount & set up intermittent polling (every 30s)
  useEffect(() => {
    let active = true;

    const runFetch = () => {
      if (active) {
        void fetchUnreadCount();
      }
    };

    runFetch();
    const interval = setInterval(runFetch, 30000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [fetchUnreadCount]);

  // ============================================================
  // 2. FETCH FULL NOTIFICATION LIST WHEN DROPDOWN OPENS
  // ============================================================
  const fetchNotifications = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setError("Authentication token required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        notifications?: NotificationItem[];
      };

      if (response.ok && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        // Refresh unread count from returned list
        const actualUnread = data.notifications.filter((n) => !n.isRead).length;
        setUnreadCount(actualUnread);
      } else {
        setError(data.message || "Unable to load notifications.");
      }
    } catch {
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle Popover Dropdown
  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      fetchNotifications();
    } else {
      setIsOpen(false);
    }
  };

  // ============================================================
  // 3. MARK SINGLE NOTIFICATION AS READ
  // ============================================================
  const handleMarkRead = async (id: string) => {
    const token = getAuthToken();
    if (!token) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true, readAt: new Date().toISOString() } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      const response = await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Revert or refresh on failure
        fetchNotifications();
      }
    } catch {
      fetchNotifications();
    }
  };

  // ============================================================
  // 4. MARK ALL NOTIFICATIONS AS READ
  // ============================================================
  const handleMarkAllRead = async () => {
    const token = getAuthToken();
    if (!token) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, readAt: new Date().toISOString() }))
    );
    setUnreadCount(0);

    try {
      const response = await fetch(`${API_URL}/api/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        fetchNotifications();
      }
    } catch {
      fetchNotifications();
    }
  };

  // ============================================================
  // 5. ENTITY NAVIGATION HANDLING
  // ============================================================
  const handleNavigate = (entityType?: string | null) => {
    setIsOpen(false);

    if (entityType === "APPLICATION") {
      router.push("/dashboard");
    } else if (entityType === "CASTING_CALL") {
      router.push("/casting-calls");
    } else if (entityType === "ARTIST_PROFILE") {
      router.push("/dashboard");
    }
  };

  // ============================================================
  // 6. OUTSIDE CLICK & ESCAPE KEY EVENT LISTENERS
  // ============================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Format Badge Text (e.g. 99+)
  const badgeText = unreadCount > 99 ? "99+" : unreadCount.toString();

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* NOTIFICATION BELL BUTTON */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#111111] hover:border-[#D4AF37] hover:bg-[#F7F7F5] transition cursor-pointer shadow-2xs"
      >
        <Bell size={18} className="text-[#111111] group-hover:text-[#D4AF37] transition" />

        {/* UNREAD BADGE */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4AF37] px-1.5 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50 duration-200">
            {badgeText}
          </span>
        )}
      </button>

      {/* NOTIFICATION DROPDOWN POPOVER */}
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          loading={loading}
          error={error}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onClose={() => setIsOpen(false)}
          onRetry={fetchNotifications}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
