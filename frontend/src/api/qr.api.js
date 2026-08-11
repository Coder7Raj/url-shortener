import apiClient from "./client.js";

const qrApi = {
  generate: async (urlId) => {
    const response = await apiClient.post(`/urls/${urlId}/qr`);
    return response.data;
  },

  get: async (urlId) => {
    const response = await apiClient.get(`/urls/${urlId}/qr`);
    return response.data;
  },

  regenerate: async (urlId) => {
    const response = await apiClient.post(`/urls/${urlId}/qr/regenerate`);

    return response.data;
  },

  delete: async (urlId) => {
    const response = await apiClient.delete(`/urls/${urlId}/qr`);
    return response.data;
  },

  download: async (urlId) => {
    const response = await apiClient.get(`/urls/${urlId}/qr/download`);

    return response.data;
  },
};

export default qrApi;
