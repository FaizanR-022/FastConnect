import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateUpdateUser } from "../middleware/validationMiddleware.js";
import { getUserPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/", protect, getUser); // Get my profile
router.put("/", protect, validateUpdateUser, updateUser); // Update my profile
router.delete("/", protect, deleteUser);

router.get("/:userId/posts", protect, getUserPosts);

export default router;
