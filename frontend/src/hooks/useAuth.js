import useAuthStore from "../store/auth.store.js";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);

  const accessToken = useAuthStore((state) => state.accessToken);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isLoading = useAuthStore((state) => state.isLoading);

  const error = useAuthStore((state) => state.error);

  const login = useAuthStore((state) => state.login);

  const register = useAuthStore((state) => state.register);

  const logout = useAuthStore((state) => state.logout);

  const logoutAll = useAuthStore((state) => state.logoutAll);

  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  const clearError = useAuthStore((state) => state.clearError);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    error,

    login,
    register,
    logout,
    logoutAll,
    getCurrentUser,
    clearError,
  };
};

export default useAuth;
