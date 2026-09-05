const { z } = require("zod");

const httpUrlSchema = z
  .string()
  .trim()
  .url("Please provide a valid URL")
  .refine(
    (value) => {
      try {
        const url = new URL(value);

        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    },
    {
      message: "Only HTTP and HTTPS URLs are allowed",
    },
  );

const shortCodeSchema = z
  .string()
  .trim()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - are allowed")
  .regex(/[a-zA-Z0-9]/, "Alias must contain at least one letter or number");

const futureDateTimeSchema = z
  .string()
  .datetime()
  .refine(
    (value) => {
      return new Date(value).getTime() > Date.now();
    },
    {
      message: "Expiration date must be in the future",
    },
  );

const createUrlSchema = z.object({
  body: z.object({
    originalUrl: httpUrlSchema,

    customAlias: shortCodeSchema.optional(),

    expiresAt: futureDateTimeSchema.optional(),
  }),
});

const redirectSchema = z.object({
  params: z.object({
    shortCode: shortCodeSchema,
  }),
});

const listUrlsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z.string().trim().max(100).optional(),

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
    originalUrl: httpUrlSchema.optional(),

    customAlias: shortCodeSchema.optional(),

    title: z.string().trim().max(255).optional(),

    description: z.string().trim().max(2000).optional(),

    expiresAt: futureDateTimeSchema.optional(),

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
