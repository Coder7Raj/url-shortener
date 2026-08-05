import api from "./axios.js";

export const registerApi = (body) => api.post("/auth/register", body);

export const loginApi = (body) => api.post("/auth/login", body);

export const meApi = () => api.get("/auth/me");

export const refreshApi = (refreshToken) =>
  api.post("/auth/refresh", {
    refreshToken,
  });

export const logoutApi = (refreshToken) =>
  api.post("/auth/logout", {
    refreshToken,
  });

export const logoutAllApi = () => api.post("/auth/logout-all");

export const sessionsApi = () => api.get("/auth/sessions");
