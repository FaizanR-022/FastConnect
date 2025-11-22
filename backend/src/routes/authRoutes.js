import express from "express";
import {
  login,
  signupAlumni,
  signupStudent,
} from "../controllers/authController.js";
import { validate } from "../middleware/validationMiddleware.js";
import {
  alumniSignupSchema,
  loginSchema,
  studentSignupSchema,
} from "../validations/authValidation.js";

const router = express.Router();

router.post("/signup/student", validate(studentSignupSchema), signupStudent);
router.post("/signup/alumni", validate(alumniSignupSchema), signupAlumni);
router.post("/login", validate(loginSchema), login);

// TODO: Add these later
// router.post('/signup/alumni', validate(alumniSignupSchema), signupAlumni);
// router.post('/login', validate(loginSchema), login);

export default router;
