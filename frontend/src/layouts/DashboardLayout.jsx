import { Outlet } from "react-router-dom";

import Navbar from "../components/dashboard/Navbar.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      {/* Main area */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <Navbar />

        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
