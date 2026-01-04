import express from "express";
import {
  login,
  resendSignupOTP,
  signupAlumni,
  signupStudent,
  verifySignupOTP,
} from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  alumniSignupSchema,
  loginSchema,
  studentSignupSchema,
} from "../validations/authValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup/student", validate(studentSignupSchema), signupStudent);
router.post("/signup/alumni", validate(alumniSignupSchema), signupAlumni);
router.post("/login", validate(loginSchema), login);

router.post("/verify-signup-otp", protect, verifySignupOTP);
router.post("/resend-signup-otp", protect, resendSignupOTP);

// TODO: Add these later
// router.post('/signup/alumni', validate(alumniSignupSchema), signupAlumni);
// router.post('/login', validate(loginSchema), login);

export default router;
