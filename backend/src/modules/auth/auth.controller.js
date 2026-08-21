const asyncHandler = require("../../utils/asyncHandler.js");
const ApiResponse = require("../../utils/apiResponse.js");
const service = require("./auth.service.js");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../../config/cookie.config.js");
const ApiError = require("../../utils/apiError.js");

const register = asyncHandler(async (req, res) => {
  const user = await service.registerUser(req.validated.body);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user,
    }),
  );
});

const login = asyncHandler(async (req, res) => {
  const result = await service.loginUser(
    req.validated.body,
    {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      deviceName: null,
    },
    {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      deviceName: req.get("x-device-name") || null,
    },
  );

  res
    .cookie("accessToken", result.accessToken, accessCookieOptions)
    .cookie("refreshToken", result.refreshToken, refreshCookieOptions)
    .status(200)
    .json(
      new ApiResponse(200, "Login successful", {
        user: result.user,
      }),
    );
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await service.logout(refreshToken, {
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      deviceName: req.get("x-device-name") || null,
    });
  }

  res
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .status(200)
    .json({
      success: true,
      statusCode: 200,
      message: "Logged out successfully",
    });
});

const logoutAll = asyncHandler(async (req, res) => {
  await service.logoutAll(req.user.id, {
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    deviceName: req.get("x-device-name") || null,
  });

  res
    .clearCookie("accessToken", accessCookieOptions)
    .clearCookie("refreshToken", refreshCookieOptions)
    .status(200)
    .json({
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
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  const tokens = await service.refreshAccessToken(refreshToken, {
    ipAddress: req.ip,
    userAgent: req.get("user-agent"),
    deviceName: req.get("x-device-name") || null,
  });

  res
    .cookie("accessToken", tokens.accessToken, accessCookieOptions)
    .cookie("refreshToken", tokens.refreshToken, refreshCookieOptions)
    .status(200)
    .json(
      new ApiResponse(200, "Token refreshed successfully", {
        success: true,
      }),
    );
});

const getSessions = asyncHandler(async (req, res) => {
  const data = await service.getUserSessions(
    req.user.id,
    req.query.page,
    req.query.limit,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Sessions fetched successfully", data));
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await service.updateProfile(req.user.id, req.validated.body);

  res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", {
      user,
    }),
  );
});

const changePassword = asyncHandler(async (req, res) => {
  const result = await service.changePassword(req.user.id, req.validated.body);

  res.status(200).json(new ApiResponse(200, result.message));
});

module.exports = {
  register,
  login,
  updateProfile,
  changePassword,
  logout,
  logoutAll,
  getSessions,
  getCurrentUser,
  refreshToken,
};
