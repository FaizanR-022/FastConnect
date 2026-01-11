import { Notification, User, Alumni, Student } from "../models/index.js";
import { Op } from "sequelize";
import { sendEmail } from "../config/email.js";

/**
 * Groups unsent notifications by user and sends one digest email per user
 * This is called daily at 4 PM PKT (11 AM UTC) by Vercel cron job
 */
export const sendDailyDigests = async () => {
  try {
    console.log("Starting daily digest email sending...");

    // Get all unsent notifications with user details
    const unsentNotifications = await Notification.findAll({
      where: {
        email_sent: false,
        createdAt: {
          // Only include notifications from last 24 hours
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: [
        {
          model: User,
          as: "recipient",
          attributes: ["user_id", "email", "user_type", "is_email_verified"],
          where: {
            is_email_verified: true, // Only verified users
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (unsentNotifications.length === 0) {
      console.log("No unsent notifications to process");
      return { sent: 0, failed: 0 };
    }

    // Group notifications by recipient
    const notificationsByUser = {};
    unsentNotifications.forEach((notification) => {
      const userId = notification.recipient_id;
      if (!notificationsByUser[userId]) {
        notificationsByUser[userId] = {
          recipient: notification.recipient,
          notifications: [],
        };
      }
      notificationsByUser[userId].notifications.push(notification);
    });

    console.log(
      `Sending digests to ${Object.keys(notificationsByUser).length} users`
    );

    let sentCount = 0;
    let failedCount = 0;

    // Send one digest email per user
    for (const [userId, data] of Object.entries(notificationsByUser)) {
      try {
        const emailResult = await sendDigestEmail(
          data.recipient,
          data.notifications
        );

        if (emailResult.success) {
          // Mark all notifications for this user as email_sent
          const notificationIds = data.notifications.map(
            (n) => n.notification_id
          );
          await Notification.update(
            { email_sent: true },
            {
              where: {
                notification_id: {
                  [Op.in]: notificationIds,
                },
              },
            }
          );
          sentCount++;
          console.log(`Sent digest to ${data.recipient.email}`);
        } else {
          failedCount++;
          console.error(
            `Failed to send digest to ${data.recipient.email}:`,
            emailResult.error
          );
        }
      } catch (error) {
        failedCount++;
        console.error(`Error sending digest to user ${userId}:`, error.message);
      }
    }

    console.log(
      `Daily digest complete: ${sentCount} sent, ${failedCount} failed`
    );
    return { sent: sentCount, failed: failedCount };
  } catch (error) {
    console.error("Error in sendDailyDigests:", error);
    throw error;
  }
};

/**
 * Sends a digest email to one user containing all their notifications
 */
const sendDigestEmail = async (recipient, notifications) => {
  try {
    if (!recipient || !recipient.email) {
      throw new Error("Recipient email not found");
    }

    // Group notifications by type
    const grouped = {
      new_posts: [],
      replies: [],
      likes: [],
    };

    notifications.forEach((notif) => {
      if (notif.type === "new_post") {
        grouped.new_posts.push(notif);
      } else if (notif.type === "post_reply") {
        grouped.replies.push(notif);
      } else if (notif.type === "post_like") {
        grouped.likes.push(notif);
      }
    });

    const totalCount = notifications.length;
    const hasNewPosts = grouped.new_posts.length > 0;
    const hasReplies = grouped.replies.length > 0;
    const hasLikes = grouped.likes.length > 0;

    // Build email template
    const emailData = buildDigestEmailTemplate({
      totalCount,
      grouped,
      hasNewPosts,
      hasReplies,
      hasLikes,
    });

    const result = await sendEmail(
      recipient.email,
      emailData.subject,
      emailData.html,
      emailData.text
    );

    return result;
  } catch (error) {
    console.error("Error sending digest email:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Builds the HTML and text templates for digest email
 */
const buildDigestEmailTemplate = ({
  totalCount,
  grouped,
  hasNewPosts,
  hasReplies,
  hasLikes,
}) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  // Build sections
  let sectionsHtml = "";
  let sectionsText = "";

  // New Posts Section
  if (hasNewPosts) {
    sectionsHtml += `
      <div class="section">
        <h2 class="section-title">📝 New Questions (${grouped.new_posts.length})</h2>
    `;
    sectionsText += `\n📝 NEW QUESTIONS (${
      grouped.new_posts.length
    })\n${"=".repeat(50)}\n`;

    grouped.new_posts.slice(0, 5).forEach((notif) => {
      const title = notif.metadata.postTitle || "Untitled Post";
      const author = notif.metadata.actorName || "Someone";
      const preview = notif.metadata.postPreview
        ? notif.metadata.postPreview.substring(0, 120) + "..."
        : "";
      const postUrl = `${frontendUrl}/posts/${notif.metadata.postUuid}`;

      sectionsHtml += `
        <div class="notification-item">
          <div class="notif-title">${title}</div>
          <div class="notif-meta">Posted by ${author}</div>
          ${preview ? `<div class="notif-preview">${preview}</div>` : ""}
          <a href="${postUrl}" class="view-link">View Question →</a>
        </div>
      `;

      sectionsText += `\n${title}\nBy: ${author}\n${preview}\n${postUrl}\n`;
    });

    if (grouped.new_posts.length > 5) {
      sectionsHtml += `
        <p class="more-text">+ ${
          grouped.new_posts.length - 5
        } more new questions</p>
      `;
      sectionsText += `\n+ ${
        grouped.new_posts.length - 5
      } more new questions\n`;
    }

    sectionsHtml += `</div>`;
  }

  // Replies Section
  if (hasReplies) {
    sectionsHtml += `
      <div class="section">
        <h2 class="section-title">💬 Replies to Your Posts (${grouped.replies.length})</h2>
    `;
    sectionsText += `\n💬 REPLIES TO YOUR POSTS (${
      grouped.replies.length
    })\n${"=".repeat(50)}\n`;

    grouped.replies.slice(0, 5).forEach((notif) => {
      const postTitle = notif.metadata.postTitle || "Your post";
      const author = notif.metadata.actorName || "Someone";
      const preview = notif.metadata.replyPreview
        ? notif.metadata.replyPreview.substring(0, 150) + "..."
        : "";
      const postUrl = `${frontendUrl}/posts/${notif.metadata.postUuid}`;

      sectionsHtml += `
        <div class="notification-item">
          <div class="notif-title">${author} replied to: "${postTitle}"</div>
          ${preview ? `<div class="notif-preview">${preview}</div>` : ""}
          <a href="${postUrl}" class="view-link">View Reply →</a>
        </div>
      `;

      sectionsText += `\n${author} replied to: "${postTitle}"\n${preview}\n${postUrl}\n`;
    });

    if (grouped.replies.length > 5) {
      sectionsHtml += `
        <p class="more-text">+ ${grouped.replies.length - 5} more replies</p>
      `;
      sectionsText += `\n+ ${grouped.replies.length - 5} more replies\n`;
    }

    sectionsHtml += `</div>`;
  }

  // Likes Section
  if (hasLikes) {
    sectionsHtml += `
      <div class="section">
        <h2 class="section-title">❤️ Likes on Your Posts (${grouped.likes.length})</h2>
        <div class="notification-item">
          <p>${grouped.likes.length} people liked your posts today</p>
          <a href="${frontendUrl}/profile" class="view-link">View Your Posts →</a>
        </div>
      </div>
    `;
    sectionsText += `\n❤️ LIKES (${grouped.likes.length})\n${"=".repeat(50)}\n${
      grouped.likes.length
    } people liked your posts today\n${frontendUrl}/profile\n`;
  }

  // Complete HTML email
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .email-wrapper {
            background-color: #f5f5f5;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #047857 0%, #0d9488 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 600;
          }
          .header p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .summary {
            background: #f0fdf4;
            border-left: 4px solid #047857;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 4px;
          }
          .summary h2 {
            margin: 0 0 10px 0;
            font-size: 20px;
            color: #047857;
          }
          .section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e7eb;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #047857;
            margin: 0 0 15px 0;
          }
          .notification-item {
            background: #f9fafb;
            padding: 15px;
            margin-bottom: 12px;
            border-radius: 6px;
            border-left: 3px solid #0d9488;
          }
          .notif-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 6px;
          }
          .notif-meta {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .notif-preview {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 10px;
          }
          .view-link {
            display: inline-block;
            color: #047857;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
          }
          .view-link:hover {
            text-decoration: underline;
          }
          .more-text {
            color: #6b7280;
            font-style: italic;
            font-size: 14px;
            margin-top: 10px;
          }
          .cta-button {
            display: inline-block;
            background: #047857;
            color: white !important;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: 600;
            text-align: center;
          }
          .footer {
            background: #f9fafb;
            padding: 25px 30px;
            text-align: center;
            color: #6b7280;
            font-size: 13px;
            border-top: 1px solid #e5e7eb;
          }
          .footer-links {
            margin-top: 15px;
          }
          .footer-links a {
            color: #047857;
            text-decoration: none;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <h1>📬 Your Daily Activity Summary</h1>
              <p>FastConnect - Stay connected with your network</p>
            </div>
          
          <div class="content">
            <div class="summary">
              <h2>You have ${totalCount} new notification${
    totalCount === 1 ? "" : "s"
  }</h2>
              <p>Here's what happened on FastConnect today:</p>
            </div>
            
            ${sectionsHtml}
            
            <center>
              <a href="${frontendUrl}/notifications" class="cta-button">
                View All Notifications
              </a>
            </center>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 25px;">
              💡 <strong>Tip:</strong> You can manage your notification preferences in your profile settings.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>FastConnect</strong> - Connecting FAST-NUCES students with alumni</p>
            <div class="footer-links">
              <a href="${frontendUrl}">Home</a> •
              <a href="${frontendUrl}/notifications">Notifications</a> •
              <a href="${frontendUrl}/profile">My Profile</a>
            </div>
            <p style="margin-top: 15px;">
              This is an automated daily digest. You're receiving this because you have a FastConnect account.
            </p>
          </div>
        </div>
      </div>
      </body>
    </html>
  `;

  // Plain text version
  const text = `
📬 YOUR DAILY ACTIVITY SUMMARY
FastConnect - Stay connected with your network

You have ${totalCount} new notification${totalCount === 1 ? "" : "s"}
Here's what happened on FastConnect today:
${sectionsText}

View all notifications: ${frontendUrl}/notifications

---
FastConnect - Connecting FAST-NUCES students with alumni
Home: ${frontendUrl}
Notifications: ${frontendUrl}/notifications
My Profile: ${frontendUrl}/profile

This is an automated daily digest. You're receiving this because you have a FastConnect account.
  `;

  return {
    subject: `📬 ${totalCount} new notification${
      totalCount === 1 ? "" : "s"
    } on FastConnect`,
    html,
    text,
  };
};
