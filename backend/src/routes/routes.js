const express = require("express");

const router = express.Router();

router.use("/health", require("../modules/health/health.routes.js"));

router.use("/auth", require("../modules/auth/auth.routes.js"));
module.exports = router;
