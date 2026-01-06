import {
  Notification,
  User,
  Alumni,
  Student,
  Post,
  Reply,
} from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../config/database.js";
import {
  generateNotificationMessage,
  enforceNotificationLimit,
  deleteExpiredNotifications,
  getActorInfo,
  calculateEmailDelay,
  notificationExists,
} from "../utils/notificationHelpers.js";
import { sendNotificationEmail } from "./emailService.js";

export const createNotification = async ({
  recipientId,
  actorId,
  type,
  targetType,
  targetId,
  metadata = {},
  sendEmail = false,
}) => {
  const transaction = await sequelize.transaction();

  try {
    // Check if notification already exists (prevent duplicates within 1 min)
    const exists = await notificationExists(
      recipientId,
      type,
      targetId,
      actorId
    );
    if (exists) {
      await transaction.rollback();
      return null;
    }

    const actorInfo = await getActorInfo(actorId);
    if (!actorInfo) {
      await transaction.rollback();
      throw new Error("Actor not found");
    }

    const message = generateNotificationMessage(
      type,
      actorInfo.actorName,
      metadata
    );

    const emailScheduledAt = sendEmail ? calculateEmailDelay() : null;

    const notification = await Notification.create(
      {
        recipient_id: recipientId,
        actor_id: actorId,
        type,
        target_type: targetType,
        target_id: targetId,
        message,
        metadata: {
          ...metadata,
          actorName: actorInfo.actorName,
          actorPublicId: actorInfo.actorPublicId,
          actorPfp: actorInfo.actorPfp,
        },
        email_sent: false,
        email_scheduled_at: emailScheduledAt,
      },
      { transaction }
    );

    await enforceNotificationLimit(recipientId, transaction);

    await transaction.commit();

    console.log(`Created notification: ${type} for user ${recipientId}`);
    return notification;
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating notification:", error);
    throw error;
  }
};

export const createBulkNotifications = async ({
  recipientIds,
  actorId,
  type,
  targetType,
  targetId,
  metadata = {},
  sendEmail = false,
}) => {
  try {
    const actorInfo = await getActorInfo(actorId);
    if (!actorInfo) {
      throw new Error("Actor not found");
    }

    const message = generateNotificationMessage(
      type,
      actorInfo.actorName,
      metadata
    );

    const emailScheduledAt = sendEmail ? calculateEmailDelay() : null;

    const notificationsData = recipientIds.map((recipientId) => ({
      recipient_id: recipientId,
      actor_id: actorId,
      type,
      target_type: targetType,
      target_id: targetId,
      message,
      metadata: {
        ...metadata,
        actorName: actorInfo.actorName,
        actorPublicId: actorInfo.actorPublicId,
        actorPfp: actorInfo.actorPfp,
      },
      email_sent: false,
      email_scheduled_at: emailScheduledAt,
    }));

    const notifications = await Notification.bulkCreate(notificationsData);

    recipientIds.forEach((recipientId) => {
      enforceNotificationLimit(recipientId).catch((err) =>
        console.error(`Error enforcing limit for user ${recipientId}:`, err)
      );
    });

    console.log(`Created ${notifications.length} bulk notifications`);
    return notifications;
  } catch (error) {
    console.error("Error creating bulk notifications:", error);
    throw error;
  }
};

export const getUserNotifications = async (userId, limit = 20) => {
  try {
    const notifications = await Notification.findAll({
      where: { recipient_id: userId },
      order: [["createdAt", "DESC"]],
      limit: Math.min(limit, 20),
      include: [
        {
          model: User,
          as: "actor",
          attributes: ["public_id", "user_type"],
          include: [
            {
              model: Student,
              as: "studentProfile",
              attributes: ["first_name", "last_name", "pfp_url"],
            },
            {
              model: Alumni,
              as: "alumniProfile",
              attributes: ["first_name", "last_name", "pfp_url"],
            },
          ],
        },
      ],
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getUnreadCount = async (userId) => {
  try {
    const count = await Notification.count({
      where: {
        recipient_id: userId,
        is_read: false,
      },
    });

    return count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

export const markAsRead = async (notificationUuid, userId) => {
  try {
    const notification = await Notification.findOne({
      where: {
        uuid: notificationUuid,
        recipient_id: userId,
      },
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (!notification.is_read) {
      await notification.update({ is_read: true });
      console.log(`Marked notification ${notificationUuid} as read`);
    }

    return notification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const markAllAsRead = async (userId) => {
  try {
    const [updatedCount] = await Notification.update(
      { is_read: true },
      {
        where: {
          recipient_id: userId,
          is_read: false,
        },
      }
    );

    console.log(
      `Marked ${updatedCount} notifications as read for user ${userId}`
    );
    return updatedCount;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

export const deleteNotification = async (notificationUuid, userId) => {
  try {
    const deletedCount = await Notification.destroy({
      where: {
        uuid: notificationUuid,
        recipient_id: userId,
      },
    });

    if (deletedCount === 0) {
      throw new Error("Notification not found");
    }

    console.log(`Deleted notification ${notificationUuid}`);
    return true;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

export const sendPendingEmails = async () => {
  try {
    // Find notifications where email should be sent now
    const pendingNotifications = await Notification.findAll({
      where: {
        email_sent: false,
        email_scheduled_at: {
          [Op.lte]: new Date(),
          [Op.not]: null,
        },
      },
      include: [
        {
          model: User,
          as: "recipient",
          attributes: ["user_id", "email", "user_type", "is_email_verified"],
          where: {
            is_email_verified: true, //Only send to verified users - no false emails
          },
        },
        {
          model: User,
          as: "actor",
          attributes: ["public_id", "user_type"],
          include: [
            {
              model: Student,
              as: "studentProfile",
              attributes: ["first_name", "last_name"],
            },
            {
              model: Alumni,
              as: "alumniProfile",
              attributes: ["first_name", "last_name"],
            },
          ],
        },
      ],
      limit: 100, // Process 100 at a time
    });

    if (pendingNotifications.length === 0) {
      return 0;
    }

    console.log(`Sending ${pendingNotifications.length} pending emails...`);

    let sentCount = 0;

    for (const notification of pendingNotifications) {
      try {
        const emailResult = await sendNotificationEmail(notification);

        if (emailResult.success) {
          await notification.update({ email_sent: true });
          sentCount++;
        }
      } catch (err) {
        console.error(
          `Failed to send email for notification ${notification.uuid}:`,
          err
        );
      }
    }

    console.log(
      `Sent ${sentCount}/${pendingNotifications.length} notification emails`
    );
    return sentCount;
  } catch (error) {
    console.error("Error sending pending emails:", error);
    throw error;
  }
};

export const cleanupNotifications = async () => {
  try {
    const deletedCount = await deleteExpiredNotifications();
    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up notifications:", error);
    throw error;
  }
};
