import apiClient from "../api/client.js";

const getDashboard = async () => {
  const response = await apiClient.get("/admin/dashboard");

  return response.data;
};

const getAnalytics = async (days = 7) => {
  const response = await apiClient.get("/admin/analytics", {
    params: {
      days,
    },
  });

  return response.data;
};

const adminApi = {
  getDashboard,
  getAnalytics,
};

export default adminApi;
