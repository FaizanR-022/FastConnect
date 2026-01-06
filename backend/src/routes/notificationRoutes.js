import express from "express";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotificationById,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.get("/unread-count", getUnreadNotificationCount);
router.patch("/read-all", markAllNotificationsAsRead);
router.patch("/:uuid/read", markNotificationAsRead);

router.delete("/:uuid", deleteNotificationById);

export default router;
