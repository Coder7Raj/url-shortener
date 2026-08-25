const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware.js");
const adminMiddleware = require("../../middlewares/admin.middleware.js");

const controller = require("./admin.controller.js");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  controller.getDashboard,
);

router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  controller.getAnalytics,
);

module.exports = router;
