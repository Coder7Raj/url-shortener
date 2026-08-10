import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes.js";
import useAuthStore from "../store/auth.store.js";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
