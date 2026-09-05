"use client";

import React from "react";
import { CheckCheck, RefreshCw, BellOff, X } from "lucide-react";
import {
  type NotificationItem,
  getNotificationIcon,
  getRelativeTime,
} from "./notification-utils";

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClose: () => void;
  onRetry: () => void;
  onNavigate?: (entityType?: string | null, entityId?: string | null) => void;
}

export function NotificationDropdown({
  notifications,
  unreadCount,
  loading,
  error,
  onMarkRead,
  onMarkAllRead,
  onClose,
  onRetry,
  onNavigate,
}: NotificationDropdownProps) {
  const handleItemClick = (notification: NotificationItem) => {
    if (!notification.isRead) {
      onMarkRead(notification.id);
    }
    if (onNavigate) {
      onNavigate(notification.entityType, notification.entityId);
    }
  };

  return (
    <div
      tabIndex={-1}
      className="absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left"
    >
      {/* DROPDOWN HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-base font-bold text-[#111111]">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#D4AF37] px-2 py-0.5 text-[10px] font-bold text-white">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-[#C59B27] transition px-2 py-1 rounded-lg hover:bg-[#D4AF37]/10 cursor-pointer"
              title="Mark all notifications as read"
            >
              <CheckCheck size={14} />
              <span>Mark all read</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications dropdown"
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* DROPDOWN CONTENT AREA */}
      <div className="mt-3 max-h-[380px] overflow-y-auto pr-1 space-y-2">
        {/* LOADING SKELETON STATE */}
        {loading && (
          <div className="space-y-3 py-2">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 bg-gray-50/60 animate-pulse"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                  <div className="h-2.5 w-full rounded bg-gray-200" />
                  <div className="h-2 w-1/3 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE WITH RETRY */}
        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50/70 p-4 text-center">
            <p className="text-xs font-semibold text-red-700">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition cursor-pointer shadow-xs"
            >
              <RefreshCw size={12} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && notifications.length === 0 && (
          <div className="py-10 text-center text-xs text-gray-500">
            <BellOff size={32} className="mx-auto mb-2 text-[#D4AF37]/60" />
            <p className="font-serif text-sm font-bold text-[#111111]">
              No notifications yet
            </p>
            <p className="mt-0.5 text-gray-400">You&apos;re all caught up.</p>
          </div>
        )}

        {/* NOTIFICATION LIST */}
        {!loading &&
          !error &&
          notifications.map((item) => {
            const { icon: IconComponent, colorClass, bgClass } =
              getNotificationIcon(item.type);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`group flex min-w-full items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
                  item.isRead
                    ? "border-gray-100 bg-white hover:bg-gray-50/80"
                    : "border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10"
                }`}
              >
                {/* ICON */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${bgClass}`}
                >
                  <IconComponent size={15} className={colorClass} />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-xs truncate ${
                        item.isRead
                          ? "font-semibold text-[#222222]"
                          : "font-bold text-[#111111]"
                      }`}
                    >
                      {item.title}
                    </h4>

                    {!item.isRead && (
                      <span
                        className="h-2 w-2 rounded-full bg-[#D4AF37] shrink-0"
                        title="Unread notification"
                      />
                    )}
                  </div>

                  <p
                    className={`mt-0.5 text-[11px] line-clamp-2 leading-relaxed ${
                      item.isRead ? "text-gray-500" : "text-gray-700 font-medium"
                    }`}
                  >
                    {item.message}
                  </p>

                  <span className="mt-1.5 block text-[10px] font-medium text-gray-400">
                    {getRelativeTime(item.createdAt)}
                  </span>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
