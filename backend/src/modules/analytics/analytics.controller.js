const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");
const service = require("./analytics.service.js");

const getDashboard = asyncHandler(async (req, res) => {
  const data = await service.getDashboard(req.user.id, req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Analytics fetched successfully", data));
});

const getTimeline = asyncHandler(async (req, res) => {
  const data = await service.getTimeline(
    req.user.id,
    req.params.id,
    req.query.range,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Timeline fetched successfully", data));
});

module.exports = {
  getDashboard,
  getTimeline,
};
