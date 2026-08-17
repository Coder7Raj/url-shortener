import { BarChart3 } from "lucide-react";

const AnalyticsHeader = ({
  urls,
  selectedUrlId,
  onUrlChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

          <p className="text-sm text-muted-foreground">
            Understand how your short URLs are performing.
          </p>
        </div>
      </div>

      <div className="w-full sm:w-[320px]">
        <label
          htmlFor="analytics-url"
          className="mb-2 block text-sm font-medium"
        >
          Select URL
        </label>

        <select
          id="analytics-url"
          value={selectedUrlId || ""}
          onChange={(event) => onUrlChange(event.target.value)}
          disabled={disabled || urls.length === 0}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            Select a URL
          </option>

          {urls.map((url) => (
            <option key={url.id} value={url.id}>
              {url.title || url.shortCode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
