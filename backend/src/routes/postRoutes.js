import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  getPostReplies,
  createReply,
  deleteReply,
  likePost,
  unlikePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  createPostSchema,
  createReplySchema,
} from "../validations/postValidation.js";

const router = express.Router();

router.post("/", protect, validate(createPostSchema), createPost);

router.get("/", protect, getAllPosts);

router.get("/my-posts", protect, getMyPosts);

router.delete("/:id", protect, deletePost);

router.get("/:id/replies", protect, getPostReplies);

router.post("/:id/replies", protect, validate(createReplySchema), createReply);

router.post("/:id/like", protect, likePost);

router.delete("/:id/like", protect, unlikePost);

export default router;
