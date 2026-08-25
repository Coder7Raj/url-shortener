import apiClient from "../api/client.js";

const adminApi = {
  getDashboard: async () => {
    const response = await apiClient.get("/admin/dashboard");

    return response.data;
  },
};

export default adminApi;
