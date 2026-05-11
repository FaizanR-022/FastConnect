import express from "express";
import {
  login,
  resendSignupOTP,
  signupAlumni,
  signupStudent,
  verifySignupOTP,
  forgotPassword,
  resetPassword,
  resendResetOTP,
} from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  alumniSignupSchema,
  loginSchema,
  studentSignupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup/student", validate(studentSignupSchema), signupStudent);
router.post("/signup/alumni", validate(alumniSignupSchema), signupAlumni);
router.post("/login", validate(loginSchema), login);

router.post("/verify-signup-otp", protect, verifySignupOTP);
router.post("/resend-signup-otp", protect, resendSignupOTP);

// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post(
  "/resend-reset-otp",
  validate(forgotPasswordSchema),
  resendResetOTP,
); // reuses same schema

// TODO: Add these later
// router.post('/signup/alumni', validate(alumniSignupSchema), signupAlumni);
// router.post('/login', validate(loginSchema), login);

export default router;
