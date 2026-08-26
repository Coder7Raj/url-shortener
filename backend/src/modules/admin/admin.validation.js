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

const sessionsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    status: z.enum(["ACTIVE", "REVOKED", "EXPIRED"]).optional(),
  }),
});

module.exports = {
  updateUserStatusSchema,
  updateUserRoleSchema,
  sessionsQuerySchema,
};
