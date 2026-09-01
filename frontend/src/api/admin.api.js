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

const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  role,
  status,
}) => {
  const response = await apiClient.get("/admin/users", {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(role && { role }),
      ...(status && { status }),
    },
  });

  return response.data;
};

const getAdminSessions = (params = {}) => {
  return apiClient.get("/admin/sessions", {
    params,
  });
};

const revokeAdminSession = (sessionId) => {
  return apiClient.patch(`/admin/sessions/${sessionId}/revoke`);
};

const revokeUserSessions = (userId) => {
  return apiClient.post(`/admin/users/${userId}/revoke-sessions`);
};

const getUrls = async ({ page = 1, limit = 10, search = "", status }) => {
  const response = await apiClient.get("/admin/urls", {
    params: {
      page,
      limit,
      ...(search && { search }),
      ...(status && { status }),
    },
  });

  return response.data;
};

const getUrlDetails = async (urlId) => {
  const response = await apiClient.get(`/admin/urls/${urlId}`);

  return response.data;
};

const updateUrlStatus = async (urlId, status) => {
  const response = await apiClient.patch(`/admin/urls/${urlId}/status`, {
    status,
  });

  return response.data;
};

const deleteUrl = async (urlId) => {
  const response = await apiClient.delete(`/admin/urls/${urlId}`);

  return response.data;
};

const adminApi = {
  getDashboard,
  getAnalytics,

  getUsers,

  getAdminSessions,
  revokeAdminSession,
  revokeUserSessions,

  getUrls,
  getUrlDetails,
  updateUrlStatus,
  deleteUrl,
};

export default adminApi;
