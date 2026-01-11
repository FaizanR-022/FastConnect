/**
 * Vercel Cron Job - Daily Digest
 * Runs daily at 4 PM PKT (11 AM UTC)
 * Triggers the backend to send daily digest emails
 */
export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("[Cron] Missing or invalid Authorization header");
    return res.status(401).json({ error: "Unauthorized - Missing auth" });
  }

  if (process.env.VERCEL_ENV === "production") {
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error("[Cron] CRON_SECRET not found in environment");
      return res.status(500).json({ error: "Configuration error" });
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error("[Cron] Invalid CRON_SECRET");
      return res.status(401).json({ error: "Unauthorized - Invalid secret" });
    }
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL;
    const digestSecret = process.env.DIGEST_SECRET;

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    if (!digestSecret) {
      throw new Error("Digest secret not configured");
    }

    console.log(
      `[Cron] Triggering daily digest at ${new Date().toISOString()}`
    );

    // Call the backend digest endpoint
    const response = await fetch(`${backendUrl}/digest/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Digest-Secret": digestSecret,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Backend responded with ${response.status}: ${data.message}`
      );
    }

    console.log(`[Cron] Digest completed:`, data.stats);

    return res.status(200).json({
      success: true,
      message: "Daily digest triggered successfully",
      timestamp: new Date().toISOString(),
      stats: data.stats,
    });
  } catch (error) {
    console.error("[Cron] Error triggering digest:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
