import { create } from "zustand";

import urlApi from "../api/url.api.js";

const useUrlStore = create((set) => ({
  urls: [],
  selectedUrl: null,
  analytics: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isAnalyticsLoading: false,
  error: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  clearError: () => {
    set({
      error: null,
    });
  },

  createUrl: async (data) => {
    set({
      isCreating: true,
      error: null,
    });

    try {
      const response = await urlApi.create(data);

      const createdUrl = response.data.url;

      set((state) => ({
        urls: [createdUrl, ...state.urls],

        isCreating: false,
      }));

      return {
        success: true,
        data: createdUrl,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create short URL";

      set({
        isCreating: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchUrls: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getAll(params);

      const { urls, pagination } = response.data;

      set({
        urls,
        pagination,
        isLoading: false,
      });

      return {
        success: true,
        data: {
          urls,
          pagination,
        },
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch URLs";

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

  fetchUrlById: async (id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getById(id);

      const selectedUrl = response.data.url;

      set({
        selectedUrl,
        isLoading: false,
      });

      return {
        success: true,
        data: selectedUrl,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch URL";

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

  updateUrl: async (id, data) => {
    set({
      isUpdating: true,
      error: null,
    });

    try {
      const response = await urlApi.update(id, data);

      const updatedUrl = response.data.url;

      set((state) => ({
        urls: state.urls.map((url) =>
          String(url.id) === String(id) ? updatedUrl : url,
        ),

        selectedUrl:
          state.selectedUrl && String(state.selectedUrl.id) === String(id)
            ? updatedUrl
            : state.selectedUrl,

        isUpdating: false,
      }));

      return {
        success: true,
        data: updatedUrl,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update URL";

      set({
        isUpdating: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  deleteUrl: async (id) => {
    set({
      isDeleting: true,
      error: null,
    });

    try {
      await urlApi.delete(id);

      set((state) => ({
        urls: state.urls.filter((url) => String(url.id) !== String(id)),

        selectedUrl:
          state.selectedUrl && String(state.selectedUrl.id) === String(id)
            ? null
            : state.selectedUrl,

        isDeleting: false,
      }));

      return {
        success: true,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete URL";

      set({
        isDeleting: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  fetchAnalytics: async (id, params = {}) => {
    set({
      isAnalyticsLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getAnalytics(id, params);

      set({
        analytics: response.data,
        isAnalyticsLoading: false,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch analytics";

      set({
        isAnalyticsLoading: false,
        error: message,
      });

      return {
        success: false,
        error: message,
      };
    }
  },

  clearSelectedUrl: () => {
    set({
      selectedUrl: null,
    });
  },

  clearAnalytics: () => {
    set({
      analytics: null,
    });
  },

  reset: () => {
    set({
      urls: [],
      selectedUrl: null,
      analytics: null,
      isLoading: false,
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
      isAnalyticsLoading: false,
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

export default useUrlStore;
