const toUrlDto = (url) => ({
  id: Number(url.url_id),
  shortCode: url.short_code,
  originalUrl: url.original_url,
  title: url.title,
  description: url.description,
  status: url.status,
  totalClicks: Number(url.total_clicks || 0),
  createdAt: url.created_at,
  updatedAt: url.updated_at,
  expiresAt: url.expires_at,
  lastClickedAt: url.last_clicked_at,
});

const toSummaryDto = ({
  totalClicks,
  todayClicks,
  weekClicks,
  monthClicks,
  uniqueVisitors,
}) => ({
  totalClicks,
  todayClicks,
  weekClicks,
  monthClicks,
  uniqueVisitors,
});

const toTimelineDto = (timeline) =>
  timeline.map((item) => ({
    date: item.date,
    clicks: Number(item.clicks),
  }));

const toGroupedDto = (rows, field) =>
  rows.map((row) => ({
    name: row[field] || "Unknown",
    clicks: Number(row._count[field]),
  }));

const toDashboardDto = ({
  url,
  summary,
  timeline,
  countries,
  cities,
  browsers,
  devices,
  operatingSystems,
  referrers,
}) => ({
  url: toUrlDto(url),

  summary: toSummaryDto(summary),

  timeline: toTimelineDto(timeline),

  countries: toGroupedDto(countries, "country"),

  cities: toGroupedDto(cities, "city"),

  browsers: toGroupedDto(browsers, "browser"),

  devices: toGroupedDto(devices, "device"),

  operatingSystems: toGroupedDto(operatingSystems, "os"),

  referrers: toGroupedDto(referrers, "referrer"),
});

module.exports = {
  toUrlDto,
  toSummaryDto,
  toTimelineDto,
  toGroupedDto,
  toDashboardDto,
};
