const ApiError = require("../../utils/apiError.js");
const repository = require("./analytics.repository.js");

const getAnalytics = async (userId, urlId) => {
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
      createdAt: url.created_at,
      expiresAt: url.expires_at,
      status: url.status,
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

module.exports = {
  getAnalytics,
};
