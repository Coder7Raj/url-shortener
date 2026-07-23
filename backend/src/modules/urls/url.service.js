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

const redirectUrl = async (shortCode, requestInfo) => {
  const url = await repository.findUrlByShortCode(shortCode);

  if (!url) {
    throw new ApiError(404, "Short URL not found");
  }

  if (url.deleted_at) {
    throw new ApiError(410, "This link has been deleted");
  }

  if (url.status !== "ACTIVE") {
    throw new ApiError(410, "This link is no longer active");
  }

  if (url.expires_at && url.expires_at < new Date()) {
    await repository.markExpired(url.url_id);

    throw new ApiError(410, "This link has expired");
  }

  await prisma.$transaction(async (tx) => {
    await repository.registerClick(url.url_id, tx);

    await clickRepository.createClick(
      {
        url_id: url.url_id,
        ip_address: requestInfo.ip,
        user_agent: requestInfo.userAgent,
        referrer: requestInfo.referrer || null,
      },
      tx,
    );
  });

  return url.original_url;
};

const getMyUrls = async (userId, query) => {
  console.log("Authenticated User ID:", userId);
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

module.exports = {
  createShortUrl,
  redirectUrl,
  getMyUrls,
};
