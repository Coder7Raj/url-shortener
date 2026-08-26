const repository = require("./admin.repository.js");

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

module.exports = {
  getDashboard,
  getAnalytics,
  getUsers,
};
