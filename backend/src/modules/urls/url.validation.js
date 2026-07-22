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
  }),
});

module.exports = {
  createUrlSchema,
  redirectSchema,
  listUrlsSchema,
};
