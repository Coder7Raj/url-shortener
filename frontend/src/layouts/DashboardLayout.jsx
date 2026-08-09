import { Outlet } from "react-router-dom";

import Navbar from "../components/dashboard/Navbar.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
