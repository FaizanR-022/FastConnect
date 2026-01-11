// routes/healthRoutes.js
import express from "express";

// (Not added in routes yet)
const router = express.Router();

router.get("/health", (req, res) => {
  // res.json({
  //   success: true,
  //   message: "Server is running!",
  //   timestamp: new Date().toISOString(),
  // });
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

export default router;
