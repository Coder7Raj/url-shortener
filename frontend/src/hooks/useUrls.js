import useUrlStore from "../store/url.store.js";

const useUrls = () => {
  const urls = useUrlStore((state) => state.urls);

  const selectedUrl = useUrlStore((state) => state.selectedUrl);

  const analytics = useUrlStore((state) => state.analytics);

  const isLoading = useUrlStore((state) => state.isLoading);

  const isCreating = useUrlStore((state) => state.isCreating);

  const isUpdating = useUrlStore((state) => state.isUpdating);

  const isDeleting = useUrlStore((state) => state.isDeleting);

  const isAnalyticsLoading = useUrlStore((state) => state.isAnalyticsLoading);

  const error = useUrlStore((state) => state.error);

  const pagination = useUrlStore((state) => state.pagination);

  const createUrl = useUrlStore((state) => state.createUrl);

  const fetchUrls = useUrlStore((state) => state.fetchUrls);

  const fetchUrlById = useUrlStore((state) => state.fetchUrlById);

  const updateUrl = useUrlStore((state) => state.updateUrl);

  const deleteUrl = useUrlStore((state) => state.deleteUrl);

  const fetchAnalytics = useUrlStore((state) => state.fetchAnalytics);

  const clearError = useUrlStore((state) => state.clearError);

  const clearSelectedUrl = useUrlStore((state) => state.clearSelectedUrl);

  const clearAnalytics = useUrlStore((state) => state.clearAnalytics);

  return {
    urls,
    selectedUrl,
    analytics,

    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isAnalyticsLoading,

    error,
    pagination,

    createUrl,
    fetchUrls,
    fetchUrlById,
    updateUrl,
    deleteUrl,
    fetchAnalytics,

    clearError,
    clearSelectedUrl,
    clearAnalytics,
  };
};

export default useUrls;
