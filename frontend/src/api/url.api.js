import apiClient from "./client.js";

const urlApi = {
  create: async (data) => {
    const response = await apiClient.post("/urls", data);

    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await apiClient.get("/urls", {
      params,
    });

    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/urls/${id}`);

    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.patch(`/urls/${id}`, data);

    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/urls/${id}`);

    return response.data;
  },

  getAnalytics: async (id, params = {}) => {
    const response = await apiClient.get(`/urls/${id}/analytics`, {
      params,
    });

    return response.data;
  },
};

export default urlApi;
