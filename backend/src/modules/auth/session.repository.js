const prisma = require("../../config/prisma.js");

const createSession = async (data) => {
  return prisma.sessions.create({
    data,
  });
};

const findSessionByTokenId = async (tokenId) => {
  return prisma.sessions.findUnique({
    where: {
      token_id: tokenId,
    },
  });
};

const deleteSession = async (sessionId) => {
  return prisma.sessions.delete({
    where: {
      session_id: BigInt(sessionId),
    },
  });
};

const deleteUserSessions = async (userId) => {
  return prisma.sessions.deleteMany({
    where: {
      user_id: BigInt(userId),
    },
  });
};

module.exports = {
  createSession,
  findSessionByTokenId,
  deleteSession,
  deleteUserSessions,
};
