const express = require("express");

const qrRoutes = require("../modules/qr/qr.routes.js");
const dashboardRoutes = require("../modules/dashboard/dashboard.route.js");
const router = express.Router();

router.use("/health", require("../modules/health/health.routes.js"));

router.use("/auth", require("../modules/auth/auth.routes.js"));
router.use("/urls", require("../modules/urls/url.routes.js"));
router.use("/dashboard", dashboardRoutes);

router.use(qrRoutes);
module.exports = router;
