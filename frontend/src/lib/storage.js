const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const storage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  },

  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  },

  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN, token);
  },

  saveTokens(accessToken, refreshToken) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  },

  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};
