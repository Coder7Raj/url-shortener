const repository = require("./url.repository.js");
const { generateShortCode } = require("./shortCode.generator.js");
const { toUrlResponse } = require("./url.dto.js");

const ApiError = require("../../utils/apiError.js");
const { SHORT_URL_STATUS } = require("./constants.js");

const generateUniqueShortCode = async () => {
  while (true) {
    const code = generateShortCode();

    const exists = await repository.findByShortCode(code);

    if (!exists) {
      return code;
    }
  }
};

const createShortUrl = async (userId, payload) => {
  let shortCode;

  if (payload.customAlias) {
    const exists = await repository.findByShortCode(payload.customAlias);

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

module.exports = {
  createShortUrl,
};
