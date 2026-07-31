const prisma = require("../../config/prisma.js");

const countUserUrls = async (userId) => {
  return prisma.urls.count({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
    },
  });
};

const countActiveUrls = async (userId) => {
  return prisma.urls.count({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
      status: "ACTIVE",
    },
  });
};

const countExpiredUrls = async (userId) => {
  return prisma.urls.count({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
      expires_at: {
        lt: new Date(),
      },
    },
  });
};

const countDeletedUrls = async (userId) => {
  return prisma.urls.count({
    where: {
      user_id: BigInt(userId),
      NOT: {
        deleted_at: null,
      },
    },
  });
};

const countClicks = async (userId) => {
  return prisma.clicks.count({
    where: {
      urls: {
        user_id: BigInt(userId),
      },
    },
  });
};

const countTodayClicks = async (userId, today) => {
  return prisma.clicks.count({
    where: {
      clicked_at: {
        gte: today,
      },
      urls: {
        user_id: BigInt(userId),
      },
    },
  });
};

const countWeekClicks = async (userId, week) => {
  return prisma.clicks.count({
    where: {
      clicked_at: {
        gte: week,
      },
      urls: {
        user_id: BigInt(userId),
      },
    },
  });
};

const countMonthClicks = async (userId, month) => {
  return prisma.clicks.count({
    where: {
      clicked_at: {
        gte: month,
      },
      urls: {
        user_id: BigInt(userId),
      },
    },
  });
};

const getRecentUrls = async (userId, limit = 10) => {
  return prisma.urls.findMany({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
    },

    orderBy: {
      created_at: "desc",
    },

    take: limit,
  });
};

const getTopUrls = async (userId, limit = 10) => {
  return prisma.urls.findMany({
    where: {
      user_id: BigInt(userId),
      deleted_at: null,
    },

    orderBy: [
      {
        total_clicks: "desc",
      },
      {
        created_at: "desc",
      },
    ],

    take: limit,
  });
};

module.exports = {
  countUserUrls,
  countActiveUrls,
  countExpiredUrls,
  getTopUrls,
  getRecentUrls,
  countDeletedUrls,
  countClicks,
  countTodayClicks,
  countWeekClicks,
  countMonthClicks,
};
