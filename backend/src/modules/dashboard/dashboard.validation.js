const { z } = require("zod");

const overviewSchema = z.object({});

const recentUrlsSchema = z.object({
  query: z.object({
    limit: z.coerce.number().min(1).max(50).default(10),
  }),
});

module.exports = {
  overviewSchema,
  recentUrlsSchema,
};
