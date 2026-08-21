import { useEffect, useState } from "react";

import AnalyticsBreakdown from "../../components/analytics/AnalyticsBreakdown.jsx";
import AnalyticsHeader from "../../components/analytics/AnalyticsHeader.jsx";
import AnalyticsSummary from "../../components/analytics/AnalyticsSummary.jsx";
import AnalyticsTimeline from "../../components/analytics/AnalyticsTimeline.jsx";
import AnalyticsUrlInfo from "../../components/analytics/AnalyticsUrlInfo.jsx";

import useAnalytics from "../../hooks/useAnalytics.js";
import useUrls from "../../hooks/useUrls.js";

const AnalyticsPage = () => {
  const { urls, fetchUrls, isLoading: isUrlsLoading } = useUrls();

  const {
    analytics,
    timeline,
    isLoading,
    isTimelineLoading,
    error,
    fetchAnalytics,
    fetchTimeline,
  } = useAnalytics();

  const [selectedUrlId, setSelectedUrlId] = useState("");

  const [range, setRange] = useState("30d");

  useEffect(() => {
    fetchUrls({
      page: 1,
      limit: 50,
    });
  }, [fetchUrls]);

  useEffect(() => {
    if (urls.length > 0 && !selectedUrlId) {
      setSelectedUrlId(String(urls[0].id));
    }
  }, [urls, selectedUrlId]);

  useEffect(() => {
    if (!selectedUrlId) {
      return;
    }

    fetchAnalytics(selectedUrlId);
    setRange("30d");
  }, [selectedUrlId, fetchAnalytics]);

  const handleUrlChange = (id) => {
    setSelectedUrlId(id);
  };

  const handleRangeChange = async (newRange) => {
    if (!selectedUrlId) {
      return;
    }

    setRange(newRange);

    await fetchTimeline(selectedUrlId, newRange);
  };

  if (isUrlsLoading && urls.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading URLs...</p>
      </div>
    );
  }

  if (!isUrlsLoading && urls.length === 0) {
    return (
      <div className="space-y-6">
        <AnalyticsHeader urls={[]} selectedUrlId="" onUrlChange={() => {}} />

        <div className="rounded-xl border bg-card p-10 text-center text-foreground">
          <h2 className="text-lg font-semibold">No URLs available</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a short URL first to start viewing analytics.
          </p>
        </div>
      </div>
    );
  }

  const summary = analytics?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}

      <AnalyticsHeader
        urls={urls}
        selectedUrlId={selectedUrlId}
        onUrlChange={handleUrlChange}
        disabled={isLoading}
      />

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Main loading */}

      {isLoading ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">Loading analytics...</p>
        </div>
      ) : analytics ? (
        <>
          {/* URL information */}

          <AnalyticsUrlInfo url={summary?.url} />

          {/* Summary */}

          <AnalyticsSummary summary={summary} />

          {/* Timeline */}

          <AnalyticsTimeline
            timeline={timeline}
            range={range}
            onRangeChange={handleRangeChange}
            loading={isTimelineLoading}
          />

          {/* Audience */}

          <div>
            <div className="mb-4 text-foreground">
              <h2 className="text-xl font-semibold">Audience</h2>

              <p className="text-sm text-muted-foreground">
                Understand where your visitors are coming from.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <AnalyticsBreakdown
                title="Countries"
                description="Clicks grouped by country."
                data={analytics.countries}
              />

              <AnalyticsBreakdown
                title="Cities"
                description="Clicks grouped by city."
                data={analytics.cities}
              />
            </div>
          </div>

          {/* Technology */}

          <div>
            <div className="mb-4 text-foreground">
              <h2 className="text-xl font-semibold">Technology</h2>

              <p className="text-sm text-muted-foreground">
                See what your visitors use to access your links.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <AnalyticsBreakdown
                title="Browsers"
                description="Clicks by browser."
                data={analytics.browsers}
              />

              <AnalyticsBreakdown
                title="Devices"
                description="Clicks by device."
                data={analytics.devices}
              />

              <AnalyticsBreakdown
                title="Operating Systems"
                description="Clicks by operating system."
                data={analytics.operatingSystems}
              />
            </div>
          </div>

          {/* Traffic */}

          <div>
            <div className="mb-4 text-foreground">
              <h2 className="text-xl font-semibold">Traffic Sources</h2>

              <p className="text-sm text-muted-foreground">
                Understand where your visitors originated.
              </p>
            </div>

            <div className="max-w-2xl">
              <AnalyticsBreakdown
                title="Referrers"
                description="Sources that sent visitors to your URL."
                data={analytics.referrers}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Select a URL to view analytics.
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
