import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatDate = (date) => {
  const parsed = new Date(`${date}T00:00:00`);

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const ChartCard = ({ title, description, children }) => {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-5">
        <h3 className="font-semibold text-foreground">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="h-80 p-4">{children}</div>
    </div>
  );
};

const AdminAnalytics = ({ analytics }) => {
  if (!analytics) {
    return null;
  }

  const usersData = analytics.users.map((item) => ({
    date: formatDate(item.date),
    count: item.count,
  }));

  const urlsData = analytics.urls.map((item) => ({
    date: formatDate(item.date),
    count: item.count,
  }));

  const clicksData = analytics.clicks.map((item) => ({
    date: formatDate(item.date),
    count: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* User Growth */}
      <ChartCard
        title="User Growth"
        description="New users created during the selected period."
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usersData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              name="Users"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* URL Creation */}
      <ChartCard
        title="URL Creation"
        description="New shortened URLs created during the selected period."
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={urlsData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              name="URLs"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Click Activity */}
      <ChartCard
        title="Click Activity"
        description="Total URL clicks during the selected period."
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={clicksData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="count"
              name="Clicks"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default AdminAnalytics;
