const repository = require("./dashboard.repository.js");
const { getDateRanges } = require("./dashboard.helpers.js");
const { toOverviewDto, toRecentUrlsDto } = require("./dashboard.dto.js");

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

const getRecentUrls = async (userId, limit = 10) => {
  const urls = await repository.getRecentUrls(userId, Number(limit));

  return toRecentUrlsDto(urls);
};

module.exports = {
  getOverview,
  getRecentUrls,
};
