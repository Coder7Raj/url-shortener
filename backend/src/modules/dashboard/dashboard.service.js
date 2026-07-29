const repository = require("./dashboard.repository.js");
const { getDateRanges } = require("./dashboard.helpers.js");
const { toOverviewDto } = require("./dashboard.dto.js");

const getOverview = async (userId) => {
  const { today, week, month } = getDateRanges();

  const [
    totalUrls,
    activeUrls,
    expiredUrls,
    deletedUrls,
    totalClicks,
    todayClicks,
    weekClicks,
    monthClicks,
  ] = await Promise.all([
    repository.countUserUrls(userId),
    repository.countActiveUrls(userId),
    repository.countExpiredUrls(userId),
    repository.countDeletedUrls(userId),
    repository.countClicks(userId),
    repository.countTodayClicks(userId, today),
    repository.countWeekClicks(userId, week),
    repository.countMonthClicks(userId, month),
  ]);

  return toOverviewDto({
    totalUrls,
    activeUrls,
    expiredUrls,
    deletedUrls,
    totalClicks,
    todayClicks,
    weekClicks,
    monthClicks,
  });
};

module.exports = {
  getOverview,
};
