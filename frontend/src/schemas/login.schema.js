import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password cannot exceed 100 characters");

export const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),

  password: passwordSchema,
});
