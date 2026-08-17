import apiClient from "./client.js";

const profileApi = {
  get: async () => {
    const response = await apiClient.get("/auth/me");

    return response.data;
  },

  update: async (data) => {
    const response = await apiClient.patch("/auth/profile", data);

    return response.data;
  },

  changePassword: async (data) => {
    const response = await apiClient.patch("/auth/change-password", data);

    return response.data;
  },
};

export default profileApi;
