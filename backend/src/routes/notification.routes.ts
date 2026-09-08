import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  getMyNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";

const router = Router();

// Require JWT authentication for all notification routes
router.use(authenticate);

// 1. GET /api/notifications (List notifications for current user)
router.get("/", getMyNotifications);

// 2. GET /api/notifications/unread-count (Registered before parameterized ID routes)
router.get("/unread-count", getUnreadNotificationCount);

// 3. PATCH /api/notifications/read-all (Registered before parameterized ID routes)
router.patch("/read-all", markAllNotificationsAsRead);

// 4. PATCH /api/notifications/:id/read (Mark single notification read)
router.patch("/:id/read", markNotificationAsRead);

export default router;
