import axios from "axios";
import { authStorage } from "../lib/auth-storage.js";
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Separate Axios instance for refreshing the token.
 *
 * Important:
 * We DON'T use apiClient here because apiClient
 * itself has the response interceptor.
 *
 * Otherwise we could create an interceptor loop.
 */
const refreshClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Prevent multiple refresh requests
 * from happening simultaneously.
 */
let isRefreshing = false;

let failedQueue = [];

/*
 * Resolve/reject requests waiting for
 * the refresh operation.
 */
const processQueue = (error, accessToken = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(accessToken);
    }
  });

  failedQueue = [];
};

/*
 * Request interceptor
 *
 * Automatically attach access token.
 */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/*
 * Response interceptor
 *
 * Handle expired access tokens.
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    /*
     * Only handle 401 responses.
     */
    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    /*
     * Don't try to refresh the refresh endpoint itself.
     */
    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    /*
     * If another request is already refreshing
     * the token, wait for it.
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      }).then((accessToken) => {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;

    isRefreshing = true;

    const refreshToken = authStorage.getRefreshToken();

    // No refresh token means the session cannot be recovered.

    if (!refreshToken) {
      isRefreshing = false;

      authStorage.clear();

      return Promise.reject(error);
    }

    try {
      /*
       * Call refresh endpoint without the
       * normal apiClient interceptor.
       */
      const response = await refreshClient.post("/auth/refresh", {
        refreshToken,
      });

      const data = response.data?.data;
      const newAccessToken = data?.accessToken;
      const newRefreshToken = data?.refreshToken;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh.");
      }

      /*
       * Store new access token.
       */
      authStorage.setAccessToken(newAccessToken);

      /*
       * Some backends rotate the refresh token.
       *
       * If a new refresh token is returned,
       * replace the old one.
       */
      if (newRefreshToken) {
        authStorage.setRefreshToken(newRefreshToken);
      }

      /*
       * Resolve all queued requests.
       */
      processQueue(null, newAccessToken);

      /*
       * Retry the original request.
       */
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      /*
       * Refresh failed.
       *
       * The session is no longer recoverable.
       */
      processQueue(refreshError, null);

      authStorage.clear();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
