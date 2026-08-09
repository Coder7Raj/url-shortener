import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes.js";

const PublicRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
