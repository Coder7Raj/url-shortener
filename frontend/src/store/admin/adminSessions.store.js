import { create } from "zustand";

import adminApi from "../../api/admin.api.js";

const useAdminSessionsStore = create((set) => ({
  sessions: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    search: "",
    status: "",
  },

  isLoading: false,
  error: null,

  fetchSessions: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await adminApi.getAdminSessions(params);

      const data = result.data;

      set({
        sessions: data.sessions || [],
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
        error.response?.data?.message || "Failed to fetch sessions.";

      set({
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  revokeSession: async (sessionId) => {
    try {
      const result = await adminApi.revokeAdminSession(sessionId);

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to revoke session.";

      return {
        success: false,
        message,
      };
    }
  },

  revokeUserSessions: async (userId) => {
    try {
      const result = await adminApi.revokeUserSessions(userId);

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to revoke user sessions.";

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

export default useAdminSessionsStore;
