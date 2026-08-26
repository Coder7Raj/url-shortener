import {
  CheckCircle2,
  Mail,
  RefreshCw,
  Search,
  Shield,
  User,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAdminUsers from "../../hooks/admin/useAdminUsers.js";

const formatDate = (date) => {
  if (!date) {
    return "Never";
  }

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const AdminUsersPage = () => {
  const {
    users,
    pagination,

    search,
    role,
    status,

    isLoading,
    error,

    handleSearch,
    handleRoleChange,
    handleStatusChange,
    handlePageChange,

    refresh,
  } = useAdminUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage users and monitor account status.
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={refresh}
          disabled={isLoading}
          title="Refresh users"
        >
          <RefreshCw
            className={[
              "h-4 w-4 text-foreground",
              isLoading ? "animate-spin" : "",
            ].join(" ")}
          />
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search by username, name, or email..."
              className="pl-9 text-foreground"
            />
          </div>

          {/* Role */}
          <select
            value={role}
            onChange={(event) => handleRoleChange(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All roles</option>
            <option value="USER">Users</option>
            <option value="ADMIN">Admins</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Users table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  User
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Role
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Verified
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Last Login
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <User className="mx-auto h-8 w-8 text-muted-foreground" />

                    <p className="mt-2 text-sm font-medium text-foreground">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.user_id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* User */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {user.profile_picture ? (
                            <img
                              src={user.profile_picture}
                              alt={user.username}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            user.username?.charAt(0)?.toUpperCase() || "U"
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Mail className="h-4 w-4 text-muted-foreground" />

                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          user.role === "ADMIN"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground",
                        ].join(" ")}
                      >
                        {user.role === "ADMIN" ? (
                          <Shield className="h-3.5 w-3.5" />
                        ) : (
                          <User className="h-3.5 w-3.5" />
                        )}

                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          user.is_active
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600",
                        ].join(" ")}
                      >
                        {user.is_active ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}

                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Verified */}
                    <td className="px-4 py-4">
                      {user.email_verified ? (
                        <span className="text-sm text-green-600">Verified</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Not verified
                        </span>
                      )}
                    </td>

                    {/* Last login */}
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {formatDate(user.last_login_at)}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 0 && (
          <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {users.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {pagination.total}
              </span>{" "}
              users
            </p>

            <div className="flex items-center gap-2 text-foreground">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1 || isLoading}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>

              <span className="px-2 text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages || isLoading}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
