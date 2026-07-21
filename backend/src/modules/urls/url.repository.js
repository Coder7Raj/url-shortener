const prisma = require("../../config/prisma.js");

const createUrl = async (data) => {
  return prisma.urls.create({
    data,
  });
};

const findByShortCode = async (shortCode) => {
  return prisma.urls.findUnique({
    where: {
      short_code: shortCode,
    },
  });
};

const findByUserId = async (userId) => {
  return prisma.urls.findMany({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

module.exports = {
  createUrl,
  findByShortCode,
  findByUserId,
};
