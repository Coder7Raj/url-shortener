import AdminProfilePage from "@/pages/admin/AdminProfilePage";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes.js";
import AdminLayout from "../layouts/AdminLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Home from "../pages/Home.jsx";
import LinkUnavailablePage from "../pages/LinkUnavailablePage.jsx";
import NotFound from "../pages/NotFound.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminLogsPage from "../pages/admin/AdminLogsPage.jsx";
import AdminSessionsPage from "../pages/admin/AdminSessionsPage.jsx";
import AdminUrlsPage from "../pages/admin/AdminUrlsPage.jsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/dashboard/ProfilePage.jsx";
import QrPage from "../pages/dashboard/QrPage.jsx";
import SessionsPage from "../pages/dashboard/SessionsPage.jsx";
import UrlDetailsPage from "../pages/dashboard/UrlDetailsPage.jsx";
import UrlsPage from "../pages/dashboard/UrlsPage";
import AdminRoute from "./AdminRoute.jsx";
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
    path: ROUTES.LINK_UNAVAILABLE,
    element: <LinkUnavailablePage />,
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
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: ROUTES.ADMIN_DASHBOARD,
            element: <AdminDashboardPage />,
          },
          {
            path: ROUTES.ADMIN_USERS,
            element: <AdminUsersPage />,
          },
          {
            path: ROUTES.ADMIN_SESSIONS,
            element: <AdminSessionsPage />,
          },
          {
            path: ROUTES.ADMIN_URLS,
            element: <AdminUrlsPage />,
          },
          {
            path: ROUTES.ADMIN_AUDIT_LOGS,
            element: <AdminLogsPage />,
          },
          {
            path: ROUTES.ADMIN_PROFILE,
            element: <AdminProfilePage />,
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
