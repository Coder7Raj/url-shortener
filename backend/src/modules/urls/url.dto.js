const toUrlResponse = (url) => ({
  id: Number(url.url_id),
  shortCode: url.short_code,
  shortUrl: `${process.env.BASE_URL}/${url.short_code}`,
  originalUrl: url.original_url,
  title: url.title,
  description: url.description,
  totalClicks: Number(url.total_clicks),
  expiresAt: url.expires_at,
  status: url.status,
  createdAt: url.created_at,
});

module.exports = {
  toUrlResponse,
};
