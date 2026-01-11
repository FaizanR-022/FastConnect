import express from "express";
import {
  createFeedback,
  getUserFeedbacks,
  getAllFeedbacks,
  updateFeedbackStatus,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import { createFeedbackSchema } from "../validations/feedbackValidation.js";

const router = express.Router();

// User routes
router.post("/", protect, validate(createFeedbackSchema), createFeedback);
// router.get("/my-feedbacks", protect, getUserFeedbacks);

// Admin routes (TODO: Add admin middleware)
// router.get("/all", protect, getAllFeedbacks);
// router.patch("/:id/status", protect, updateFeedbackStatus);

export default router;
