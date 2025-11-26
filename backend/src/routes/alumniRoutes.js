import express from "express";
import {
  getAllAlumni,
  getAlumniById,
} from "../controllers/alumniController.js";
import { protect } from "../middleware/authMiddleware.js"; // If you want to require login

const router = express.Router();

// Public routes (or add protect middleware if you want login required)
// router.get("/", protect, getAllAlumni);
router.get("/", protect, getAllAlumni);
router.get("/:id", protect, getAlumniById);

export default router;
