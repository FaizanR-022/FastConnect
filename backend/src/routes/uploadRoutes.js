import express from "express";
import { uploadImage, deleteImage } from "../controllers/uploadController.js";
import { upload, handleMulterError } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload single image (protected route)
router.post("/image", upload.single("image"), handleMulterError, uploadImage);

// for future
router.delete("/image", protect, deleteImage);

export default router;
