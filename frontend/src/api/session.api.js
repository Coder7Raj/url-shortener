import apiClient from "./client.js";

const sessionApi = {
  getAll: async (params = {}) => {
    const response = await apiClient.get("/auth/sessions", {
      params,
    });

    return response.data;
  },

  logoutAll: async () => {
    const response = await apiClient.post("/auth/logout-all");

    return response.data;
  },
};

export default sessionApi;
