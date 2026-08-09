import { create } from "zustand";
import authApi from "../api/auth.api.js";
import { authStorage } from "../lib/auth-storage.js";

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getStoredUser(),
  accessToken: authStorage.getAccessToken(),
  refreshToken: authStorage.getRefreshToken(),
  isAuthenticated: Boolean(authStorage.getAccessToken()),
  isLoading: false,
  error: null,

  // Login
  login: async (credentials) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authApi.login(credentials);

      const { user, accessToken, refreshToken } = result.data;
      authStorage.setAccessToken(accessToken);
      authStorage.setRefreshToken(refreshToken);
      authStorage.setUser(user);

      set({
        user,
        accessToken,
        refreshToken,
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

  // Register
  register: async (userData) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authApi.register(userData);
      const accessToken = result.data?.accessToken;
      const refreshToken = result.data?.refreshToken;
      const user = result.data?.user;

      if (accessToken) {
        authStorage.setAccessToken(accessToken);
      }

      if (refreshToken) {
        authStorage.setRefreshToken(refreshToken);
      }

      if (user) {
        authStorage.setUser(user);
      }

      set({
        user: user || null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        isAuthenticated: Boolean(accessToken),
        isLoading: false,
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

  // Logout
  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const refreshToken = authStorage.getRefreshToken();

      /*
       * If there is a refresh token,
       * tell the backend to invalidate the session.
       */
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }

      /*
       * Clear local authentication state
       * regardless of whether a refresh token exists.
       */
      authStorage.clear();

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
      console.error("Logout API error:", error);

      /*
       * Even if the backend logout fails,
       * clear the local session.
       */
      authStorage.clear();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Logout failed",
      });

      return {
        success: false,
        error,
      };
    }
  },

  // Logout All
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  // Get Current User

  getCurrentUser: async () => {
    try {
      const result = await authApi.getCurrentUser();

      const user = result.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

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
      console.error("Get current user error:", error);

      return {
        success: false,
      };
    }
  },

  setAccessToken: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);

    set({
      accessToken,
      isAuthenticated: true,
    });
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAuthStore;
