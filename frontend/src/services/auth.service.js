import { loginApi, logoutApi, meApi, registerApi } from "../api/auth.api.js";
import { unwrapResponse } from "../lib/ApiResponse.js";
import { authStorage } from "../lib/auth-storage";
import useAuthStore from "../store/auth.store.js";

export const login = async (values) => {
  const data = unwrapResponse(await loginApi(values));

  authStorage.saveTokens(data.accessToken, data.refreshToken);

  useAuthStore.getState().login(data.user);

  return data.user;
};

export const register = async (values) => {
  const data = unwrapResponse(await registerApi(values));

  return data.user;
};

export const initializeAuth = async () => {
  const token = authStorage.getAccessToken();

  if (!token) {
    useAuthStore.getState().logout();

    return;
  }

  try {
    const data = unwrapResponse(await meApi());

    useAuthStore.getState().initialize(data.user);
  } catch (error) {
    console.error("Failed to initialize auth:", error);
    authStorage.clearTokens();

    useAuthStore.getState().logout();
  }
};

export const logout = async () => {
  const refreshToken = authStorage.getRefreshToken();

  try {
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
  } finally {
    authStorage.clearTokens();

    useAuthStore.getState().logout();
  }
};
