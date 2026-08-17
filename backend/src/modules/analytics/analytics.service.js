const repository = require("./analytics.repository.js");

const {
  validateOwnership,
  getDateRanges,
  getTimelineStartDate,
  fillMissingTimelineDays,
} = require("./analytics.helpers.js");

const {
  toSummaryDto,
  toTimelineDto,
  toGroupedDto,
  toDashboardDto,
} = require("./analytics.dto.js");

/**
 * Summary analytics for one URL
 */
const getSummary = async (userId, urlId) => {
  const url = await validateOwnership(urlId, userId);
  const { today, week, month } = getDateRanges();

  const [totalClicks, todayClicks, weekClicks, monthClicks, uniqueVisitors] =
    await Promise.all([
      repository.countClicks({
        url_id: BigInt(urlId),
      }),
      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: { gte: today },
      }),
      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: { gte: week },
      }),
      repository.countClicks({
        url_id: BigInt(urlId),
        clicked_at: { gte: month },
      }),
      repository.countUniqueVisitors(urlId),
    ]);

  return toSummaryDto({
    url,
    totalClicks,
    todayClicks,
    weekClicks,
    monthClicks,
    uniqueVisitors,
  });
};

/**
 * Timeline analytics for one URL
 */
const getTimeline = async (userId, urlId, range = "30d") => {
  await validateOwnership(urlId, userId);

  const startDate = getTimelineStartDate(range);
  const rows = await repository.getTimeline(urlId, startDate);

  const filledTimeline = fillMissingTimelineDays(rows, startDate);

  return toTimelineDto(range, filledTimeline);
};

/**
 * Countries analytics
 */
const getCountries = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getCountries(urlId);
  return toGroupedDto(rows, "country");
};

/**
 * Cities analytics
 */
const getCities = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getCities(urlId);
  return toGroupedDto(rows, "city");
};

/**
 * Browsers analytics
 */
const getBrowsers = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getBrowsers(urlId);
  return toGroupedDto(rows, "browser");
};

/**
 * Devices analytics
 */
const getDevices = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getDevices(urlId);
  return toGroupedDto(rows, "device");
};

/**
 * Operating systems analytics
 */
const getOperatingSystems = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getOperatingSystems(urlId);
  return toGroupedDto(rows, "os");
};

/**
 * Referrers analytics
 */
const getReferrers = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const rows = await repository.getReferrers(urlId);
  return toGroupedDto(rows, "referrer");
};

/**
 * Unified dashboard analytics
 */
const getDashboard = async (userId, urlId) => {
  await validateOwnership(urlId, userId);

  const [
    summary,
    timeline,
    countries,
    cities,
    browsers,
    devices,
    operatingSystems,
    referrers,
  ] = await Promise.all([
    getSummary(userId, urlId),
    getTimeline(userId, urlId, "30d"),
    getCountries(userId, urlId),
    getCities(userId, urlId),
    getBrowsers(userId, urlId),
    getDevices(userId, urlId),
    getOperatingSystems(userId, urlId),
    getReferrers(userId, urlId),
  ]);

  return toDashboardDto({
    summary,
    timeline,
    countries,
    cities,
    browsers,
    devices,
    operatingSystems,
    referrers,
  });
};

module.exports = {
  getSummary,
  getTimeline,
  getCountries,
  getCities,
  getBrowsers,
  getDevices,
  getOperatingSystems,
  getReferrers,
  getDashboard,
};
