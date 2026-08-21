import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes.js";
import useAuthStore from "../store/auth.store.js";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
