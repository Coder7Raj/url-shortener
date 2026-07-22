const express = require("express");
const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const controller = require("./url.controller.js");
const {
  createUrlSchema,
  redirectSchema,
  listUrlsSchema,
} = require("./url.validation.js");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createUrlSchema),
  controller.createShortUrl,
);
router.get("/", authMiddleware, validate(listUrlsSchema), controller.getMyUrls);

router.get("/:shortCode", validate(redirectSchema), controller.redirect);

module.exports = router;
