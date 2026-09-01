const repository = require("./admin.repository.js");
const ApiError = require("../../utils/apiError.js");

const getDashboard = async () => {
  const [stats, recentUsers, recentUrls, recentAuditLogs] = await Promise.all([
    repository.getDashboardStats(),
    repository.getRecentUsers(),
    repository.getRecentUrls(),
    repository.getRecentAuditLogs(),
  ]);

  return {
    stats,
    recentUsers,
    recentUrls,
    recentActivity: recentAuditLogs,
  };
};

const getAnalytics = async (days = 30) => {
  const parsedDays = Number(days);

  const allowedDays = [7, 30, 90];

  if (!allowedDays.includes(parsedDays)) {
    throw new ApiError(400, "Days must be one of: 7, 30, or 90");
  }

  const analytics = await repository.getAnalytics(parsedDays);

  const createDateRange = (days) => {
    const dates = [];

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);

      date.setDate(today.getDate() - i);

      dates.push(date);
    }

    return dates;
  };

  const dateRange = createDateRange(parsedDays);

  const normalizeData = (data) => {
    const map = new Map(
      data.map((item) => [
        new Date(item.date).toISOString().slice(0, 10),
        Number(item.count),
      ]),
    );

    return dateRange.map((date) => {
      const key = date.toISOString().slice(0, 10);

      return {
        date: key,
        count: map.get(key) || 0,
      };
    });
  };

  return {
    days: parsedDays,

    users: normalizeData(analytics.users),

    urls: normalizeData(analytics.urls),

    clicks: normalizeData(analytics.clicks),
  };
};

const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  status,
}) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    throw new ApiError(400, "Invalid page");
  }

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    throw new ApiError(400, "Limit must be between 1 and 100");
  }

  const allowedRoles = ["USER", "ADMIN"];

  if (role && !allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const allowedStatuses = ["ACTIVE", "INACTIVE"];

  if (status && !allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const result = await repository.getUsers({
    page: parsedPage,
    limit: parsedLimit,
    search: search.trim(),
    role,
    status,
  });

  return {
    users: result.users,
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total: result.total,
      totalPages: Math.ceil(result.total / parsedLimit),
    },
  };
};

const getUserDetails = async (userId) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    user: {
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      email: user.email,
      profile_picture: user.profile_picture,
      role: user.role,
      is_active: user.is_active,
      email_verified: user.email_verified,
      last_login_at: user.last_login_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },

    stats: {
      urls: user._count.urls,
      sessions: user._count.sessions,
      audit_logs: user._count.audit_logs,
    },
  };
};

const updateUserStatus = async (targetUserId, isActive, adminUser) => {
  const user = await repository.findUserById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (Number(user.user_id) === Number(adminUser.id) && isActive === false) {
    throw new ApiError(400, "You cannot deactivate your own account");
  }

  const updatedUser = await repository.updateUserStatus(targetUserId, isActive);

  return {
    user: updatedUser,
  };
};

const updateUserRole = async (targetUserId, role, adminUser) => {
  const user = await repository.findUserById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (Number(user.user_id) === Number(adminUser.id)) {
    throw new ApiError(400, "You cannot change your own role");
  }

  const updatedUser = await repository.updateUserRole(targetUserId, role);

  return {
    user: updatedUser,
  };
};

const deleteUser = async (targetUserId, adminUser) => {
  const user = await repository.findUserById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (Number(user.user_id) === Number(adminUser.id)) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  if (user.role === "ADMIN") {
    const activeAdmins = await repository.countActiveAdmins();

    if (activeAdmins <= 1) {
      throw new ApiError(400, "Cannot delete the last active admin");
    }
  }

  const deletedUser = await repository.deleteUser(targetUserId);

  return {
    user: deletedUser,
  };
};

const getAllSessions = async (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const search = query.search?.trim() || "";
  const status = query.status || "";

  const { sessions, total } = await repository.findAllSessions({
    page,
    limit,
    search,
    status,
  });

  return {
    sessions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const revokeSession = async (sessionId) => {
  const session = await repository.findSessionById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.revoked_at) {
    throw new ApiError(400, "Session is already revoked");
  }

  if (new Date(session.expires_at) <= new Date()) {
    throw new ApiError(400, "Session has already expired");
  }

  const revokedSession = await repository.revokeSession(sessionId);

  return {
    session: revokedSession,
  };
};

const revokeAllUserSessions = async (targetUserId, adminUser) => {
  const user = await repository.findUserById(targetUserId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (Number(user.user_id) === Number(adminUser.id)) {
    throw new ApiError(400, "You cannot revoke your own sessions");
  }

  const result = await repository.revokeAllUserSessions(targetUserId);

  return {
    revokedCount: result.count,
  };
};

const getUrls = async ({ page = 1, limit = 10, search = "", status = "" }) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    throw new ApiError(400, "Invalid page");
  }

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    throw new ApiError(400, "Limit must be between 1 and 100");
  }

  const allowedStatuses = ["ACTIVE", "INACTIVE", "EXPIRED", "DELETED"];

  if (status && !allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid URL status");
  }

  const result = await repository.findAllUrls({
    page: parsedPage,
    limit: parsedLimit,
    search: search.trim(),
    status,
  });

  return {
    urls: result.urls,

    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total: result.total,
      totalPages: Math.ceil(result.total / parsedLimit),
    },
  };
};

const getUrlDetails = async (urlId) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  return {
    url,
  };
};

const updateUrlStatus = async (urlId, status) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.status === "DELETED") {
    throw new ApiError(400, "Deleted URL cannot be updated");
  }

  const updatedUrl = await repository.updateUrlStatus(urlId, status);

  return {
    url: updatedUrl,
  };
};

const deleteUrl = async (urlId) => {
  const url = await repository.findUrlById(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.status === "DELETED") {
    throw new ApiError(400, "URL is already deleted");
  }

  const deletedUrl = await repository.deleteUrl(urlId);

  return {
    url: deletedUrl,
  };
};

const getAuditLogs = async ({
  page = 1,
  limit = 10,
  search = "",
  action = "",
  entityType = "",
} = {}) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    throw new ApiError(400, "Invalid page");
  }

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    throw new ApiError(400, "Limit must be between 1 and 100");
  }

  const result = await repository.findAllAuditLogs({
    page: parsedPage,
    limit: parsedLimit,
    search: search.trim(),
    action: action.trim(),
    entityType: entityType.trim(),
  });

  return {
    logs: result.logs,

    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      total: result.total,
      totalPages: Math.ceil(result.total / parsedLimit),
    },
  };
};

module.exports = {
  getDashboard,
  getAnalytics,
  getUsers,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  getAllSessions,
  revokeSession,
  revokeAllUserSessions,
  getUrls,
  getUrlDetails,
  updateUrlStatus,
  deleteUrl,
  getAuditLogs,
};
