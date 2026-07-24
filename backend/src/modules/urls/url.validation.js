const { z } = require("zod");

const createUrlSchema = z.object({
  body: z.object({
    originalUrl: z.string().url("Please provide a valid URL"),

    customAlias: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - are allowed")
      .optional(),

    expiresAt: z.string().datetime().optional(),
  }),
});

const redirectSchema = z.object({
  params: z.object({
    shortCode: z.string().min(1),
  }),
});

const listUrlsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z.string().trim().optional(),

    status: z.enum(["ACTIVE", "INACTIVE", "EXPIRED", "DELETED"]).optional(),

    sort: z.enum(["createdAt", "clicks", "expiresAt"]).default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
  }),
});

const getUrlSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const updateUrlSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),

  body: z.object({
    originalUrl: z.string().url().optional(),

    customAlias: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_-]+$/)
      .optional(),

    title: z.string().max(255).optional(),

    description: z.string().optional(),

    expiresAt: z.string().datetime().optional(),

    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
});

const deleteUrlSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const analyticsSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

module.exports = {
  createUrlSchema,
  redirectSchema,
  listUrlsSchema,
  getUrlSchema,
  updateUrlSchema,
  deleteUrlSchema,
  analyticsSchema,
};
