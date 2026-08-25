import { useCallback, useEffect, useState } from "react";

import adminApi from "../../api/admin.api.js";

const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await adminApi.getDashboard();

      setData(result.data);

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load admin dashboard.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
};

export default useAdminDashboard;
