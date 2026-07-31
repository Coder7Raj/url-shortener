const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./dashboard.service.js");

const getOverview = asyncHandler(async (req, res) => {
  const data = await service.getOverview(req.user.id);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Dashboard overview fetched successfully", data),
    );
});

const getRecentUrls = asyncHandler(async (req, res) => {
  const data = await service.getRecentUrls(req.user.id, req.query.limit);

  res
    .status(200)
    .json(new ApiResponse(200, "Recent URLs fetched successfully", data));
});

const getTopUrls = asyncHandler(async (req, res) => {
  const data = await service.getTopUrls(req.user.id, req.query.limit);

  res
    .status(200)
    .json(new ApiResponse(200, "Top URLs fetched successfully", data));
});

module.exports = {
  getOverview,
  getRecentUrls,
  getTopUrls,
};
