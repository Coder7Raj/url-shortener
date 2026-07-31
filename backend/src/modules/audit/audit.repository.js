const prisma = require("../../config/prisma.js");

const createLog = async (data) => {
  return prisma.audit_logs.create({
    data,
  });
};

module.exports = {
  createLog,
};
