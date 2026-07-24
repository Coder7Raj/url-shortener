const prisma = require("../../config/prisma");

const createUrl = async (data) => {
  return prisma.urls.create({
    data,
  });
};

const findUrlByShortCode = async (shortCode) => {
  return prisma.urls.findUnique({
    where: {
      short_code: shortCode,
    },
  });
};

const findUrlById = async (urlId) => {
  return prisma.urls.findUnique({
    where: {
      url_id: BigInt(urlId),
    },
  });
};

const findUrlsByUserId = async (userId) => {
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

const updateUrlById = async (urlId, data) => {
  return prisma.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data,
  });
};

const incrementClicks = async (urlId) => {
  return prisma.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data: {
      total_clicks: {
        increment: 1,
      },
    },
  });
};

const markExpired = async (urlId) => {
  return prisma.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data: {
      status: "EXPIRED",
    },
  });
};

// const softDeleteUrl = async (urlId) => {
//   return prisma.urls.update({
//     where: {
//       url_id: BigInt(urlId),
//     },
//     data: {
//       status: "DELETED",
//       deleted_at: new Date(),
//     },
//   });
// };

const registerClick = async (urlId, db = prisma) => {
  return db.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data: {
      total_clicks: {
        increment: 1,
      },
      last_clicked_at: new Date(),
    },
  });
};

const findUrls = async (options) => {
  return prisma.urls.findMany(options);
};

const countUrls = async (where) => {
  return prisma.urls.count({
    where,
  });
};

const updateUrl = async (urlId, data) => {
  return prisma.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data,
  });
};

const softDeleteUrl = async (urlId) => {
  return prisma.urls.update({
    where: {
      url_id: BigInt(urlId),
    },
    data: {
      status: "DELETED",
      deleted_at: new Date(),
      updated_at: new Date(),
    },
  });
};

const countClicks = async (where) => {
  return prisma.clicks.count({
    where,
  });
};

module.exports = {
  createUrl,
  findUrlByShortCode,
  findUrlById,
  findUrlsByUserId,
  registerClick,
  updateUrlById,
  incrementClicks,
  markExpired,
  findUrls,
  countUrls,
  updateUrl,
  softDeleteUrl,
  countClicks,
};
