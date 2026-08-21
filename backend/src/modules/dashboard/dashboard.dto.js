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

const toRecentUrlDto = (url) => ({
  id: Number(url.url_id),
  shortCode: url.short_code,
  originalUrl: url.original_url,
  title: url.title,
  description: url.description,
  status: url.status,
  totalClicks: Number(url.total_clicks),
  createdAt: url.created_at,
  expiresAt: url.expires_at,
});

const toRecentUrlsDto = (urls) => {
  return urls.map(toRecentUrlDto);
};

const toTopUrlDto = (url) => ({
  id: Number(url.url_id),
  shortCode: url.short_code,
  title: url.title,
  originalUrl: url.original_url,
  status: url.status,
  totalClicks: Number(url.total_clicks),
  createdAt: url.created_at,
  lastClickedAt: url.last_clicked_at,
});

const toTopUrlsDto = (urls) => urls.map(toTopUrlDto);

module.exports = {
  toOverviewDto,
  toRecentUrlDto,
  toRecentUrlsDto,
  toTopUrlDto,
  toTopUrlsDto,
};
