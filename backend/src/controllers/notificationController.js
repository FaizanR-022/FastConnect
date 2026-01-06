import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;
  const limit = parseInt(req.query.limit) || 20;

  const notifications = await getUserNotifications(userId, limit);

  const transformedNotifications = notifications.map((notification) => {
    const actorProfile =
      notification.actor?.user_type === "student"
        ? notification.actor.studentProfile
        : notification.actor?.alumniProfile;

    return {
      id: notification.uuid,
      type: notification.type,
      message: notification.message,
      isRead: notification.is_read,
      createdAt: notification.createdAt,
      actor: notification.actor
        ? {
            id: notification.actor.public_id,
            name: notification.metadata.actorName,
            profilePicture: actorProfile?.pfp_url || null,
          }
        : null,
      target: {
        type: notification.target_type,
        id: notification.target_id,
      },
      metadata: notification.metadata,
    };
  });

  return res.status(200).json({
    success: true,
    data: {
      notifications: transformedNotifications,
    },
  });
});

export const getUnreadNotificationCount = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;

  const count = await getUnreadCount(userId);

  return res.status(200).json({
    success: true,
    data: {
      unreadCount: count,
    },
  });
});

export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const userId = req.user.user_id;

  await markAsRead(uuid, userId);

  return res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});

export const markAllNotificationsAsRead = asyncHandler(async (req, res) => {
  const userId = req.user.user_id;

  const updatedCount = await markAllAsRead(userId);

  return res.status(200).json({
    success: true,
    message: `Marked ${updatedCount} notifications as read`,
    data: {
      updatedCount,
    },
  });
});

export const deleteNotificationById = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const userId = req.user.user_id;

  await deleteNotification(uuid, userId);

  return res.status(200).json({
    success: true,
    message: "Notification deleted",
  });
});
