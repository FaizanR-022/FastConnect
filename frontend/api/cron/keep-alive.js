//  Vercel Cron Job - Keep Alive
//  Runs every 14 minutes to prevent Render backend from sleeping
//  Pings the backend health endpoint to keep it warm

export default async function handler(req, res) {
  // Verify request is from Vercel Cron
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("[Keep-Alive] Missing or invalid Authorization header");
    return res.status(401).json({ error: "Unauthorized - Missing auth" });
  }

  if (process.env.VERCEL_ENV === "production") {
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error("[Keep-Alive] CRON_SECRET not found in environment");
      return res.status(500).json({ error: "Configuration error" });
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error("[Keep-Alive] Invalid CRON_SECRET");
      return res.status(401).json({ error: "Unauthorized - Invalid secret" });
    }
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL;

    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const healthUrl = `${backendUrl}/health`;

    console.log(`[Keep-Alive] Pinging backend at ${new Date().toISOString()}`);

    // Ping the backend health endpoint
    const response = await fetch(healthUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Backend health check failed with status ${response.status}`
      );
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      message: "Backend keep-alive ping successful",
      timestamp: new Date().toISOString(),
      backendStatus: data,
    });
  } catch (error) {
    console.error("[Keep-Alive] Error pinging backend:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
