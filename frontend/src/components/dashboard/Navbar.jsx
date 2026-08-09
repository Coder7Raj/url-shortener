import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";

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

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.username?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h2 className="text-lg font-semibold">Welcome back</h2>

        <p className="text-sm text-muted-foreground">
          Manage your shortened URLs
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {userInitial}
          </div>

          <div className="text-right">
            <p className="text-sm font-medium">
              {user?.name || user?.username || "User"}
            </p>

            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

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

export default Navbar;
