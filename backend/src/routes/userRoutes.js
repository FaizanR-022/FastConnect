import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/user", protect, getUser); // Get my profile
router.put("/user", protect, validateUpdateUser, updateUser); // Update my profile
router.delete("/user", protect, deleteUser);

export default router;
