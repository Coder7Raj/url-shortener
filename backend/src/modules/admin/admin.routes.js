const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware.js");
const adminMiddleware = require("../../middlewares/admin.middleware.js");
const validate = require("../../middlewares/validate.middleware.js");

const {
  updateUserStatusSchema,
  updateUserRoleSchema,
} = require("./admin.validation.js");
const controller = require("./admin.controller.js");

router.use(authMiddleware, adminMiddleware);

router.get("/dashboard", controller.getDashboard);

router.get("/analytics", controller.getAnalytics);

router.get("/users", controller.getUsers);

router.get("/users/:id", controller.getUserDetails);

router.patch(
  "/users/:id/status",
  validate(updateUserStatusSchema),
  controller.updateUserStatus,
);

router.patch(
  "/users/:id/role",
  validate(updateUserRoleSchema),
  controller.updateUserRole,
);

router.delete("/users/:id", controller.deleteUser);

module.exports = router;
