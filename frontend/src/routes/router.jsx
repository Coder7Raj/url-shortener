import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/dashboard/ProfilePage.jsx";
import QrPage from "../pages/dashboard/QrPage.jsx";
import SessionsPage from "../pages/dashboard/SessionsPage.jsx";
import UrlDetailsPage from "../pages/dashboard/UrlDetailsPage.jsx";
import UrlsPage from "../pages/dashboard/UrlsPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },

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
            element: <QrPage />,
          },

          {
            path: ROUTES.SESSIONS,
            element: <SessionsPage />,
          },

          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
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
