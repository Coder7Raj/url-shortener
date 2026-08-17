import useAnalyticsStore from "../store/analytics.store.js";

const useAnalytics = () => {
  const analytics = useAnalyticsStore((state) => state.analytics);

  const timeline = useAnalyticsStore((state) => state.timeline);

  const selectedUrlId = useAnalyticsStore((state) => state.selectedUrlId);

  const isLoading = useAnalyticsStore((state) => state.isLoading);

  const isTimelineLoading = useAnalyticsStore(
    (state) => state.isTimelineLoading,
  );

  const error = useAnalyticsStore((state) => state.error);

  const fetchAnalytics = useAnalyticsStore((state) => state.fetchAnalytics);

  const fetchTimeline = useAnalyticsStore((state) => state.fetchTimeline);

  const clearError = useAnalyticsStore((state) => state.clearError);

  return {
    analytics,
    timeline,
    selectedUrlId,
    isLoading,
    isTimelineLoading,
    error,
    fetchAnalytics,
    fetchTimeline,
    clearError,
  };
};

export default useAnalytics;
