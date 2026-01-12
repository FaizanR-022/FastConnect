import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import digestRoutes from "./routes/digestRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { sequelize } from "./config/database.js";
import { syncDatabase } from "./models/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import {
  apiLimiter,
  authLimiter,
  globalLimiter,
} from "./middleware/rateLimitMiddleware.js";
import { corsOptions } from "./middleware/corsMiddleware.js";
import { verifyApiKey } from "./middleware/apiKeyMiddleware.js";
import { initializeCronJobs } from "./jobs/cronJobs.js";
import { autoSeedStaticData } from "./scripts/seedStaticData.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("FastConnect Backend Running");
});

app.use("/health", healthRoutes); // Health check endpoint at /health
app.use("/api/digest", digestRoutes); // NEW: Daily digest endpoint (no rate limit - called by Vercel cron)

app.use("/api", globalLimiter);
app.use("/api", verifyApiKey);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/user", apiLimiter, userRoutes);
app.use("/api/alumni", apiLimiter, alumniRoutes);
app.use("/api/posts", apiLimiter, postRoutes);
app.use("/api/replies", apiLimiter, replyRoutes);
app.use("/api/upload", apiLimiter, uploadRoutes);
app.use("/api/notifications", apiLimiter, notificationRoutes);
app.use("/api/feedback", apiLimiter, feedbackRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await syncDatabase();
    console.log("Synced successfully!");

    await autoSeedStaticData();

    initializeCronJobs();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
