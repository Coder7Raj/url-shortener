const express = require("express");

const authMiddleware = require("../../middlewares/auth.middleware.js");
const validate = require("../../middlewares/validate.middleware.js");
const controller = require("./dashboard.controller.js");
const {
  overviewSchema,
  recentUrlsSchema,
} = require("./dashboard.validation.js");

const router = express.Router();

router.get(
  "/overview",
  authMiddleware,
  validate(overviewSchema),
  controller.getOverview,
);

router.get(
  "/recent-urls",
  authMiddleware,
  validate(recentUrlsSchema),
  controller.getRecentUrls,
);

module.exports = router;
