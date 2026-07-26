const ApiError = require("../../utils/apiError.js");
const repository = require("./analytics.repository.js");

const validateOwnership = async (urlId, userId) => {
  const url = await repository.findUrl(urlId);

  if (!url || url.deleted_at) {
    throw new ApiError(404, "URL not found");
  }

  if (Number(url.user_id) !== Number(userId)) {
    throw new ApiError(403, "You don't have permission to access this URL");
  }

  return url;
};

const getDateRanges = () => {
  const now = new Date();

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const week = new Date(now);
  week.setDate(now.getDate() - 7);

  const month = new Date(now);
  month.setMonth(now.getMonth() - 1);

  return {
    now,
    today,
    week,
    month,
  };
};

const getTimelineStartDate = (range) => {
  const start = new Date();

  switch (range) {
    case "7d":
      start.setDate(start.getDate() - 7);
      break;

    case "30d":
      start.setDate(start.getDate() - 30);
      break;

    case "90d":
      start.setDate(start.getDate() - 90);
      break;

    case "1y":
      start.setFullYear(start.getFullYear() - 1);
      break;

    default:
      throw new ApiError(400, "Invalid range");
  }

  start.setHours(0, 0, 0, 0);
  return start;
};

const normalizeDateKey = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  return String(value).slice(0, 10);
};

const fillMissingTimelineDays = (rows, startDate) => {
  const clickMap = new Map();

  rows.forEach((row) => {
    const key = normalizeDateKey(row.date);
    if (key) {
      clickMap.set(key, Number(row.clicks || 0));
    }
  });

  const result = [];
  const current = new Date(startDate);
  const end = new Date();
  end.setHours(0, 0, 0, 0);

  while (current <= end) {
    const date = current.toISOString().split("T")[0];
    result.push({
      date,
      clicks: clickMap.get(date) || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
};

module.exports = {
  validateOwnership,
  getDateRanges,
  getTimelineStartDate,
  fillMissingTimelineDays,
  normalizeDateKey,
};
