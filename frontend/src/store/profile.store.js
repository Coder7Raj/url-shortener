import { create } from "zustand";
import profileApi from "../api/profile.api.js";

const useProfileStore = create((set) => ({
  profile: null,

  isLoading: false,
  isUpdating: false,
  isChangingPassword: false,

  error: null,

  fetchProfile: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await profileApi.get();

      const user = response.data?.user || null;

      set({
        profile: user,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch profile.";

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

  updateProfile: async (data) => {
    set({
      isUpdating: true,
      error: null,
    });

    try {
      const response = await profileApi.update(data);

      const user = response.data?.user || null;

      set({
        profile: user,
        isUpdating: false,
        error: null,
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile.";

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

  changePassword: async (data) => {
    set({
      isChangingPassword: true,
      error: null,
    });

    try {
      const response = await profileApi.changePassword(data);

      set({
        isChangingPassword: false,
        error: null,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to change password.";

      set({
        isChangingPassword: false,
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

  clearProfile: () => {
    set({
      profile: null,
      error: null,
    });
  },
}));

export default useProfileStore;
