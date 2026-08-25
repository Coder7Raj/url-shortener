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

module.exports = {
  getDashboard,
};
