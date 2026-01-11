import cron from "node-cron";
import { cleanupNotifications } from "../services/notificationService.js";

export const initializeCronJobs = () => {
  console.log("Initializing cron jobs...");

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
  console.log("   - Cleanup old notifications: Daily at 2 AM");
  console.log(
    "   - Daily digest emails: Handled by Vercel cron (4 PM PKT / 11 AM UTC)"
  );
};

/**
 * Cron schedule explanations:
 *
 * "0 2 * * *"   = Daily at 2:00 AM
 *
 * Format: minute hour day month weekday
 * minute: 0-59
 * hour: 0-23
 * day: 1-31
 * month: 1-12
 * weekday: 0-7 (0 and 7 are Sunday)
 *
 * NOTE: Individual notification emails are no longer sent via node-cron
 * Daily digest emails are triggered by Vercel cron job at 4 PM PKT (11 AM UTC)
 */
