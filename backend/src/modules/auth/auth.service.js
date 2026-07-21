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

const loginUser = async ({ email, password }, deviceInfo) => {
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

  return {
    user: toUserResponse(user),
    accessToken,
    refreshToken,
  };
};

const getCurrentUser = async (userId) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return toUserResponse(user);
};

const refreshAccessToken = async (refreshToken) => {
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

  return {
    accessToken,

    refreshToken: newRefreshToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
};
