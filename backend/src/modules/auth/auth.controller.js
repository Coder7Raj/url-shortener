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

const login = asyncHandler(async (req, res) => {
  const result = await service.loginUser(req.body);

  res.status(200).json(new ApiResponse(200, "Login successful", result));
});
module.exports = {
  register,
  login,
};
