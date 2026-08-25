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

module.exports = {
  getDashboard,
  getAnalytics,
};
