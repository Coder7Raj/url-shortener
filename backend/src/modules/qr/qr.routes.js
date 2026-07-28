const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware.js");
const validate = require("../../middlewares/validate.middleware.js");

const controller = require("./qr.controller.js");

const { qrParamsSchema } = require("./qr.validation.js");

router.post(
  "/urls/:id/qr",
  authMiddleware,
  validate(qrParamsSchema),
  controller.generateQrCode,
);

router.get(
  "/urls/:id/qr",
  authMiddleware,
  validate(qrParamsSchema),
  controller.getQrCode,
);

router.delete(
  "/urls/:id/qr",
  authMiddleware,
  validate(qrParamsSchema),
  controller.deleteQrCode,
);

module.exports = router;
