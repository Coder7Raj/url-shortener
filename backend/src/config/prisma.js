const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient().$extends({
  query: {
    $allOperations: async ({ args, query }) => {
      const result = await query(args);

      return JSON.parse(
        JSON.stringify(result, (_, value) =>
          typeof value === "bigint" ? value.toString() : value,
        ),
      );
    },
  },
});

module.exports = prisma;
