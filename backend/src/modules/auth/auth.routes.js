const express = require("express");

const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const {
  registerSchema,
  loginSchema,
  sessionsSchema,
  updateProfileSchema,
  changePasswordSchema,
} = require("./auth.validation.js");

const controller = require("./auth.controller.js");

const {
  authRateLimiter,
} = require("../../middlewares/rateLimiter.middleware.js");

const router = express.Router();

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  controller.register,
);
router.post("/login", authRateLimiter, validate(loginSchema), controller.login);
router.get("/me", authMiddleware, controller.getCurrentUser);
router.post("/refresh-token", authRateLimiter, controller.refreshToken);
router.post("/logout", controller.logout);
router.post("/logout-all", authMiddleware, controller.logoutAll);
router.get(
  "/sessions",
  authMiddleware,
  validate(sessionsSchema),
  controller.getSessions,
);

router.patch(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  controller.updateProfile,
);
router.patch(
  "/change-password",
  authMiddleware,
  validate(changePasswordSchema),
  controller.changePassword,
);
module.exports = router;
