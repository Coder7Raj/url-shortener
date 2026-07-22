const prisma = require("../../config/prisma.js");

const createClick = async (data) => {
  return prisma.clicks.create({
    data,
  });
};

module.exports = {
  createClick,
};
