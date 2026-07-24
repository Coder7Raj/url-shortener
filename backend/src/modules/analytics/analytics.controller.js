const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./analytics.service.js");

const getAnalytics = asyncHandler(async (req, res) => {
  const data = await service.getAnalytics(req.user.id, req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Analytics fetched successfully", data));
});

module.exports = {
  getAnalytics,
};
