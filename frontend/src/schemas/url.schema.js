import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z.string().url("Please provide a valid URL"),

  customAlias: z
    .string()
    .min(3, "Custom alias must be at least 3 characters")
    .max(20, "Custom alias cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - are allowed")
    .optional()
    .or(z.literal("")),

  expiresAt: z.string().optional(),
});

export const updateUrlSchema = z.object({
  originalUrl: z
    .string()
    .url("Please provide a valid URL")
    .optional()
    .or(z.literal("")),

  customAlias: z
    .string()
    .min(3, "Custom alias must be at least 3 characters")
    .max(20, "Custom alias cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - are allowed")
    .optional()
    .or(z.literal("")),

  title: z.string().max(255, "Title cannot exceed 255 characters").optional(),

  description: z.string().optional(),

  expiresAt: z.string().datetime().optional().or(z.literal("")),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
