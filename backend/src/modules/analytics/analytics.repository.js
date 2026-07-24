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

const getTimeline = async (urlId, startDate) => {
  return prisma.$queryRaw`
    SELECT
      DATE(clicked_at) AS date,
      COUNT(*) AS clicks
    FROM clicks
    WHERE
      url_id = ${BigInt(urlId)}
      AND clicked_at >= ${startDate}
    GROUP BY DATE(clicked_at)
    ORDER BY DATE(clicked_at) ASC;
  `;
};

module.exports = {
  findUrl,
  countClicks,
  findClicks,
  groupClicksBy,
  getTimeline,
};
