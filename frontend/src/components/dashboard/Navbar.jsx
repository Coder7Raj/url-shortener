import { Home, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ROUTES } from "../../constants/routes.js";
import useAuth from "../../hooks/useAuth.js";
import ThemeToggle from "../ThemToggle.jsx";
import { SidebarContent } from "./Sidebar.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  const handleNavigation = () => {
    setMobileSidebarOpen(false);
  };

  const userInitial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile / Tablet Menu */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden text-foreground"
                title="Open navigation"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent side="left" className="w-72 bg-card p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <SidebarContent onNavigate={handleNavigation} />
          </SheetContent>
        </Sheet>

        {/* Welcome */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Welcome back
          </h2>

          <p className="hidden text-sm text-muted-foreground sm:block">
            Manage your shortened URLs
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 text-foreground">
        {/* Home */}
        <Button variant="outline" size="icon" onClick={handleHome} title="Home">
          <Home className="h-4 w-4" />
        </Button>

        {/* Theme */}
        <ThemeToggle />

        {/* User */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {user?.profilePicture ? (
              <img
                className="h-full w-full object-cover"
                src={user.profilePicture}
                alt={user.username || "User"}
              />
            ) : (
              userInitial
            )}
          </div>

          <div className="text-right text-foreground">
            <p className="text-sm font-medium text-foreground">
              {user?.username || "User"}
            </p>

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
