const bcrypt = require("bcrypt");
const { toUserResponse } = require("./auth.dto.js");
const ApiError = require("../../utils/apiError.js");
const repository = require("./auth.repository.js");
const { comparePassword, hashToken, compareToken } = require("./auth.utils.js");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../services/jwt.services.js");

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

const loginUser = async ({ email, password }) => {
  const user = await repository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  const hashedRefresh = await hashToken(refreshToken);

  await repository.createRefreshToken({
    user_id: user.user_id,
    token_hash: hashedRefresh,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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

  const user = await repository.findUserById(payload.userId);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const tokens = await repository.findRefreshTokensByUserId(user.user_id);

  let matchedToken = null;

  for (const token of tokens) {
    const isMatch = await compareToken(refreshToken, token.token_hash);

    if (isMatch) {
      matchedToken = token;
      break;
    }
  }

  if (!matchedToken) {
    throw new ApiError(401, "Refresh token not recognized");
  }

  if (matchedToken.expires_at < new Date()) {
    await repository.deleteRefreshToken(matchedToken.token_id);

    throw new ApiError(401, "Refresh token expired");
  }

  const newAccessToken = generateAccessToken(user);

  const newRefreshToken = generateRefreshToken(user);

  const hashedToken = await hashToken(newRefreshToken);
  await repository.deleteRefreshToken(matchedToken.token_id);

  await repository.createRefreshToken({
    user_id: user.user_id,
    token_hash: hashedToken,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
};
