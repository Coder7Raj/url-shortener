const repository = require("./url.repository.js");
const { generateShortCode } = require("./shortCode.generator.js");
const { toUrlResponse } = require("./url.dto.js");
const clickRepository = require("../click/click.repository.js");
const ApiError = require("../../utils/apiError.js");
const { SHORT_URL_STATUS } = require("./constants.js");
const prisma = require("../../config/prisma.js");

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

module.exports = {
  createShortUrl,
  redirectUrl,
};
