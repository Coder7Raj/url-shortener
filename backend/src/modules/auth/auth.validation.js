const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),

  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),

  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

module.exports = {
  registerSchema,
};
