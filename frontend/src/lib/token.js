import { authStorage } from "./auth-storage.js";

export const token = {
  getAccessToken() {
    return authStorage.getAccessToken();
  },

  getRefreshToken() {
    return authStorage.getRefreshToken();
  },

  save(accessToken, refreshToken) {
    authStorage.setAccessToken(accessToken);
    authStorage.setRefreshToken(refreshToken);
  },

  clear() {
    authStorage.clear();
  },
};
