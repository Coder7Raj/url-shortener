const express = require("express");

const router = express.Router();

const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");

const controller = require("./url.controller.js");

const { createUrlSchema, redirectSchema } = require("./url.validation.js");

router.post(
  "/",
  authMiddleware,
  validate(createUrlSchema),
  controller.createShortUrl,
);

router.get("/:shortCode", validate(redirectSchema), controller.redirect);

module.exports = router;
