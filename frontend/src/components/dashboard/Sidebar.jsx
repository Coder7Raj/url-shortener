import { BarChart3, Home, Link2, QrCode, User, Users } from "lucide-react";

import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes.js";

const navigation = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: Home,
  },
  {
    label: "My URLs",
    href: ROUTES.URLS,
    icon: Link2,
  },
  {
    label: "Analytics",
    href: ROUTES.ANALYTICS,
    icon: BarChart3,
  },
  {
    label: "QR Codes",
    href: ROUTES.QR,
    icon: QrCode,
  },
  {
    label: "Sessions",
    href: ROUTES.SESSIONS,
    icon: Users,
  },
  {
    label: "Profile",
    href: ROUTES.PROFILE,
    icon: User,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <h1 className="text-xl font-bold">Shortly</h1>

          <p className="text-xs text-muted-foreground">Smart URL Management</p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === ROUTES.DASHBOARD}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")
              }
            >
              <Icon className="h-4 w-4" />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
