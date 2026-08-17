import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UrlDetailsPage from "../pages/dashboard/UrlDetailsPage.jsx";
import UrlsPage from "../pages/dashboard/UrlsPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const router = createBrowserRouter([
  // Public Routes
  {
    path: ROUTES.HOME,
    element: <Home />,
  },

  // Authentication Routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },

      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },

          {
            path: ROUTES.URLS,
            element: <UrlsPage />,
          },
          {
            path: ROUTES.URL_DETAILS,
            element: <UrlDetailsPage />,
          },

          {
            path: ROUTES.ANALYTICS,
            element: <AnalyticsPage />,
          },

          {
            path: ROUTES.QR,
            element: <div>QR Codes</div>,
          },

          {
            path: ROUTES.SESSIONS,
            element: <div>Sessions</div>,
          },

          {
            path: ROUTES.PROFILE,
            element: <div>Profile</div>,
          },
        ],
      },
    ],
  },

  // 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
