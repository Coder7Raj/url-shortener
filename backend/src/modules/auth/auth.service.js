const bcrypt = require("bcrypt");
const { toUserResponse } = require("./auth.dto.js");
const ApiError = require("../../utils/apiError.js");
const repository = require("./auth.repository.js");
const { comparePassword, hashToken } = require("./auth.utils.js");

const {
  generateAccessToken,
  generateRefreshToken,
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

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
