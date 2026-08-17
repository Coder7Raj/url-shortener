const bcrypt = require("bcrypt");
const { toUserResponse } = require("./auth.dto.js");
const ApiError = require("../../utils/apiError.js");
const repository = require("./auth.repository.js");
const { comparePassword, hashToken, compareToken } = require("./auth.utils.js");
const { calculateRefreshTokenExpiry } = require("../../utils/date.js");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../services/jwt.services.js");
const sessionRepository = require("./session.repository.js");
const { toSessionListResponse } = require("./session.dto.js");
const audit = require("../../common/audit");

const registerUser = async (userData) => {
  const emailExists = await repository.findUserByEmail(userData.email);

  if (emailExists) {
    throw new ApiError(409, "Email already exists");
  }

  const usernameExists = await repository.findUserByUsername(userData.username);

  if (usernameExists) {
    throw new ApiError(409, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = await repository.createUser({
    username: userData.username,
    name: userData.name,
    email: userData.email,
    password_hash: hashedPassword,
  });

  return toUserResponse(user);
};

const loginUser = async ({ email, password }, deviceInfo, requestContext) => {
  const user = await repository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);

  const { refreshToken, tokenId } = generateRefreshToken(user);

  const hashedToken = await hashToken(refreshToken);

  await sessionRepository.createSession({
    user_id: user.user_id,
    token_id: tokenId,
    token_hash: hashedToken,
    ip_address: deviceInfo.ipAddress,
    user_agent: deviceInfo.userAgent,
    device_name: deviceInfo.deviceName,
    expires_at: calculateRefreshTokenExpiry(),
  });

  await repository.updateLastLogin(user.user_id);

  await audit.auth.login({
    userId: user.user_id,
    requestContext,
  });

  return {
    user: toUserResponse(user),
    accessToken,
    refreshToken,
  };
};

const logout = async (refreshToken, requestContext) => {
  const payload = verifyRefreshToken(refreshToken);

  if (payload.type !== "refresh") {
    throw new ApiError(401, "Invalid token type");
  }

  const session = await sessionRepository.findSessionByTokenId(payload.jti);
  if (!session) {
    throw new ApiError(401, "Session not found");
  }

  await sessionRepository.deleteSession(session.session_id);

  await audit.auth.logout({
    userId: payload.sub,
    requestContext,
  });

  return;
};

const logoutAll = async (userId, requestContext) => {
  await sessionRepository.deleteUserSessions(userId);
  await audit.auth.logoutAll({
    userId,
    requestContext,
  });
};

const getCurrentUser = async (userId) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toUserResponse(user);
};

const refreshAccessToken = async (refreshToken, requestContext) => {
  const payload = verifyRefreshToken(refreshToken);
  if (payload.type !== "refresh") {
    throw new ApiError(401, "Invalid token type");
  }
  const session = await sessionRepository.findSessionByTokenId(payload.jti);

  if (!session) {
    throw new ApiError(401, "Session not found");
  }

  if (session.revoked_at) {
    throw new ApiError(401, "Session has been revoked");
  }
  if (session.expires_at < new Date()) {
    await sessionRepository.deleteSession(session.session_id);

    throw new ApiError(401, "Session expired");
  }

  const isValid = await compareToken(refreshToken, session.token_hash);

  if (!isValid) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await repository.findUserById(payload.sub);

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const accessToken = generateAccessToken(user);

  const { refreshToken: newRefreshToken, tokenId: newTokenId } =
    generateRefreshToken(user);

  await sessionRepository.deleteSession(session.session_id);

  await sessionRepository.createSession({
    user_id: user.user_id,

    token_id: newTokenId,

    token_hash: await hashToken(newRefreshToken),

    expires_at: calculateRefreshTokenExpiry(),

    device_name: session.device_name,

    ip_address: session.ip_address,

    user_agent: session.user_agent,
  });

  await audit.auth.refreshToken({
    userId: user.user_id,
    requestContext,
  });

  return {
    accessToken,

    refreshToken: newRefreshToken,
  };
};

const getUserSessions = async (userId, page = 1, limit = 10) => {
  const currentPage = Number(page);
  const currentLimit = Number(limit);

  const skip = (currentPage - 1) * currentLimit;

  const [sessions, total] = await Promise.all([
    sessionRepository.findUserSessions(userId, {
      skip,
      take: currentLimit,
    }),

    sessionRepository.countUserSessions(userId),
  ]);

  const totalPages = Math.ceil(total / currentLimit);

  return {
    sessions: toSessionListResponse(sessions),

    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  };
};

const updateProfile = async (userId, userData) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updateData = {};

  if (userData.username !== undefined && userData.username !== user.username) {
    const usernameExists = await repository.findUserByUsername(
      userData.username,
    );

    if (usernameExists && Number(usernameExists.user_id) !== Number(userId)) {
      throw new ApiError(409, "Username already exists");
    }

    updateData.username = userData.username;
  }

  if (userData.name !== undefined) {
    updateData.name = userData.name;
  }

  if (userData.profilePicture !== undefined) {
    updateData.profile_picture = userData.profilePicture;
  }

  if (Object.keys(updateData).length === 0) {
    return toUserResponse(user);
  }

  const updatedUser = await repository.updateUser(userId, updateData);

  return toUserResponse(updatedUser);
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isCurrentPasswordValid = await comparePassword(
    currentPassword,
    user.password_hash,
  );

  if (!isCurrentPasswordValid) {
    throw new ApiError(401, "Something went wrong !");
  }

  const isSamePassword = await comparePassword(newPassword, user.password_hash);

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password must be different from current password",
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await repository.updateUser(userId, {
    password_hash: hashedPassword,
  });

  return {
    message: "Password changed successfully",
  };
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  updateProfile,
  changePassword,
  logoutAll,
  getUserSessions,
  getCurrentUser,
  refreshAccessToken,
};
