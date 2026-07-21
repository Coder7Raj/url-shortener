const prisma = require("../../config/prisma.js");

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

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  createRefreshToken,
};
