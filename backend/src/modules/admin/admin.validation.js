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

    status: z
      .enum(["ACTIVE", "REVOKED", "EXPIRED"])
      .or(z.literal(""))
      .optional(),
  }),
});

const adminUrlsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).optional(),

    limit: z.coerce.number().int().min(1).max(100).optional(),

    search: z.string().trim().optional(),

    status: z
      .enum(["ACTIVE", "INACTIVE", "EXPIRED", "DELETED"])
      .or(z.literal(""))
      .optional(),
  }),
});

const updateUrlStatusSchema = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "INACTIVE", "EXPIRED"]),
  }),
});

const getAuditLogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),

  limit: z.coerce.number().int().min(1).max(100).optional().default(10),

  search: z.string().optional().default(""),

  action: z.string().optional().default(""),

  entityType: z.string().optional().default(""),
});

module.exports = {
  updateUserStatusSchema,
  updateUserRoleSchema,
  sessionsQuerySchema,
  adminUrlsQuerySchema,
  updateUrlStatusSchema,
  getAuditLogsQuerySchema,
};
