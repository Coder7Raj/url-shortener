const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./url.service.js");

const createShortUrl = asyncHandler(async (req, res) => {
  const url = await service.createShortUrl(req.user.id, req.validated.body);

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

const getMyUrls = asyncHandler(async (req, res) => {
  const result = await service.getMyUrls(req.user.id, req.validated.query);

  res
    .status(200)
    .json(new ApiResponse(200, "URLs fetched successfully", result));
});

module.exports = {
  createShortUrl,
  redirect,
  getMyUrls,
};
