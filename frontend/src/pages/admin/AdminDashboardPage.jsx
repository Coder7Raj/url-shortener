import {
  Activity,
  ExternalLink,
  Link2,
  MousePointerClick,
  RefreshCw,
  Users,
} from "lucide-react";
import AdminAnalytics from "../../components/admin/AdminAnalytics.jsx";
import useAdminAnalytics from "../../hooks/admin/useAdminAnalytics.js";
import useAdminDashboard from "../../hooks/admin/useAdminDashboard.js";

const AdminDashboardPage = () => {
  const { data, isLoading, error } = useAdminDashboard();
  const {
    analytics,
    days,
    setDays,
    isLoading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useAdminAnalytics(7);

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  const stats = data?.stats;

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users?.total ?? 0,
      description: `${stats?.users?.active ?? 0} active users`,
      icon: Users,
    },
    {
      title: "Total URLs",
      value: stats?.urls?.total ?? 0,
      description: `${stats?.urls?.active ?? 0} active URLs`,
      icon: Link2,
    },
    {
      title: "Total Clicks",
      value: stats?.clicks?.total ?? 0,
      description: "Across all URLs",
      icon: MousePointerClick,
    },
    {
      title: "Active Sessions",
      value: stats?.sessions?.active ?? 0,
      description: "Currently active",
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Overview of your Shortly application.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.title} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>

                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics */}
      <section className="mt-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Analytics</h2>

            <p className="text-sm text-muted-foreground">
              Monitor platform activity over time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Period */}
            <div className="flex rounded-lg border bg-card p-1">
              {[7, 30, 90].map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setDays(period)}
                  className={[
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    days === period
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {period} days
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={refetchAnalytics}
              disabled={analyticsLoading}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              title="Refresh analytics"
            >
              <RefreshCw
                className={[
                  "h-4 w-4",
                  analyticsLoading ? "animate-spin" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {analyticsError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">{analyticsError}</p>
          </div>
        )}

        {analyticsLoading && !analytics ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Loading analytics...
            </p>
          </div>
        ) : (
          <AdminAnalytics analytics={analytics} />
        )}
      </section>
      {/* User + URL overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold text-foreground">Recent Users</h2>

            <p className="text-sm text-muted-foreground">
              Latest registered users.
            </p>
          </div>

          <div className="divide-y">
            {data?.recentUsers?.length ? (
              data.recentUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">
                      {user.role}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-5 text-sm text-muted-foreground">
                No users found.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>

            <p className="text-sm text-muted-foreground">
              Latest system activity.
            </p>
          </div>

          <div className="divide-y">
            {data?.recentActivity?.length ? (
              data.recentActivity.map((activity) => (
                <div
                  key={activity.log_id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {activity.users?.username || "System"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {activity.entity_type || "SYSTEM"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {activity.ip_address || "Unknown IP"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-5 text-sm text-muted-foreground">
                No activity found.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Recent URLs */}
      <div className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <h2 className="font-semibold text-foreground">Recent URLs</h2>

          <p className="text-sm text-muted-foreground">
            Recently created shortened URLs.
          </p>
        </div>

        <div className="divide-y">
          {data?.recentUrls?.length ? (
            data.recentUrls.map((url) => (
              <div
                key={url.url_id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* URL information */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Link2 className="h-4 w-4 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {url.title || `${url.short_code}`}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      /{url.short_code}
                    </p>
                  </div>
                </div>

                {/* Owner */}
                <div className="min-w-0 sm:max-w-45">
                  <p className="text-xs text-muted-foreground">Created by</p>

                  <p className="truncate text-sm font-medium text-foreground">
                    {url.users?.username || "Unknown"}
                  </p>
                </div>

                {/* Clicks */}
                <div>
                  <p className="text-xs text-muted-foreground">Clicks</p>

                  <p className="text-sm font-medium text-foreground">
                    {url.total_clicks ?? 0}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                      url.status === "ACTIVE"
                        ? "bg-green-500/10 text-green-600"
                        : url.status === "EXPIRED"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : url.status === "DELETED"
                            ? "bg-red-500/10 text-red-600"
                            : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {url.status}
                  </span>
                </div>

                {/* Open */}
                {url.short_code && (
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/${url.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Open shortened URL"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <Link2 className="mx-auto h-8 w-8 text-muted-foreground" />

              <p className="mt-2 text-sm font-medium text-foreground">
                No URLs yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Recently created URLs will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
