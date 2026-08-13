import apiClient from "./client.js";

const dashboardApi = {
  getOverview: async () => {
    const response = await apiClient.get("/dashboard/overview");

    return response.data;
  },

  getRecentUrls: async (limit = 10) => {
    const response = await apiClient.get("/dashboard/recent-urls", {
      params: {
        limit,
      },
    });

    return response.data;
  },

  getTopUrls: async (limit = 10) => {
    const response = await apiClient.get("/dashboard/top-urls", {
      params: {
        limit,
      },
    });

    return response.data;
  },
};

export default dashboardApi;
