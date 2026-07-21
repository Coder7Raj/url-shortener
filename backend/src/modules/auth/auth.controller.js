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

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await service.getCurrentUser(req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", {
      user,
    }),
  );
});

module.exports = {
  register,
  login,
  getCurrentUser,
};
