const { z } = require("zod");

const getAnalyticsSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});

module.exports = {
  getAnalyticsSchema,
};
