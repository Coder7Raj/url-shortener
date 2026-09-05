const express = require("express");

const qrRoutes = require("../modules/qr/qr.routes.js");
const dashboardRoutes = require("../modules/dashboard/dashboard.route.js");
const adminRoutes = require("../modules/admin/admin.routes.js");
const analyticsRoutes = require("../modules/analytics/analytics.routes.js");

const router = express.Router();

router.use("/health", require("../modules/health/health.routes.js"));

router.use("/auth", require("../modules/auth/auth.routes.js"));

router.use("/urls", require("../modules/urls/url.routes.js"));

router.use("/api/v1/analytics", analyticsRoutes);

router.use("/dashboard", dashboardRoutes);

router.use(qrRoutes);

router.use("/admin", adminRoutes);

module.exports = router;
