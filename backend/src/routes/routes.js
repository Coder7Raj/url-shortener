const express = require("express");

const router = express.Router();

router.use("/health", require("../modules/health/health.routes.js"));

module.exports = router;
