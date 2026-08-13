import useDashboardStore from "../store/dashboard.store.js";

const useDashboard = () => {
  const overview = useDashboardStore((state) => state.overview);

  const recentUrls = useDashboardStore((state) => state.recentUrls);

  const topUrls = useDashboardStore((state) => state.topUrls);

  const isLoading = useDashboardStore((state) => state.isLoading);

  const isOverviewLoading = useDashboardStore(
    (state) => state.isOverviewLoading,
  );

  const isRecentUrlsLoading = useDashboardStore(
    (state) => state.isRecentUrlsLoading,
  );

  const isTopUrlsLoading = useDashboardStore((state) => state.isTopUrlsLoading);

  const error = useDashboardStore((state) => state.error);

  const fetchOverview = useDashboardStore((state) => state.fetchOverview);

  const fetchRecentUrls = useDashboardStore((state) => state.fetchRecentUrls);

  const fetchTopUrls = useDashboardStore((state) => state.fetchTopUrls);

  const fetchDashboard = useDashboardStore((state) => state.fetchDashboard);

  const clearError = useDashboardStore((state) => state.clearError);

  return {
    overview,

    recentUrls,

    topUrls,

    isLoading,

    isOverviewLoading,

    isRecentUrlsLoading,

    isTopUrlsLoading,

    error,

    fetchOverview,

    fetchRecentUrls,

    fetchTopUrls,

    fetchDashboard,

    clearError,
  };
};

export default useDashboard;
