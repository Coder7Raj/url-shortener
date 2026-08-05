import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { ROUTES } from "../constants/routes.js";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginForm />, // Redirect to login page
      },
      // Register
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <Navigate to={ROUTES.URLS} replace />,
          },

          // URLs

          // Analytics

          // QR

          // Sessions

          // Profile
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
