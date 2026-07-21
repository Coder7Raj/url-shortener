const express = require("express");

const router = express.Router();

const validate = require("../../middlewares/validate.middleware.js");

const { registerSchema } = require("./auth.validation.js");

const controller = require("./auth.controller.js");

router.post("/register", validate(registerSchema), controller.register);

module.exports = router;
