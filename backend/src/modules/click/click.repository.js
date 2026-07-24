const prisma = require("../../config/prisma.js");

const createClick = async (data, db = prisma) => {
  return db.clicks.create({
    data,
  });
};

const countClicks = async (where) => {
  return prisma.clicks.count({
    where,
  });
};

module.exports = {
  createClick,
  countClicks,
};
