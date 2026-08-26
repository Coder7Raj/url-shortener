const { z } = require("zod");

const updateUserStatusSchema = z.object({
  body: z.object({
    is_active: z.boolean(),
  }),
});

const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(["USER", "ADMIN"]),
  }),
});

module.exports = {
  updateUserStatusSchema,
  updateUserRoleSchema,
};
