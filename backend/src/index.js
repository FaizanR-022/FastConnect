import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import { sequelize } from "./config/database.js";
import { syncDatabase } from "./models/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import {
  apiLimiter,
  authLimiter,
  globalLimiter,
} from "./middleware/rateLimitMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", globalLimiter);

app.get("/", (req, res) => {
  res.send("FastConnect Backend Running");
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/user", apiLimiter, userRoutes);
app.use("/api/alumni", apiLimiter, alumniRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await syncDatabase();
    console.log("Synced successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
