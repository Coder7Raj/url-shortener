import { Activity, Link2, MousePointerClick, Users } from "lucide-react";

import useAdminDashboard from "../../hooks/admin/useAdminDashboard.js";

const AdminDashboardPage = () => {
  const { data, isLoading, error } = useAdminDashboard();

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
    </div>
  );
};

export default AdminDashboardPage;
