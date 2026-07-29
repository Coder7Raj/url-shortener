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

module.exports = {
  getOverview,
};
