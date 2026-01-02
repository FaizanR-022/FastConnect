import { AppError } from "../utils/AppError.js";

export const verifyApiKey = (req, res, next) => {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.SKIP_API_KEY === "true"
  ) {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: API key is required",
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid API key",
    });
  }

  next();
};
