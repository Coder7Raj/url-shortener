import { Activity, BarChart3, Link2, MousePointerClick } from "lucide-react";
import { useEffect } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useDashboard from "@/hooks/useDashboard";
import RecentUrls from "../../components/dashboard/RecentUrls";
import TopUrls from "../../components/dashboard/TopUrls";

const DashboardPage = () => {
  const {
    overview,
    recentUrls,
    topUrls,
    fetchOverview,
    isOverviewLoading,
    isRecentUrlsLoading,
    isTopUrlsLoading,
    error,
    fetchDashboard,
  } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isOverviewLoading && !overview) {
    return (
      <div className="space-y-6">
        <DashboardHeader />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-5">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="h-8 w-20 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error && !overview) {
    return (
      <div className="space-y-6">
        <DashboardHeader />

        <Card>
          <CardContent className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
            <p className="font-medium text-destructive">
              Failed to load dashboard
            </p>

            <p className="mt-1 text-sm text-muted-foreground">{error}</p>

            <button
              type="button"
              onClick={fetchOverview}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    totalUrls = 0,
    activeUrls = 0,
    expiredUrls = 0,
    deletedUrls = 0,
    totalClicks = 0,
    todayClicks = 0,
    weekClicks = 0,
    monthClicks = 0,
  } = overview || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Main statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total URLs"
          value={totalUrls}
          description="All active records"
          icon={Link2}
        />

        <StatCard
          title="Active URLs"
          value={activeUrls}
          description="Currently active"
          icon={Activity}
        />

        <StatCard
          title="Total Clicks"
          value={totalClicks}
          description="All-time clicks"
          icon={MousePointerClick}
        />

        <StatCard
          title="Today's Clicks"
          value={todayClicks}
          description="Clicks since midnight"
          icon={BarChart3}
        />
      </div>

      {/* Click statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Click Statistics</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Last 7 Days</p>

              <p className="mt-2 text-2xl font-bold">{weekClicks}</p>

              <p className="mt-1 text-xs text-muted-foreground">clicks</p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Last 30 Days</p>

              <p className="mt-2 text-2xl font-bold">{monthClicks}</p>

              <p className="mt-1 text-xs text-muted-foreground">clicks</p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Today</p>

              <p className="mt-2 text-2xl font-bold">{todayClicks}</p>

              <p className="mt-1 text-xs text-muted-foreground">clicks</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URL status */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Active URLs</p>

            <p className="mt-2 text-2xl font-bold">{activeUrls}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Expired URLs</p>

            <p className="mt-2 text-2xl font-bold">{expiredUrls}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Deleted URLs</p>

            <p className="mt-2 text-2xl font-bold">{deletedUrls}</p>
          </CardContent>
        </Card>
      </div>

      {/* Temporary next sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CardContent>
          <RecentUrls urls={recentUrls} isLoading={isRecentUrlsLoading} />
        </CardContent>

        <CardContent>
          <TopUrls urls={topUrls} isLoading={isTopUrlsLoading} />
        </CardContent>
      </div>
    </div>
  );
};

export default DashboardPage;
