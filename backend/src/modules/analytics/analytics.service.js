const ApiError = require("../../utils/apiError.js");
const repository = require("./analytics.repository.js");

const getOwnedUrl = async (userId, urlId) => {
  const url = await repository.findUrl(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to access this URL");
  }

  return url;
};

const calculateStartDate = (range) => {
  const date = new Date();

  switch (range) {
    case "7d":
      date.setDate(date.getDate() - 7);
      break;

    case "30d":
      date.setDate(date.getDate() - 30);
      break;

    case "90d":
      date.setDate(date.getDate() - 90);
      break;

    case "365d":
      date.setDate(date.getDate() - 365);
      break;

    default:
      date.setDate(date.getDate() - 30);
  }

  return date;
};

const getAnalytics = async (userId, urlId) => {
  const url = await getOwnedUrl(userId, urlId);

  const now = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const week = new Date(now);
  week.setDate(now.getDate() - 7);

  const month = new Date(now);
  month.setMonth(now.getMonth() - 1);

  const [totalClicks, todayClicks, weekClicks, monthClicks] = await Promise.all(
    [
      repository.countClicks({
        url_id: BigInt(urlId),
      }),

      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: today,
        },
      }),

      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: week,
        },
      }),

      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: {
          gte: month,
        },
      }),
    ],
  );

  return {
    url: {
      id: Number(url.url_id),
      shortCode: url.short_code,
      originalUrl: url.original_url,
      title: url.title,
      status: url.status,
      totalClicks: Number(url.total_clicks),
      createdAt: url.created_at,
      expiresAt: url.expires_at,
    },

    analytics: {
      totalClicks,
      todayClicks,
      weekClicks,
      monthClicks,
      lastClickedAt: url.last_clicked_at,
    },
  };
};

const getTimeline = async (userId, urlId, range = "30d") => {
  const url = await repository.findUrl(urlId);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to view analytics");
  }

  if (url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  const startDate = calculateStartDate(range);

  const timeline = await repository.getTimeline(urlId, startDate);

  const clickMap = new Map();

  timeline.forEach((row) => {
    const key =
      typeof row.date === "string"
        ? row.date.slice(0, 10)
        : row.date.toISOString().split("T")[0];

    clickMap.set(key, Number(row.clicks));
  });

  const result = [];

  const current = new Date(startDate);

  const end = new Date();

  while (current <= end) {
    const date = current.toISOString().split("T")[0];

    result.push({
      date,
      clicks: clickMap.get(date) || 0,
    });

    current.setDate(current.getDate() + 1);
  }

  return {
    range,
    timeline: result,
  };
};

module.exports = {
  getAnalytics,
  getTimeline,
};
