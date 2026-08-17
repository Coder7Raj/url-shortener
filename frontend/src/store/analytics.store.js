import { create } from "zustand";

import analyticsApi from "../api/analytics.api.js";

const useAnalyticsStore = create((set) => ({
  analytics: null,
  timeline: null,
  selectedUrlId: null,
  isLoading: false,
  isTimelineLoading: false,
  error: null,

  clearError: () => {
    set({
      error: null,
    });
  },

  fetchAnalytics: async (urlId) => {
    set({
      isLoading: true,
      error: null,
      selectedUrlId: urlId,
    });

    try {
      const response = await analyticsApi.getDashboard(urlId);

      const analytics = response.data;

      set({
        analytics,
        timeline: analytics?.timeline || null,
        isLoading: false,
      });

      return {
        success: true,
        data: analytics,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch analytics";

      set({
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchTimeline: async (urlId, range = "7d") => {
    set({
      isTimelineLoading: true,
      error: null,
    });

    try {
      const response = await analyticsApi.getTimeline(urlId, range);

      const timeline = response.data;

      set({
        timeline,
        isTimelineLoading: false,
      });

      return {
        success: true,
        data: timeline,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch timeline";

      set({
        isTimelineLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  reset: () => {
    set({
      analytics: null,
      timeline: null,
      selectedUrlId: null,
      isLoading: false,
      isTimelineLoading: false,
      error: null,
    });
  },
}));

export default useAnalyticsStore;
