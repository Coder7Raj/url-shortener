import { create } from "zustand";
import authApi from "../api/auth.api.js";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  initializeAuth: async () => {
    try {
      const result = await authApi.getCurrentUser();

      const user = result.data?.user;

      if (!user) {
        throw new Error("User not found");
      }

      set({
        user,
        isAuthenticated: true,
        isInitializing: false,
        error: null,
      });

      return {
        success: true,
      };
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isInitializing: false,
        error: null,
      });

      return {
        success: false,
      };
    }
  },

  login: async (credentials) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authApi.login(credentials);

      const user = result.data?.user;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";

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

  register: async (userData) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authApi.register(userData);

      const user = result.data?.user;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isInitializing: false,
        error: null,
      });

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

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

  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authApi.logout();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
      };
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return {
        success: false,
      };
    }
  },

  logoutAll: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await authApi.logoutAll();
    } catch (error) {
      console.error("Logout all API error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  getCurrentUser: async () => {
    try {
      const result = await authApi.getCurrentUser();

      const user = result.data?.user;

      if (user) {
        set({
          user,
          isAuthenticated: true,
        });
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAuthStore;
