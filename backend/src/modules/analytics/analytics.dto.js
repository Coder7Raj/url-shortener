// const toUrlDto = (url) => ({
//   id: Number(url.url_id),
//   shortCode: url.short_code,
//   originalUrl: url.original_url,
//   title: url.title,
//   description: url.description,
//   status: url.status,
//   totalClicks: Number(url.total_clicks || 0),
//   createdAt: url.created_at,
//   updatedAt: url.updated_at,
//   expiresAt: url.expires_at,
//   lastClickedAt: url.last_clicked_at,
// });

const toSummaryDto = ({
  url,
  totalClicks,
  todayClicks,
  weekClicks,
  monthClicks,
  uniqueVisitors,
}) => ({
  url: {
    id: Number(url.url_id),
    shortCode: url.short_code,
    originalUrl: url.original_url,
    title: url.title,
    description: url.description,
    status: url.status,
    totalClicks: Number(url.total_clicks || 0),
    lastClickedAt: url.last_clicked_at,
    createdAt: url.created_at,
    expiresAt: url.expires_at,
  },
  analytics: {
    totalClicks,
    todayClicks,
    weekClicks,
    monthClicks,
    uniqueVisitors,
  },
});

const toTimelineDto = (range, rows) => ({
  range,
  timeline: rows.map((row) => ({
    date: row.date,
    clicks: Number(row.clicks || 0),
  })),
});

const toGroupedDto = (rows, field) =>
  rows.map((row) => ({
    name: row[field] || "Unknown",
    clicks: Number(row._count?.[field] || 0),
  }));

const toDashboardDto = ({
  summary,
  timeline,
  countries,
  cities,
  browsers,
  devices,
  operatingSystems,
  referrers,
}) => ({
  summary,
  timeline,
  countries,
  cities,
  browsers,
  devices,
  operatingSystems,
  referrers,
});

module.exports = {
  toSummaryDto,
  toTimelineDto,
  toGroupedDto,
  toDashboardDto,
};
