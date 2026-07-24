const express = require("express");

const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const controller = require("./analytics.controller.js");
const { getAnalyticsSchema } = require("./analytics.validation.js");

const router = express.Router();
router.get(
  "/url/:id",
  authMiddleware,
  validate(getAnalyticsSchema),
  controller.getAnalytics,
);

module.exports = router;
