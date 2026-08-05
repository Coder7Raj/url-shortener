import { storage } from "./storage.js";

export const token = {
  getAccessToken() {
    return storage.getAccessToken();
  },

  getRefreshToken() {
    return storage.getRefreshToken();
  },

  save(accessToken, refreshToken) {
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
  },

  clear() {
    storage.clear();
  },
};
