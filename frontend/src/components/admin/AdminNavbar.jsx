import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";
import ThemeToggle from "../ThemToggle.jsx";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      navigate(ROUTES.LOGIN, {
        replace: true,
      });
    }
  };

  const handleHome = () => {
    navigate(ROUTES.HOME);
  };

  const userInitial = user?.username?.charAt(0)?.toUpperCase() || "A";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Admin Dashboard
        </h2>

        <p className="hidden text-sm text-muted-foreground sm:block">
          Manage your Shortly application
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 text-foreground">
        {/* Home */}
        <Button variant="outline" size="icon" onClick={handleHome} title="Home">
          <Home className="h-4 w-4" />
        </Button>

        {/* Theme */}
        <ThemeToggle />

        {/* Admin */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {user?.profilePicture ? (
              <img
                className="h-full w-full object-cover"
                src={user.profilePicture}
                alt={user.username || "Admin"}
              />
            ) : (
              userInitial
            )}
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {user?.username || "Admin"}
            </p>

            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          disabled={isLoading}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default AdminNavbar;
