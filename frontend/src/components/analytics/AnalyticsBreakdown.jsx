import { BarChart3 } from "lucide-react";

const AnalyticsBreakdown = ({
  title,
  description,
  data = [],
  emptyMessage = "No data available.",
}) => {
  const visibleData = data.slice(0, 8);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <BarChart3 className="h-4 w-4 text-primary" />
        </div>

        <div className="text-foreground">
          <h2 className="font-semibold">{title}</h2>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {visibleData.length === 0 ? (
        <div className="flex min-h-45 items-center justify-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleData.map((item, index) => {
            const maxClicks = visibleData[0]?.clicks || 1;

            const percentage = (Number(item.clicks) / maxClicks) * 100;

            return (
              <div key={`${item.name}-${index}`}>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <span className="truncate text-sm">{item.name}</span>

                  <span className="shrink-0 text-sm font-medium">
                    {Number(item.clicks).toLocaleString()}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.max(percentage, 2)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnalyticsBreakdown;
