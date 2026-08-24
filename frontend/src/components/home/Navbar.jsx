import { ArrowRight, Link2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { ROUTES } from "../../constants/routes.js";
import useAuthStore from "../../store/auth.store.js";
import ThemeToggle from "../ThemToggle.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error(
        error?.response?.data?.message || "Failed to logout. Please try again.",
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Link2 className="h-5 w-5" />
          </div>

          <span className="text-lg font-bold tracking-tight">Shortly</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#analytics"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>
        </nav>

        {/* Actions */}

        <div className="flex items-center gap-2">
          <div>
            <ThemeToggle />
          </div>
          {!isInitializing && isAuthenticated ? (
            <>
              <Button>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : !isInitializing ? (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex">
                <Link to={ROUTES.LOGIN}>Log in</Link>
              </Button>

              <Button>
                <Link className="flex items-center" to={ROUTES.REGISTER}>
                  Get started
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
