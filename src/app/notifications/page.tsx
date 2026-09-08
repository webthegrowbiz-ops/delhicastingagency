"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  RefreshCw,
  BellOff,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { API_URL } from "@/config/env";
import { getAuthToken, isUserAuthenticated, clearDCAUserSession } from "@/lib/auth";
import {
  type NotificationItem,
  getNotificationIcon,
  getRelativeTime,
} from "@/components/notifications/notification-utils";

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setNotifications([]);
      setLoading(false);
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

      // Discard response if user switched while request was in-flight
      if (response.status === 401) {
        clearDCAUserSession();
        setNotifications([]);
        router.push("/login");
        return;
      }

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        notifications?: NotificationItem[];
      };

      if (getAuthToken() !== token) return;

      if (response.ok && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        setError(data.message || "Failed to fetch notifications.");
      }
    } catch {
      setError("Network error. Please verify connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Authentication guard & session change listener
  useEffect(() => {
    if (!isUserAuthenticated()) {
      setNotifications([]);
      router.push("/login");
      return;
    }

    void fetchNotifications();

    const handleAuthChange = () => {
      if (!isUserAuthenticated()) {
        setNotifications([]);
        router.push("/login");
      } else {
        setNotifications([]);
        void fetchNotifications();
      }
    };

    window.addEventListener("dca-auth-change", handleAuthChange);
    window.addEventListener("dca-auth-logout", handleAuthChange);

    return () => {
      window.removeEventListener("dca-auth-change", handleAuthChange);
      window.removeEventListener("dca-auth-logout", handleAuthChange);
    };
  }, [router, fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    const token = getAuthToken();
    if (!token) return;

    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true, readAt: new Date().toISOString() } : item
      )
    );

    try {
      await fetch(`${API_URL}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Silent error fallback
    }
  };

  const handleMarkAllAsRead = async () => {
    const token = getAuthToken();
    if (!token) return;

    setMarkingAll(true);
    // Optimistic update
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true, readAt: new Date().toISOString() }))
    );

    try {
      await fetch(`${API_URL}/api/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Silent error fallback
    } finally {
      setMarkingAll(false);
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    if (!item.isRead) {
      void handleMarkAsRead(item.id);
    }

    if (item.entityType === "PREMIUM_ENTITLEMENT" || item.entityType === "PAYMENT") {
      router.push("/membership");
    } else if (item.entityType === "APPLICATION" || item.entityType === "CASTING_CALL") {
      router.push("/dashboard");
    } else if (item.entityType === "ARTIST_PROFILE" || item.entityType === "BRAND_PROFILE") {
      router.push("/dashboard");
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.isRead;
    return true;
  });

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111111] pt-28 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* TOP BAR / NAVIGATION */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#D4AF37] transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>

          {unreadCount > 0 && (
            <button
              type="button"
              disabled={markingAll}
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1.5 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/20 transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <CheckCheck size={15} />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* HEADER */}
        <div className="mb-8 border-b border-gray-200/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <Bell size={14} />
                <span>Notification Center</span>
              </div>
              <h1 className="mt-1 font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                All Notifications
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Stay updated on casting applications, approvals, and premium memberships.
              </p>
            </div>

            {/* FILTER PILLS */}
            <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  filter === "all"
                    ? "bg-[#111111] text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  filter === "unread"
                    ? "bg-[#D4AF37] text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs animate-pulse"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                  <div className="h-2.5 w-1/5 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>
            <button
              type="button"
              onClick={fetchNotifications}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 px-4 text-center">
            <BellOff size={44} className="mx-auto mb-3 text-[#D4AF37]/60" />
            <h3 className="font-serif text-lg font-bold text-[#111111]">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {filter === "unread"
                ? "You have caught up with all your notifications."
                : "Activity updates regarding your casting calls and profile will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((item) => {
              const { icon: IconComponent, colorClass, bgClass } =
                getNotificationIcon(item.type);

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`group relative flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition cursor-pointer ${
                    item.isRead
                      ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      : "border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 hover:shadow-md"
                  }`}
                >
                  {/* ICON */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-2xs ${bgClass}`}
                  >
                    <IconComponent size={18} className={colorClass} />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-sm sm:text-base ${
                          item.isRead ? "font-semibold text-gray-900" : "font-extrabold text-[#111111]"
                        }`}
                      >
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-gray-400 shrink-0">
                          {getRelativeTime(item.createdAt)}
                        </span>
                        {!item.isRead && (
                          <span
                            className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/20 shrink-0"
                            title="Unread notification"
                          />
                        )}
                      </div>
                    </div>

                    <p
                      className={`mt-1 text-xs sm:text-sm leading-relaxed ${
                        item.isRead ? "text-gray-600" : "text-gray-800 font-medium"
                      }`}
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
