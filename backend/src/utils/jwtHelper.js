import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "./AppError.js";
dotenv.config();

export const generateToken = (payload) => {
  const rmbrMe = payload.rememberMe;
  delete payload.rememberMe;
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: rmbrMe ? "7d" : "2h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Your session has expired. Please login again.", 401);
    }

    if (err.name === "JsonWebTokenError") {
      throw new AppError("Invalid authentication token", 401);
    }

    // Other JWT errors
    throw new AppError("Authentication failed", 401);
  }
};
