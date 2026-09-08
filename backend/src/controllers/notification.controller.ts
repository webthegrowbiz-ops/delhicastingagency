import type { Response } from "express";
import { prisma } from "../config/prisma.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

// ==========================================
// 1. GET /api/notifications (List user's notifications)
// ==========================================

export async function getMyNotifications(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const pageParam = req.query.page ? parseInt(req.query.page as string, 10) : null;
    const limitParam = req.query.limit ? parseInt(req.query.limit as string, 10) : null;

    let notifications;
    let total;

    if (pageParam && limitParam) {
      const page = Math.max(1, pageParam);
      const limit = Math.min(100, Math.max(1, limitParam));
      const skip = (page - 1) * limit;

      [notifications, total] = await Promise.all([
        prisma.notification.findMany({
          where: { userId: req.user.userId },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.notification.count({
          where: { userId: req.user.userId },
        }),
      ]);
    } else {
      notifications = await prisma.notification.findMany({
        where: { userId: req.user.userId },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      total = notifications.length;
    }

    res.status(200).json({
      success: true,
      count: notifications.length,
      total,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
}

// ==========================================
// 2. GET /api/notifications/unread-count
// ==========================================

export async function getUnreadNotificationCount(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const unreadCount = await prisma.notification.count({
      where: {
        userId: req.user.userId,
        isRead: false,
      },
    });

    res.status(200).json({
      success: true,
      count: unreadCount,
    });
  } catch (error) {
    console.error("Get unread notification count error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch unread notification count",
    });
  }
}

// ==========================================
// 3. PATCH /api/notifications/:id/read (Mark single notification read)
// ==========================================

export async function markNotificationAsRead(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const { id } = req.params;

    if (typeof id !== "string" || id.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Valid notification ID is required",
      });
      return;
    }

    const notification = await prisma.notification.findUnique({
      where: {
        id: id.trim(),
      },
    });

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found",
      });
      return;
    }

    // Security Check: User can only mark their OWN notifications read
    if (notification.userId !== req.user.userId) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to modify this notification",
      });
      return;
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: id.trim(),
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification: updatedNotification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
}

// ==========================================
// 4. PATCH /api/notifications/read-all (Mark all unread notifications read)
// ==========================================

export async function markAllNotificationsAsRead(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication token required",
      });
      return;
    }

    const updateResult = await prisma.notification.updateMany({
      where: {
        userId: req.user.userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      updatedCount: updateResult.count,
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notifications as read",
    });
  }
}
