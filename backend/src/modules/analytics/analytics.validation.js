const { z } = require("zod");

const getAnalyticsSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),
});

const timelineSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),

  query: z.object({
    range: z.enum(["7d", "30d", "90d", "365d"]).default("30d"),
  }),
});

module.exports = {
  getAnalyticsSchema,
  timelineSchema,
};
