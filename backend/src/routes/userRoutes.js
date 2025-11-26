import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", protect, getUser); // Get my profile
router.put("/", protect, validateUpdateUser, updateUser); // Update my profile
router.delete("/", protect, deleteUser);

export default router;
