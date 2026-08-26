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

const adminApi = {
  getDashboard,
  getAnalytics,
  getUsers,
};

export default adminApi;
