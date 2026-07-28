const { z } = require("zod");

const qrParamsSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});

module.exports = {
  qrParamsSchema,
};
