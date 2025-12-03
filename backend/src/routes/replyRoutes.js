import express from "express";
import { deleteReply } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/:id", protect, deleteReply);

export default router;
