import {
  CalendarDays,
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";

const SummaryCard = ({ title, value, description, icon: Icon }) => {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="mt-2 text-2xl font-bold">{value.toLocaleString()}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

const AnalyticsSummary = ({ summary }) => {
  if (!summary) {
    return null;
  }

  const analytics = summary.analytics;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-foreground">
      <SummaryCard
        title="Total Clicks"
        value={Number(analytics.totalClicks || 0)}
        description="All-time clicks"
        icon={MousePointerClick}
      />

      <SummaryCard
        title="Unique Visitors"
        value={Number(analytics.uniqueVisitors || 0)}
        description="Unique IP addresses"
        icon={Users}
      />

      <SummaryCard
        title="Today"
        value={Number(analytics.todayClicks || 0)}
        description="Clicks today"
        icon={CalendarDays}
      />

      <SummaryCard
        title="Last 30 Days"
        value={Number(analytics.monthClicks || 0)}
        description="Clicks during the last month"
        icon={TrendingUp}
      />
    </div>
  );
};

export default AnalyticsSummary;
