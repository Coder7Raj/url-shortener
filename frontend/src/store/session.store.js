import { create } from "zustand";

import sessionApi from "../api/session.api.js";

const useSessionStore = create((set) => ({
  sessions: [],
  isLoading: false,
  isLoggingOutAll: false,
  error: null,

  fetchSessions: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await sessionApi.getAll(params);

      const sessions = response.data?.sessions || [];
      const pagination = response.data?.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      };

      set({
        sessions,
        pagination,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
        data: {
          sessions,
          pagination,
        },
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch sessions.";

      set({
        sessions: [],
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  logoutAll: async () => {
    set({
      isLoggingOutAll: true,
      error: null,
    });

    try {
      const response = await sessionApi.logoutAll();

      set({
        sessions: [],
        isLoggingOutAll: false,
        error: null,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to logout from all sessions.";

      set({
        isLoggingOutAll: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  clearError: () => {
    set({
      error: null,
    });
  },

  reset: () => {
    set({
      sessions: [],
      isLoading: false,
      isLoggingOutAll: false,
      error: null,

      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    });
  },
}));

export default useSessionStore;
