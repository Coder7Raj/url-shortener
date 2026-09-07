const express = require("express");

const qrRoutes = require("../modules/qr/qr.routes.js");
const dashboardRoutes = require("../modules/dashboard/dashboard.route.js");
const adminRoutes = require("../modules/admin/admin.routes.js");
const analyticsRoutes = require("../modules/analytics/analytics.routes.js");
const healthRoutes = require("../modules/health/health.routes.js");
const authRoutes = require("../modules/auth/auth.routes.js");
const urlRoutes = require("../modules/urls/url.routes.js");

const router = express.Router();

router.use("/health", healthRoutes);

router.use("/auth", authRoutes);

router.use("/urls", urlRoutes);

router.use("/analytics", analyticsRoutes);

router.use("/dashboard", dashboardRoutes);

router.use(qrRoutes);

router.use("/admin", adminRoutes);

module.exports = router;
