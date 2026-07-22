const asyncHandler = require("../../utils/asyncHandler.js");

const ApiResponse = require("../../utils/apiResponse.js");

const service = require("./auth.service.js");

const register = asyncHandler(async (req, res) => {
  const user = await service.registerUser(req.validated.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user,
    }),
  );
});

const login = asyncHandler(async (req, res) => {
  const result = await service.loginUser(req.validated.body, {
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    deviceName: null,
  });

  res.status(200).json(new ApiResponse(200, "Login successful", result));
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  await service.logout(refreshToken);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Logged out successfully",
  });
});

const logoutAll = asyncHandler(async (req, res) => {
  await service.logoutAll(req.user.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Logged out from all devices",
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await service.getCurrentUser(req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", {
      user,
    }),
  );
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.validated.body;

  const tokens = await service.refreshAccessToken(refreshToken);

  res
    .status(200)
    .json(new ApiResponse(200, "Token refreshed successfully", tokens));
});

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await service.getUserSessions(req.user.id);

  res.status(200).json(
    new ApiResponse(200, "Sessions fetched successfully", {
      sessions,
    }),
  );
});

module.exports = {
  register,
  login,
  logout,
  logoutAll,
  getSessions,
  getCurrentUser,
  refreshToken,
};
