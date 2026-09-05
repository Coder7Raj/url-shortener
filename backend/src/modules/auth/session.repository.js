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

const deleteUserSessions = async (userId) => {
  return prisma.sessions.deleteMany({
    where: {
      user_id: BigInt(userId),
    },
  });
};

const rotateSession = async (sessionId, newSessionData) => {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const revokedSession = await tx.sessions.updateMany({
      where: {
        session_id: BigInt(sessionId),
        revoked_at: null,
      },
      data: {
        revoked_at: now,
        last_used_at: now,
      },
    });

    if (revokedSession.count !== 1) {
      return null;
    }

    const newSession = await tx.sessions.create({
      data: newSessionData,
    });

    return newSession;
  });
};

const findUserSessions = async (userId, { skip, take }) => {
  return prisma.sessions.findMany({
    where: {
      user_id: BigInt(userId),
      revoked_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
    skip,
    take,
  });
};

const countUserSessions = async (userId) => {
  return prisma.sessions.count({
    where: {
      user_id: BigInt(userId),
      revoked_at: null,
    },
  });
};

const revokeSession = async (sessionId) => {
  return prisma.sessions.updateMany({
    where: {
      session_id: BigInt(sessionId),
      revoked_at: null,
    },
    data: {
      revoked_at: new Date(),
      last_used_at: new Date(),
    },
  });
};

const revokeUserSessions = async (userId) => {
  return prisma.sessions.updateMany({
    where: {
      user_id: BigInt(userId),
      revoked_at: null,
    },
    data: {
      revoked_at: new Date(),
    },
  });
};

module.exports = {
  createSession,
  findSessionByTokenId,
  updateSession,
  deleteSession,
  deleteUserSessions,
  rotateSession,
  findUserSessions,
  countUserSessions,
  revokeSession,
  revokeUserSessions,
};
