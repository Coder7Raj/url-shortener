import { Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";
import ThemeToggle from "../ThemToggle.jsx";

const Navbar = () => {
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

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-lg text-foreground font-semibold">Welcome back</h2>

        <p className="text-sm text-muted-foreground">
          Manage your shortened URLs
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Home */}
        <Button
          className="text-foreground"
          variant="outline"
          size="icon"
          onClick={() => navigate(ROUTES.HOME)}
          title="Home"
        >
          <Home className="h-4 w-4" />
        </Button>
        <div className="text-foreground">
          <ThemeToggle />
        </div>

        {/* User */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {user?.profilePicture ? (
              <img
                className="h-full w-full object-cover rounded-full"
                src={user?.profilePicture}
                alt={user?.username}
              />
            ) : (
              user?.username?.charAt(0)?.toUpperCase()
            )}
          </div>

          <div className="text-right text-foreground">
            <p className="text-sm font-medium">{user?.username || "User"}</p>

            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <Button
          className="text-foreground"
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

export default Navbar;
