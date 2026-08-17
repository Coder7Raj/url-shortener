const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters"),

    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100),

    email: z.string().trim().email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email"),

    password: z.string().min(8, "Password is required"),
  }),
});

const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }),
});

const sessionsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(50).default(10),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters")
      .optional(),

    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100)
      .optional(),

    profilePicture: z
      .string()
      .trim()
      .url("Invalid profile picture URL")
      .nullable()
      .optional(),
  }),
});

const changePasswordSchema = z
  .object({
    body: z.object({
      currentPassword: z.string().min(8, "Current password is required"),

      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(100),

      confirmPassword: z.string().min(8, "Confirm password is required"),
    }),
  })
  .refine((data) => data.body.newPassword === data.body.confirmPassword, {
    message: "Passwords do not match",
    path: ["body", "confirmPassword"],
  });

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  sessionsSchema,
  updateProfileSchema,
  changePasswordSchema,
};
