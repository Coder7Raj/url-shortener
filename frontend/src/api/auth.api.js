import apiClient from "./client.js";

const authApi = {
  register: async (data) => {
    const response = await apiClient.post("/auth/register", data);

    return response.data;
  },

  login: async (data) => {
    const response = await apiClient.post("/auth/login", data);

    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");

    return response.data;
  },

  logoutAll: async () => {
    const response = await apiClient.post("/auth/logout-all");

    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post("/auth/refresh-token");

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");

    return response.data;
  },
};

export default authApi;
