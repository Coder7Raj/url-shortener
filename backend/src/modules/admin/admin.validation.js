const { z } = require("zod");

const updateUserStatusSchema = z.object({
  body: z.object({
    is_active: z.boolean(),
  }),
});

module.exports = {
  updateUserStatusSchema,
};
