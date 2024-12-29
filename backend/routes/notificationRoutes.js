import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Protected routes (require authentication)
router.use(protect);

// Get user's notifications
router.get("/", getUserNotifications);

// Mark notification as read
router.patch("/:notificationId/read", markAsRead);

// Mark all notifications as read
router.patch("/mark-all-read", markAllAsRead);

// Delete notification
router.delete("/:notificationId", deleteNotification);

export default router;
