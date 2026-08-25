import { useCallback, useEffect, useState } from "react";
import adminApi from "../../api/admin.api.js";

const useAdminAnalytics = (initialDays = 7) => {
  const [days, setDays] = useState(initialDays);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adminApi.getAnalytics(days);

      setAnalytics(result.data);
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load admin analytics.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    analytics,
    days,
    setDays,
    isLoading,
    error,
    refetch: fetchAnalytics,
  };
};

export default useAdminAnalytics;
