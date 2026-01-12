// routes/healthRoutes.js
import express from "express";

// (Not added in routes yet)
const router = express.Router();

router.get("/", (req, res) => {
  // res.json({
  //   success: true,
  //   message: "Server is running!",
  //   timestamp: new Date().toISOString(),
  // });
  // res.json({
  //   success: true,
  // });
  console.log("Health check OK");
  res.status(200).send("OK");
});

export default router;
