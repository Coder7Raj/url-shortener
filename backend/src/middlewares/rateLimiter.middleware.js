const rateLimit = require("express-rate-limit");

const createRateLimiter = ({
  windowMs,
  limit,
  message,
  standardHeaders = true,
  legacyHeaders = false,
}) => {
  return rateLimit({
    windowMs,
    limit,

    standardHeaders,
    legacyHeaders,

    handler: (req, res) => {
      return res.status(429).json({
        success: false,
        statusCode: 429,
        message,
      });
    },
  });
};

const globalRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests. Please try again later.",
});

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many authentication attempts. Please try again later.",
});

const redirectRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  message: "Too many requests for short URLs. Please try again later.",
});

module.exports = {
  globalRateLimiter,
  authRateLimiter,
  redirectRateLimiter,
};
