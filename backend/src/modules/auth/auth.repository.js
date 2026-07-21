const prisma = require("../../config/prisma.js");

const findUserById = async (id) => {
  return prisma.users.findUnique({
    where: {
      user_id: BigInt(id),
    },
  });
};

const findUserByEmail = async (email) => {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
};

const findUserByUsername = async (username) => {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
};

const createUser = async (data) => {
  return prisma.users.create({
    data,
  });
};

const createRefreshToken = async (data) => {
  return prisma.refresh_tokens.create({
    data,
  });
};

const findRefreshTokensByUserId = async (userId) => {
  return prisma.refresh_tokens.findMany({
    where: {
      user_id: BigInt(userId),
    },
  });
};

const deleteRefreshToken = async (id) => {
  return prisma.refresh_tokens.delete({
    where: {
      token_id: BigInt(id),
    },
  });
};

const deleteAllRefreshTokens = async (userId) => {
  return prisma.refresh_tokens.deleteMany({
    where: {
      user_id: BigInt(userId),
    },
  });
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByUsername,
  createUser,
  createRefreshToken,
  findRefreshTokensByUserId,
  deleteRefreshToken,
  deleteAllRefreshTokens,
};
