const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware.js");
const validate = require("../../middlewares/validate.middleware.js");

const controller = require("./url.controller.js");

const { createUrlSchema } = require("./url.validation.js");

router.post(
  "/",
  authMiddleware,
  validate(createUrlSchema),
  controller.createShortUrl,
);

module.exports = router;
