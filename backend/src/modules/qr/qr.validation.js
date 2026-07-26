const { z } = require("zod");

const qrSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

module.exports = {
  qrSchema,
};
