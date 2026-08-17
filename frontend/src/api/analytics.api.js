import apiClient from "./client.js";

const analyticsApi = {
  getDashboard: async (id) => {
    const response = await apiClient.get(`/analytics/url/${id}`);

    return response.data;
  },

  getTimeline: async (id, range = "7d") => {
    const response = await apiClient.get(`/analytics/url/${id}/timeline`, {
      params: {
        range,
      },
    });

    return response.data;
  },
};

export default analyticsApi;
