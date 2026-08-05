import { storage } from "../../../lib/storage.js";
import { unwrapResponse } from "../../lib/ApiResponse.js";
import { loginApi, logoutApi, meApi, registerApi } from "../api/auth.api.js";
import useAuthStore from "../store/auth.store.js";

export const login = async (values) => {
  const data = unwrapResponse(await loginApi(values));

  storage.saveTokens(data.accessToken, data.refreshToken);

  useAuthStore.getState().login(data.user);

  return data.user;
};

export const register = async (values) => {
  const data = unwrapResponse(await registerApi(values));

  return data.user;
};

export const initializeAuth = async () => {
  const token = storage.getAccessToken();

  if (!token) {
    useAuthStore.getState().logout();

    return;
  }

  try {
    const data = unwrapResponse(await meApi());

    useAuthStore.getState().initialize(data.user);
  } catch (error) {
    storage.clearTokens();

    useAuthStore.getState().logout();
  }
};

export const logout = async () => {
  const refreshToken = storage.getRefreshToken();

  try {
    if (refreshToken) {
      await logoutApi(refreshToken);
    }
  } finally {
    storage.clearTokens();

    useAuthStore.getState().logout();
  }
};
