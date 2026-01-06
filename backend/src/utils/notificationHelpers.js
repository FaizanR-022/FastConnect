import { Notification, User, Alumni, Student } from "../models/index.js";
import { Op } from "sequelize";

export const generateNotificationMessage = (type, actorName, metadata = {}) => {
  const { postTitle, replyPreview } = metadata;

  const messages = {
    new_post: `${actorName} posted a new question: "${postTitle}"`,
    post_reply: `${actorName} replied to your post: "${postTitle}"`,
    post_like: `${actorName} liked your post: "${postTitle}"`,
  };

  return messages[type] || "New notification";
};

export const enforceNotificationLimit = async (userId, transaction = null) => {
  const count = await Notification.count({
    where: { recipient_id: userId },
    transaction,
  });

  if (count > 20) {
    const excessCount = count - 20;

    // Get IDs of oldest notifications to delete
    const oldestNotifications = await Notification.findAll({
      where: { recipient_id: userId },
      order: [["createdAt", "ASC"]],
      limit: excessCount,
      attributes: ["notification_id"],
      transaction,
    });

    const idsToDelete = oldestNotifications.map((n) => n.notification_id);

    // Delete oldest notifications
    await Notification.destroy({
      where: {
        notification_id: {
          [Op.in]: idsToDelete,
        },
      },
      transaction,
    });

    console.log(`Deleted ${excessCount} old notifications for user ${userId}`);
  }
};

export const deleteExpiredNotifications = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const deletedCount = await Notification.destroy({
    where: {
      createdAt: {
        [Op.lt]: thirtyDaysAgo,
      },
    },
  });

  if (deletedCount > 0) {
    console.log(`Deleted ${deletedCount} expired notifications (>30 days)`);
  }

  return deletedCount;
};

export const getActorInfo = async (userId) => {
  const user = await User.findOne({
    where: { user_id: userId },
    attributes: ["user_id", "public_id", "user_type"],
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
  });

  if (!user) return null;

  const profile =
    user.user_type === "student" ? user.studentProfile : user.alumniProfile;

  if (!profile) return null;

  return {
    actorId: user.user_id,
    actorPublicId: user.public_id,
    actorName: `${profile.first_name} ${profile.last_name}`,
    actorPfp: profile.pfp_url,
  };
};

export const calculateEmailDelay = () => {
  const minDelay = 5 * 60 * 1000; // 5 mins
  const maxDelay = 10 * 60 * 1000; // 10 mins
  const randomDelay = Math.floor(
    Math.random() * (maxDelay - minDelay + 1) + minDelay
  );

  return new Date(Date.now() + randomDelay);
};

// Check if notification already exists (prevent duplicates)
export const notificationExists = async (
  recipientId,
  type,
  targetId,
  actorId
) => {
  const exists = await Notification.findOne({
    where: {
      recipient_id: recipientId,
      type,
      target_id: targetId,
      actor_id: actorId,
      createdAt: {
        [Op.gt]: new Date(Date.now() - 60 * 1000), // Last 1 minute
      },
    },
  });

  return !!exists;
};
