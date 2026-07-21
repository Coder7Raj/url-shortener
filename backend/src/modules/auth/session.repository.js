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

const updateSession = async (sessionId, data) => {
  return prisma.sessions.update({
    where: {
      session_id: BigInt(sessionId),
    },
    data,
  });
};

const deleteSession = async (sessionId) => {
  return prisma.sessions.delete({
    where: {
      session_id: BigInt(sessionId),
    },
  });
};

const findUserSessions = async (userId) => {
  return prisma.sessions.findMany({
    where: {
      user_id: BigInt(userId),
      revoked_at: null,
    },
    orderBy: {
      created_at: "desc",
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
  findUserSessions,
  updateSession,
  deleteSession,
  deleteUserSessions,
};
