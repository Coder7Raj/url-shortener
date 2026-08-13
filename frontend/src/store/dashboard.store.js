import { create } from "zustand";

import dashboardApi from "../api/dashboard.api.js";

const useDashboardStore = create((set) => ({
  overview: null,
  recentUrls: [],
  topUrls: [],
  isLoading: false,
  isOverviewLoading: false,
  isRecentUrlsLoading: false,
  isTopUrlsLoading: false,
  error: null,

  clearError: () => {
    set({
      error: null,
    });
  },

  fetchOverview: async () => {
    set({
      isOverviewLoading: true,
      error: null,
    });

    try {
      const response = await dashboardApi.getOverview();

      const overview = response.data;

      set({
        overview,
        isOverviewLoading: false,
      });

      return {
        success: true,
        data: overview,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch dashboard overview";

      set({
        isOverviewLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchRecentUrls: async (limit = 10) => {
    set({
      isRecentUrlsLoading: true,
      error: null,
    });

    try {
      const response = await dashboardApi.getRecentUrls(limit);

      const recentUrls = response.data;

      set({
        recentUrls,
        isRecentUrlsLoading: false,
      });

      return {
        success: true,
        data: recentUrls,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch recent URLs";

      set({
        isRecentUrlsLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchTopUrls: async (limit = 10) => {
    set({
      isTopUrlsLoading: true,
      error: null,
    });

    try {
      const response = await dashboardApi.getTopUrls(limit);

      const topUrls = response.data;

      set({
        topUrls,
        isTopUrlsLoading: false,
      });

      return {
        success: true,
        data: topUrls,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch top URLs";

      set({
        isTopUrlsLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchDashboard: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const [overviewResponse, recentUrlsResponse, topUrlsResponse] =
        await Promise.all([
          dashboardApi.getOverview(),
          dashboardApi.getRecentUrls(10),
          dashboardApi.getTopUrls(10),
        ]);

      const overview = overviewResponse.data;

      const recentUrls = recentUrlsResponse.data;

      const topUrls = topUrlsResponse.data;

      set({
        overview,
        recentUrls,
        topUrls,

        isLoading: false,

        isOverviewLoading: false,
        isRecentUrlsLoading: false,
        isTopUrlsLoading: false,
      });

      return {
        success: true,
        data: {
          overview,
          recentUrls,
          topUrls,
        },
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch dashboard data";

      set({
        isLoading: false,

        isOverviewLoading: false,
        isRecentUrlsLoading: false,
        isTopUrlsLoading: false,

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
      overview: null,

      recentUrls: [],

      topUrls: [],

      isLoading: false,

      isOverviewLoading: false,

      isRecentUrlsLoading: false,

      isTopUrlsLoading: false,

      error: null,
    });
  },
}));

export default useDashboardStore;
