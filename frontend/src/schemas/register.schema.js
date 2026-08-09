import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters"),

    name: z.string().trim().min(2, "Name must be at least 2 characters"),

    email: z.string().trim().email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
