import { create } from "zustand";

import adminApi from "../../api/admin.api.js";

const useAdminLogsStore = create((set) => ({
  logs: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    search: "",
    action: "",
    entityType: "",
  },

  isLoading: false,
  error: null,

  fetchLogs: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await adminApi.getAuditLogs(params);

      const data = result.data;

      set({
        logs: data.logs || [],

        pagination: data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },

        isLoading: false,
        error: null,
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch audit logs.";

      set({
        logs: [],
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }));
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAdminLogsStore;
