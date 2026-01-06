import cron from "node-cron";
import {
  sendPendingEmails,
  cleanupNotifications,
} from "../services/notificationService.js";

export const initializeCronJobs = () => {
  console.log("Initializing cron jobs...");

  // Send pending notification emails every 5 minutes
  cron.schedule("*/15 * * * *", async () => {
    try {
      console.log("Running: Send pending notification emails");
      const sentCount = await sendPendingEmails();
      if (sentCount > 0) {
        console.log(`Sent ${sentCount} pending emails`);
      }
    } catch (error) {
      console.error("Error in sendPendingEmails cron:", error);
    }
  });

  // Cleanup old notifications (>30 days) - runs daily at 2 AM
  cron.schedule("0 2 * * *", async () => {
    try {
      console.log("Running: Cleanup old notifications");
      const deletedCount = await cleanupNotifications();
      if (deletedCount > 0) {
        console.log(`Deleted ${deletedCount} old notifications`);
      }
    } catch (error) {
      console.error("Error in cleanupNotifications cron:", error);
    }
  });

  console.log("Cron jobs initialized");
  console.log("   - Send pending emails: Every 5 minutes");
  console.log("   - Cleanup old notifications: Daily at 2 AM");
};

/**
 * Cron schedule explanations:
 *
 * "* /5 * * * *" = Every 5 minutes
 * "0 2 * * *"   = Daily at 2:00 AM
 *
 * Format: minute hour day month weekday
 * minute: 0-59
 * hour: 0-23
 * day: 1-31
 * month: 1-12
 * weekday: 0-7 (0 and 7 are Sunday)
 */
