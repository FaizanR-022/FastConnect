import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  updateAlumniProfileSchema,
  updateStudentProfileSchema,
} from "../validations/userValidation.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error.name === "ValidationError") {
        const message = error.errors[0];
        return next(new AppError(message, 400));
      }
      return next(new AppError("Validation error", 500));
    }
  };
};

export const validateUpdateUser = asyncHandler(async (req, res, next) => {
  // Protect middleware adds this user to req
  const userType = req.user.user_type;

  const schema =
    userType === "student"
      ? updateStudentProfileSchema
      : updateAlumniProfileSchema;

  await schema.validate(req.body, { abortEarly: false });
  next();
});

// export const validateUpdateUser = () => {
// return async (req, res, next) => {
//   try {
//     console.log("Reaching here 2");
//     // Protect middleware adds this user to req
//     const userType = req.user.user_type;

//     const schema =
//       userType === "student"
//         ? updateStudentProfileSchema
//         : updateAlumniProfileSchema;

//     await schema.validate(req.body, { abortEarly: false });
//     next();
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       const message = err.errors[0];
//       return next(new AppError(message, 400));
//     }
//     return next(new AppError("Validation error", 500));
//   }
// };
// };
