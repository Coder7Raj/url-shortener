const express = require("express");

const validate = require("../middlewares/validate.middleware.js");
const {
  redirectRateLimiter,
} = require("../middlewares/rateLimiter.middleware.js");

const controller = require("../modules/urls/url.controller.js");
const { redirectSchema } = require("../modules/urls/url.validation.js");

const router = express.Router();

router.get(
  "/:shortCode",
  redirectRateLimiter,
  validate(redirectSchema),
  controller.redirect,
);

module.exports = router;
