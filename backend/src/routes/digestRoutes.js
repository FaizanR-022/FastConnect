import { Router } from "express";
import { sendDailyDigests } from "../services/dailyDigestService.js";

const router = Router();

/* POST /api/digest/send
 * Triggered by Vercel cron job daily at 4 PM PKT (11 AM UTC)
 * Sends digest emails to all users with unsent notifications
 */
router.post("/send", async (req, res) => {
  try {
    // Verify request is from Vercel Cron or contains secret
    const cronSecret = req.headers["x-digest-secret"];
    const expectedSecret = process.env.DIGEST_SECRET;

    if (!expectedSecret) {
      console.warn(
        "DIGEST_SECRET not set in environment - digest endpoint is unprotected"
      );
    } else if (cronSecret !== expectedSecret) {
      console.error("Invalid digest secret received");
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid secret",
      });
    }

    console.log("Daily digest triggered");

    const result = await sendDailyDigests();

    return res.status(200).json({
      success: true,
      message: "Daily digest completed",
      stats: {
        sent: result.sent,
        failed: result.failed,
      },
    });
  } catch (error) {
    console.error("Error in digest endpoint:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending daily digests",
      error: error.message,
    });
  }
});

/**
 * GET /api/digest/test
 * Test endpoint to manually trigger digest (development only)
 */
router.get("/test", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({
      success: false,
      message: "Test endpoint not available in production",
    });
  }

  try {
    console.log("Manual digest test triggered");
    const result = await sendDailyDigests();

    return res.status(200).json({
      success: true,
      message: "Test digest completed",
      stats: result,
    });
  } catch (error) {
    console.error("Error in test digest:", error);
    return res.status(500).json({
      success: false,
      message: "Error in test digest",
      error: error.message,
    });
  }
});

export default router;
