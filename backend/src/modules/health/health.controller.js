const ApiResponse = require("../../utils/apiResponse.js");

exports.healthCheck = (req, res) => {
  res.status(200).json(
    new ApiResponse(200, "Server is healthy", {
      uptime: process.uptime(),
      timestamp: new Date(),
    }),
  );
};
