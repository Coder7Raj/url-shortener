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

const countUniqueVisitors = async (urlId) => {
  const result = await prisma.$queryRaw`
    SELECT COUNT(DISTINCT ip_address) AS total
    FROM clicks
    WHERE url_id = ${BigInt(urlId)}
  `;

  return Number(result?.[0]?.total || 0);
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
    ORDER BY DATE(clicked_at);
  `;
};

const groupClicksBy = async (field, urlId) => {
  return prisma.clicks.groupBy({
    by: [field],
    where: {
      url_id: BigInt(urlId),
      [field]: {
        not: null,
      },
    },
    _count: {
      [field]: true,
    },
    orderBy: {
      _count: {
        [field]: "desc",
      },
    },
  });
};

const getCountries = async (urlId) => groupClicksBy("country", urlId);
const getCities = async (urlId) => groupClicksBy("city", urlId);
const getBrowsers = async (urlId) => groupClicksBy("browser", urlId);
const getDevices = async (urlId) => groupClicksBy("device", urlId);
const getOperatingSystems = async (urlId) => groupClicksBy("os", urlId);
const getReferrers = async (urlId) => groupClicksBy("referrer", urlId);

module.exports = {
  findUrl,
  countClicks,
  countUniqueVisitors,
  getTimeline,
  getCountries,
  getCities,
  getBrowsers,
  getDevices,
  getOperatingSystems,
  getReferrers,
  groupClicksBy,
};
