const express = require("express");

const validate = require("../../middlewares/validate.middleware.js");
const authMiddleware = require("../../middlewares/auth.middleware.js");
const controller = require("./qr.controller.js");
const { qrSchema } = require("./qr.validation.js");

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, validate(qrSchema), controller.generateQrCode);

router.get("/", authMiddleware, validate(qrSchema), controller.getQrImage);

module.exports = router;
