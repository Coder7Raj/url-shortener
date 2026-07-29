const toOverviewDto = ({
  totalUrls,
  activeUrls,
  expiredUrls,
  deletedUrls,
  totalClicks,
  todayClicks,
  weekClicks,
  monthClicks,
}) => ({
  totalUrls,
  activeUrls,
  expiredUrls,
  deletedUrls,
  totalClicks,
  todayClicks,
  weekClicks,
  monthClicks,
});

module.exports = {
  toOverviewDto,
};
