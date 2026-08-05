import { loginApi, logoutApi, meApi, registerApi } from "../api/auth.api.js";

import { unwrapResponse } from "../../lib/ApiResponse.js";
import { token } from "../../lib/token.js";

class AuthService {
  async login(credentials) {
    const data = unwrapResponse(await loginApi(credentials));

    token.save(data.accessToken, data.refreshToken);

    return data.user;
  }

  async register(userData) {
    const data = unwrapResponse(await registerApi(userData));

    return data.user;
  }

  async getCurrentUser() {
    const data = unwrapResponse(await meApi());

    return data.user;
  }

  async logout() {
    const refreshToken = token.getRefreshToken();

    if (!refreshToken) {
      token.clear();
      return;
    }

    try {
      await logoutApi(refreshToken);
    } finally {
      token.clear();
    }
  }
}

export default new AuthService();
