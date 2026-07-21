const express = require("express");

const router = express.Router();

const { healthCheck } = require("./health.controller.js");

router.get("/", healthCheck);

module.exports = router;
