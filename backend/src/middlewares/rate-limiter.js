// add near imports in src/routers/users-router.js
import rateLimit from "express-rate-limit";

const isProduction = process.env.NODE_ENV === "production";

// Limit for login: 5 attempts per 15 minutes, skip counting successful requests
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: true, // don't count successful logins
  handler: (req, res /*, next */) => {
    return res.status(429).json({
      success: false,
      error: "Too many login attempts. Try again later.",
    });
  },
});