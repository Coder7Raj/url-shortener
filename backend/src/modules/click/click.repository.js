const prisma = require("../../config/prisma.js");

const createClick = async (data, db = prisma) => {
  return db.clicks.create({
    data,
  });
};

module.exports = {
  createClick,
};
