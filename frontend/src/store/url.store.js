import { create } from "zustand";

import urlApi from "../api/url.api.js";

const useUrlStore = create((set) => ({
  // states
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

  // error
  clearError: () => {
    set({
      error: null,
    });
  },

  // create url
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

  // all urls
  fetchUrls: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getAll(params);

      const urls = response?.data?.urls || response?.data || [];

      set({
        urls: Array.isArray(urls) ? urls : [],

        isLoading: false,
      });

      if (response?.data?.pagination) {
        set({
          pagination: response.data.pagination,
        });
      }

      return {
        success: true,
        data: response,
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

  // get url by id
  fetchUrlById: async (id) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getById(id);

      set({
        selectedUrl: response?.data?.url || response?.data || null,

        isLoading: false,
      });

      return {
        success: true,
        data: response,
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

  // update url
  updateUrl: async (id, data) => {
    set({
      isUpdating: true,
      error: null,
    });

    try {
      const response = await urlApi.update(id, data);

      const updatedUrl = response?.data?.url || response?.data;

      set((state) => ({
        urls: state.urls.map((url) =>
          String(url.id ?? url.url_id) === String(id) ? updatedUrl : url,
        ),

        selectedUrl:
          state.selectedUrl &&
          String(state.selectedUrl.id ?? state.selectedUrl.url_id) ===
            String(id)
            ? updatedUrl
            : state.selectedUrl,

        isUpdating: false,
      }));

      return {
        success: true,
        data: response,
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

  // delete url
  deleteUrl: async (id) => {
    set({
      isDeleting: true,
      error: null,
    });

    try {
      const response = await urlApi.delete(id);

      set((state) => ({
        urls: state.urls.filter(
          (url) => String(url.id ?? url.url_id) !== String(id),
        ),

        selectedUrl:
          state.selectedUrl &&
          String(state.selectedUrl.id ?? state.selectedUrl.url_id) ===
            String(id)
            ? null
            : state.selectedUrl,

        isDeleting: false,
      }));

      return {
        success: true,
        data: response,
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

  // url analytics
  fetchAnalytics: async (id, params = {}) => {
    set({
      isAnalyticsLoading: true,
      error: null,
    });

    try {
      const response = await urlApi.getAnalytics(id, params);

      set({
        analytics: response?.data?.analytics || response?.data || null,

        isAnalyticsLoading: false,
      });

      return {
        success: true,
        data: response,
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

  // reset selected url and analytics
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
