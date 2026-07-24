const repository = require("./url.repository.js");
const { generateShortCode } = require("./shortCode.generator.js");
const { toUrlResponse } = require("./url.dto.js");
const clickRepository = require("../click/click.repository.js");
const ApiError = require("../../utils/apiError.js");
const { SHORT_URL_STATUS } = require("./constants.js");
const prisma = require("../../config/prisma.js");
const { getPagination } = require("../../utils/pagination.js");

const generateUniqueShortCode = async () => {
  while (true) {
    const code = generateShortCode();

    const exists = await repository.findUrlByShortCode(code);

    if (!exists) {
      return code;
    }
  }
};

const createShortUrl = async (userId, payload) => {
  let shortCode;

  if (payload.customAlias) {
    const exists = await repository.findUrlByShortCode(payload.customAlias);

    if (exists) {
      throw new ApiError(409, "Custom alias already exists");
    }

    shortCode = payload.customAlias;
  } else {
    shortCode = await generateUniqueShortCode();
  }

  const url = await repository.createUrl({
    user_id: BigInt(userId),
    original_url: payload.originalUrl,
    short_code: shortCode,
    expires_at: payload.expiresAt ? new Date(payload.expiresAt) : null,
    status: SHORT_URL_STATUS.ACTIVE,
  });

  return toUrlResponse(url);
};

const redirectUrl = async (shortCode, clickData) => {
  const url = await repository.findUrlByShortCode(shortCode);

  if (!url) {
    throw new ApiError(404, "Short URL not found");
  }

  if (url.deleted_at || url.status === "DELETED") {
    throw new ApiError(404, "Short URL not found");
  }

  if (url.status !== "ACTIVE") {
    throw new ApiError(403, "This URL is inactive");
  }

  if (url.expires_at && new Date(url.expires_at) < new Date()) {
    throw new ApiError(410, "This URL has expired");
  }

  await prisma.$transaction([
    prisma.clicks.create({
      data: {
        url_id: url.url_id,
        ip_address: clickData.ip_address,
        country: clickData.country,
        city: clickData.city,
        browser: clickData.browser,
        device: clickData.device,
        os: clickData.os,
        referrer: clickData.referrer,
        user_agent: clickData.user_agent,
      },
    }),

    prisma.urls.update({
      where: {
        url_id: url.url_id,
      },
      data: {
        total_clicks: {
          increment: 1,
        },
        last_clicked_at: new Date(),
      },
    }),
  ]);

  return url.original_url;
};

const getMyUrls = async (userId, query) => {
  const page = query.page;
  const limit = query.limit;

  const skip = (page - 1) * limit;

  const where = {
    user_id: BigInt(userId),
    deleted_at: null,
  };

  // Search
  if (query.search) {
    where.OR = [
      {
        original_url: {
          contains: query.search,
        },
      },
      {
        short_code: {
          contains: query.search,
        },
      },
      {
        title: {
          contains: query.search,
        },
      },
    ];
  }

  // Filter
  if (query.status) {
    where.status = query.status;
  }

  // Sorting
  const sortFields = {
    createdAt: "created_at",
    clicks: "total_clicks",
    expiresAt: "expires_at",
  };

  const orderBy = {
    [sortFields[query.sort]]: query.order,
  };

  const [urls, totalItems] = await Promise.all([
    repository.findUrls({
      where,
      skip,
      take: limit,
      orderBy,
    }),

    repository.countUrls(where),
  ]);

  return {
    urls: urls.map(toUrlResponse),

    pagination: getPagination({
      page,
      limit,
      totalItems,
    }),
  };
};

const getUrlById = async (userId, urlId) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to access this URL");
  }

  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  return toUrlResponse(url);
};

const updateUrl = async (userId, urlId, payload) => {
  // Find the URL
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  // Check ownership
  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to update this URL");
  }

  // Check if already deleted
  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  // Check custom alias uniqueness
  if (payload.customAlias && payload.customAlias !== url.short_code) {
    const existingUrl = await repository.findUrlByShortCode(
      payload.customAlias,
    );

    if (existingUrl) {
      throw new ApiError(409, "Custom alias already exists");
    }
  }

  // Validate expiration date
  if (payload.expiresAt && new Date(payload.expiresAt) <= new Date()) {
    throw new ApiError(400, "Expiration date must be in the future");
  }

  // Build update object
  const data = {};

  if (payload.originalUrl) {
    data.original_url = payload.originalUrl;
  }

  if (payload.customAlias) {
    data.short_code = payload.customAlias;
  }

  if (payload.title !== undefined) {
    data.title = payload.title;
  }

  if (payload.description !== undefined) {
    data.description = payload.description;
  }

  if (payload.expiresAt) {
    data.expires_at = new Date(payload.expiresAt);
  }

  if (payload.status) {
    data.status = payload.status;
  }

  data.updated_at = new Date();

  // Update URL
  const updatedUrl = await repository.updateUrl(urlId, data);

  return toUrlResponse(updatedUrl);
};

const deleteUrl = async (userId, urlId) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to delete this URL");
  }

  if (url.deleted_at) {
    throw new ApiError(400, "URL has already been deleted");
  }

  await repository.softDeleteUrl(urlId);
};

const getAnalytics = async (userId, urlId) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to view analytics");
  }

  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const week = new Date();
  week.setDate(now.getDate() - 7);

  const month = new Date();
  month.setMonth(now.getMonth() - 1);

  const [totalClicks, todayClicks, weekClicks, monthClicks] = await Promise.all(
    [
      clickRepository.countClicks({
        url_id: BigInt(urlId),
      }),

      clickRepository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: today,
        },
      }),

      clickRepository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: week,
        },
      }),

      clickRepository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: month,
        },
      }),
    ],
  );

  return {
    url: {
      id: Number(url.url_id),
      shortCode: url.short_code,
      originalUrl: url.original_url,
    },

    analytics: {
      totalClicks,

      todayClicks,

      weekClicks,

      monthClicks,

      lastClickedAt: url.last_clicked_at,
    },
  };
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getMyUrls,
  getAnalytics,
  getUrlById,
  updateUrl,
  deleteUrl,
};
