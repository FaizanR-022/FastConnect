import express from "express";
import { getAllStudents } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/students", getAllStudents);

export default router;
