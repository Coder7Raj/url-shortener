const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./url.service.js");

const createShortUrl = asyncHandler(async (req, res) => {
  const url = await service.createShortUrl(req.user.id, req.body);

  res.status(201).json(
    new ApiResponse(201, "Short URL created successfully", {
      url,
    }),
  );
});

const redirect = asyncHandler(async (req, res) => {
  const originalUrl = await service.redirectUrl(req.params.shortCode, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
    referrer: req.get("referer"),
  });

  return res.redirect(302, originalUrl);
});

module.exports = {
  createShortUrl,
  redirect,
};
