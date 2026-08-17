import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ranges = [
  {
    label: "7D",
    value: "7d",
  },
  {
    label: "30D",
    value: "30d",
  },
  {
    label: "90D",
    value: "90d",
  },
  {
    label: "1Y",
    value: "1y",
  },
];

const formatDate = (date) => {
  const value = new Date(`${date}T00:00:00`);

  return value.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const AnalyticsTimeline = ({ timeline, range, onRangeChange, loading }) => {
  const chartData = useMemo(() => {
    return (
      timeline?.timeline?.map((item) => ({
        ...item,
        formattedDate: formatDate(item.date),
      })) || []
    );
  }, [timeline]);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Clicks Over Time</h2>

          <p className="text-sm text-muted-foreground">
            Track how your URL traffic changes over time.
          </p>
        </div>

        <div className="flex rounded-lg border p-1">
          {ranges.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onRangeChange(item.value)}
              disabled={loading}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                range === item.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-80">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading timeline...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No click data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="formattedDate"
                tick={{ fontSize: 12 }}
                minTickGap={25}
              />

              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />

              <Tooltip
                labelFormatter={(label) => label}
                formatter={(value) => [value, "Clicks"]}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="currentColor"
                fill="currentColor"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AnalyticsTimeline;
