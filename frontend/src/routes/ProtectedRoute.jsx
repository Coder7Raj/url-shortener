import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes.js";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
