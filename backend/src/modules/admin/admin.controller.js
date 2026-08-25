const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./admin.service.js");

const getDashboard = asyncHandler(async (req, res) => {
  const data = await service.getDashboard();

  res
    .status(200)
    .json(new ApiResponse(200, "Admin dashboard fetched successfully", data));
});

const getAnalytics = asyncHandler(async (req, res) => {
  const data = await service.getAnalytics(req.query.days);

  res
    .status(200)
    .json(new ApiResponse(200, "Admin analytics fetched successfully", data));
});

module.exports = {
  getDashboard,
  getAnalytics,
};
