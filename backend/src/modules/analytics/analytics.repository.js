const prisma = require("../../config/prisma.js");

const findUrl = async (urlId) => {
  return prisma.urls.findUnique({
    where: {
      url_id: BigInt(urlId),
    },
  });
};

const countClicks = async (where) => {
  return prisma.clicks.count({
    where,
  });
};

const findClicks = async (where, orderBy = {}) => {
  return prisma.clicks.findMany({
    where,
    orderBy,
  });
};

const groupClicksBy = async (by, where) => {
  return prisma.clicks.groupBy({
    by,
    where,
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        [by]: "desc",
      },
    },
  });
};

module.exports = {
  findUrl,
  countClicks,
  findClicks,
  groupClicksBy,
};
