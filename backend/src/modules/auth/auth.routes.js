const express = require("express");

const router = express.Router();

const validate = require("../../middlewares/validate.middleware.js");

const { registerSchema, loginSchema } = require("./auth.validation.js");

const controller = require("./auth.controller.js");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
