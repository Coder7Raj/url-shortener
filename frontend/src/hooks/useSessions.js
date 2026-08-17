import useSessionStore from "../store/session.store.js";

const useSessions = () => {
  const sessions = useSessionStore((state) => state.sessions);

  const isLoading = useSessionStore((state) => state.isLoading);

  const isLoggingOutAll = useSessionStore((state) => state.isLoggingOutAll);

  const error = useSessionStore((state) => state.error);

  const fetchSessions = useSessionStore((state) => state.fetchSessions);

  const logoutAll = useSessionStore((state) => state.logoutAll);

  const clearError = useSessionStore((state) => state.clearError);

  const pagination = useSessionStore((state) => state.pagination);
  return {
    sessions,
    pagination,
    isLoading,
    isLoggingOutAll,

    error,

    fetchSessions,
    logoutAll,
    clearError,
  };
};

export default useSessions;
