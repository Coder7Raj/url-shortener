import apiClient from "./apiClient.js";

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
    return `/urls/${urlId}/qr/download`;
  },
};

export default qrApi;
