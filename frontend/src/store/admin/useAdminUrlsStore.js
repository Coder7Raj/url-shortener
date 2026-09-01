import { create } from "zustand";

import adminApi from "../../api/admin.api.js";

const useAdminUrlsStore = create((set) => ({
  urls: [],

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

  selectedUrl: null,

  isLoading: false,
  isDetailsLoading: false,
  isUpdating: false,
  isDeleting: false,

  error: null,

  fetchUrls: async (params = {}) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await adminApi.getUrls(params);

      const data = result.data;

      set({
        urls: data.urls || [],

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
      const message = error.response?.data?.message || "Failed to fetch URLs.";

      set({
        urls: [],
        isLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  fetchUrlDetails: async (urlId) => {
    set({
      isDetailsLoading: true,
      error: null,
    });

    try {
      const result = await adminApi.getUrlDetails(urlId);

      const data = result.data;

      set({
        selectedUrl: data.url,
        isDetailsLoading: false,
        error: null,
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch URL details.";

      set({
        isDetailsLoading: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  updateUrlStatus: async (urlId, status) => {
    set({
      isUpdating: true,
      error: null,
    });

    try {
      const result = await adminApi.updateUrlStatus(urlId, status);

      const data = result.data;

      set((state) => ({
        selectedUrl: data.url || state.selectedUrl,

        urls: state.urls.map((url) =>
          String(url.url_id) === String(urlId)
            ? {
                ...url,
                ...(data.url || {}),
              }
            : url,
        ),

        isUpdating: false,
        error: null,
      }));

      return {
        success: true,
        data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update URL status.";

      set({
        isUpdating: false,
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  deleteUrl: async (urlId) => {
    set({
      isDeleting: true,
      error: null,
    });

    try {
      const result = await adminApi.deleteUrl(urlId);

      const data = result.data;

      set((state) => ({
        selectedUrl: data.url || state.selectedUrl,

        urls: state.urls.map((url) =>
          String(url.url_id) === String(urlId)
            ? {
                ...url,
                ...(data.url || {}),
              }
            : url,
        ),

        isDeleting: false,
        error: null,
      }));

      return {
        success: true,
        data,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete URL.";

      set({
        isDeleting: false,
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

  clearSelectedUrl: () => {
    set({
      selectedUrl: null,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAdminUrlsStore;
