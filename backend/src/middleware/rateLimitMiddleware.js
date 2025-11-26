import rateLimit from "express-rate-limit";

/*
 * Global rate limiter - applies to all API requests
 * Prevents abuse and protects server resources
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers

  // Skip rate limiting for certain conditions (optional)
  skip: (req) => {
    if (process.env.NODE_ENV === "development") {
      return true;
    }
    return false;
  },
});

/*
 * Strict rate limiter for authentication endpoints
 * Prevents brute force attacks on login/signup
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // Only 5 attempts per 15 minutes
  message: {
    success: false,
    message:
      "Too many authentication attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,

  // Slower response for failed attempts (makes brute force harder)
  skipSuccessfulRequests: true, // Don't count successful requests
});

/*
 * Moderate rate limiter for general API endpoints
 * More generous than auth, but still protective
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per 15 minutes
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Lenient rate limiter for read-only operations
 * Like viewing alumni profiles, getting data
 */
export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per 15 minutes
  message: {
    success: false,
    message: "Too many requests, please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for write operations
 * Like creating/updating/deleting data
 */
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Only 50 write operations per 15 minutes
  message: {
    success: false,
    message: "Too many write requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
