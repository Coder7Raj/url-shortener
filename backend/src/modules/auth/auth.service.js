const bcrypt = require("bcrypt");
const { toUserResponse } = require("./auth.dto.js");

const ApiError = require("../../utils/apiError.js");

const repository = require("./auth.repository.js");

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

module.exports = {
  registerUser,
};
