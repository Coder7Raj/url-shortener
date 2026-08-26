const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware.js");
const adminMiddleware = require("../../middlewares/admin.middleware.js");

const controller = require("./admin.controller.js");

router.use(authMiddleware, adminMiddleware);

router.get("/dashboard", controller.getDashboard);

router.get("/analytics", controller.getAnalytics);

router.get("/users", controller.getUsers);

module.exports = router;
