const express = require("express");
const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const controller = require("./url.controller.js");
const {
  createUrlSchema,
  redirectSchema,
  listUrlsSchema,
  getUrlSchema,
  updateUrlSchema,
  deleteUrlSchema,
} = require("./url.validation.js");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(createUrlSchema),
  controller.createShortUrl,
);
router.get("/", authMiddleware, validate(listUrlsSchema), controller.getMyUrls);

router.get(
  "/:id",
  authMiddleware,
  validate(getUrlSchema),
  controller.getUrlById,
);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateUrlSchema),
  controller.updateUrl,
);

router.delete(
  "/:id",
  authMiddleware,
  validate(deleteUrlSchema),
  controller.deleteUrl,
);

router.get("/:shortCode", validate(redirectSchema), controller.redirect);

module.exports = router;
