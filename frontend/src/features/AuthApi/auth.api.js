import api from "./axios.js";

export const registerApi = (data) => api.post("/auth/register", data);

export const loginApi = (data) => api.post("/auth/login", data);

export const meApi = () => api.get("/auth/me");

export const logoutApi = (refreshToken) =>
  api.post("/auth/logout", {
    refreshToken,
  });

export const refreshTokenApi = (refreshToken) =>
  api.post("/auth/refresh", {
    refreshToken,
  });

export const logoutAllApi = () => api.post("/auth/logout-all");

export const getSessionsApi = () => api.get("/auth/sessions");
