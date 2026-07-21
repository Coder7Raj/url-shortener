const ApiError = require("../utils/apiError.js");

const notFound = (req, res, next) => {
  next(new ApiError(404, "Route Not Found"));
};

module.exports = notFound;
