const prisma = require("../../config/prisma.js");

const getDashboardStats = async () => {
  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    adminUsers,
    totalUrls,
    activeUrls,
    inactiveUrls,
    expiredUrls,
    deletedUrls,
    totalClicks,
    activeSessions,
  ] = await Promise.all([
    prisma.users.count(),

    prisma.users.count({
      where: {
        is_active: true,
        deleted_at: null,
      },
    }),

    prisma.users.count({
      where: {
        is_active: false,
        deleted_at: null,
      },
    }),

    prisma.users.count({
      where: {
        role: "ADMIN",
        deleted_at: null,
      },
    }),

    prisma.urls.count(),

    prisma.urls.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.urls.count({
      where: {
        status: "INACTIVE",
      },
    }),

    prisma.urls.count({
      where: {
        status: "EXPIRED",
      },
    }),

    prisma.urls.count({
      where: {
        status: "DELETED",
      },
    }),

    prisma.clicks.count(),

    prisma.sessions.count({
      where: {
        revoked_at: null,
        expires_at: {
          gt: new Date(),
        },
      },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      admins: adminUsers,
    },

    urls: {
      total: totalUrls,
      active: activeUrls,
      inactive: inactiveUrls,
      expired: expiredUrls,
      deleted: deletedUrls,
    },

    clicks: {
      total: totalClicks,
    },

    sessions: {
      active: activeSessions,
    },
  };
};

const getRecentUsers = async (limit = 5) => {
  return prisma.users.findMany({
    where: {
      deleted_at: null,
    },

    select: {
      user_id: true,
      username: true,
      name: true,
      email: true,
      role: true,
      is_active: true,
      email_verified: true,
      last_login_at: true,
      created_at: true,
    },

    orderBy: {
      created_at: "desc",
    },

    take: limit,
  });
};

const getRecentUrls = async (limit = 5) => {
  return prisma.urls.findMany({
    select: {
      url_id: true,
      short_code: true,
      title: true,
      status: true,
      total_clicks: true,
      created_at: true,

      users: {
        select: {
          user_id: true,
          username: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },

    take: limit,
  });
};

const getRecentAuditLogs = async (limit = 10) => {
  return prisma.audit_logs.findMany({
    select: {
      log_id: true,
      action: true,
      entity_type: true,
      entity_id: true,
      ip_address: true,
      created_at: true,

      users: {
        select: {
          user_id: true,
          username: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },

    take: limit,
  });
};

const getAnalytics = async (days) => {
  const users = await prisma.$queryRaw`
    SELECT
      DATE(created_at) AS date,
      COUNT(*) AS count
    FROM users
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ${days - 1} DAY)
      AND deleted_at IS NULL
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  const urls = await prisma.$queryRaw`
    SELECT
      DATE(created_at) AS date,
      COUNT(*) AS count
    FROM urls
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ${days - 1} DAY)
      AND deleted_at IS NULL
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) ASC
  `;

  const clicks = await prisma.$queryRaw`
    SELECT
      DATE(clicked_at) AS date,
      COUNT(*) AS count
    FROM clicks
    WHERE clicked_at >= DATE_SUB(CURDATE(), INTERVAL ${days - 1} DAY)
    GROUP BY DATE(clicked_at)
    ORDER BY DATE(clicked_at) ASC
  `;

  return {
    users,
    urls,
    clicks,
  };
};

const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  status,
}) => {
  const skip = (page - 1) * limit;

  const where = {
    deleted_at: null,
  };

  if (search) {
    where.OR = [
      {
        username: {
          contains: search,
        },
      },
      {
        name: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (status === "ACTIVE") {
    where.is_active = true;
  }

  if (status === "INACTIVE") {
    where.is_active = false;
  }

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      skip,
      take: limit,

      select: {
        user_id: true,
        username: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
        is_active: true,
        email_verified: true,
        last_login_at: true,
        created_at: true,
        updated_at: true,
      },

      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.users.count({
      where,
    }),
  ]);

  return {
    users,
    total,
  };
};

module.exports = {
  getDashboardStats,
  getRecentUsers,
  getRecentUrls,
  getRecentAuditLogs,
  getAnalytics,
  getUsers,
};
