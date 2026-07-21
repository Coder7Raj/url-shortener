const asyncHandler = require("../../utils/asyncHandler.js");

const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./auth.service.js");

const register = asyncHandler(async (req, res) => {
  const user = await service.registerUser(req.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user,
    }),
  );
});

module.exports = {
  register,
};
