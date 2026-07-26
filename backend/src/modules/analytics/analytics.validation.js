const { z } = require("zod");

const getAnalyticsSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

const timelineSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  query: z.object({
    range: z.enum(["7d", "30d", "90d", "1y"]).default("7d"),
  }),
});

module.exports = {
  getAnalyticsSchema,
  timelineSchema,
};
