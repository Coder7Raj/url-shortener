import apiClient from "./client.js";

const urlApi = {
  /**
   * Create a new short URL
   *
   * POST /api/v1/urls
   */
  create: async (data) => {
    const response = await apiClient.post("/urls", data);

    return response.data;
  },

  /**
   * Get authenticated user's URLs
   *
   * GET /api/v1/urls
   *
   * params can contain:
   * - page
   * - limit
   * - search
   * - status
   * - etc.
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get("/urls", {
      params,
    });

    return response.data;
  },

  //    Get URL by ID
  //    GET /api/v1/urls/:id

  getById: async (id) => {
    const response = await apiClient.get(`/urls/${id}`);

    return response.data;
  },

  // Update URL
  // PATCH /api/v1/urls/:id

  update: async (id, data) => {
    const response = await apiClient.patch(`/urls/${id}`, data);

    return response.data;
  },

  // Delete URL
  // DELETE /api/v1/urls/:id

  delete: async (id) => {
    const response = await apiClient.delete(`/urls/${id}`);

    return response.data;
  },

  //    Get URL analytics
  //    GET /api/v1/urls/:id/analytics
  getAnalytics: async (id, params = {}) => {
    const response = await apiClient.get(`/urls/${id}/analytics`, {
      params,
    });

    return response.data;
  },
};

export default urlApi;
