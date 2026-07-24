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

  return Number(result[0].total || 0);
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

const getCountries = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["country"],

    where: {
      url_id: BigInt(urlId),
      country: {
        not: null,
      },
    },

    _count: {
      country: true,
    },

    orderBy: {
      _count: {
        country: "desc",
      },
    },
  });
};

const getCities = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["city"],

    where: {
      url_id: BigInt(urlId),
      city: {
        not: null,
      },
    },

    _count: {
      city: true,
    },

    orderBy: {
      _count: {
        city: "desc",
      },
    },
  });
};

const getBrowsers = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["browser"],

    where: {
      url_id: BigInt(urlId),
      browser: {
        not: null,
      },
    },

    _count: {
      browser: true,
    },

    orderBy: {
      _count: {
        browser: "desc",
      },
    },
  });
};

const getDevices = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["device"],

    where: {
      url_id: BigInt(urlId),
      device: {
        not: null,
      },
    },

    _count: {
      device: true,
    },

    orderBy: {
      _count: {
        device: "desc",
      },
    },
  });
};

const getOperatingSystems = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["os"],

    where: {
      url_id: BigInt(urlId),
      os: {
        not: null,
      },
    },

    _count: {
      os: true,
    },

    orderBy: {
      _count: {
        os: "desc",
      },
    },
  });
};

const getReferrers = async (urlId) => {
  return prisma.clicks.groupBy({
    by: ["referrer"],

    where: {
      url_id: BigInt(urlId),
      referrer: {
        not: null,
      },
    },

    _count: {
      referrer: true,
    },

    orderBy: {
      _count: {
        referrer: "desc",
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
    ORDER BY DATE(clicked_at);
  `;
};

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
};
