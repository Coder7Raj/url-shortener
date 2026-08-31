import { useEffect, useState } from "react";

import { Search, ShieldOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAdminSessionsStore from "../../store/admin/adminSessions.store.js";

const AdminSessionsPage = () => {
  const {
    sessions,
    pagination,
    isLoading,
    error,
    fetchSessions,
    revokeSession,
    revokeUserSessions,
  } = useAdminSessionsStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const loadSessions = (page = 1) => {
    fetchSessions({
      page,
      limit: pagination.limit,
      search,
      status,
    });
  };

  useEffect(() => {
    loadSessions(1);
  }, []);

  const handleSearch = () => {
    loadSessions(1);
  };

  const handleRevoke = async (sessionId) => {
    const result = await revokeSession(sessionId);

    if (result.success) {
      loadSessions(pagination.page);
    }
  };

  const handleRevokeAll = async (userId) => {
    const result = await revokeUserSessions(userId);

    if (result.success) {
      loadSessions(pagination.page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sessions</h1>

        <p className="text-sm text-muted-foreground">
          Monitor and manage user sessions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search by username, name, or email..."
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(event) => {
            const value = event.target.value;

            setStatus(value);

            fetchSessions({
              page: 1,
              limit: pagination.limit,
              search,
              status: value,
            });
          }}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">All Sessions</option>
          <option value="ACTIVE">Active</option>
          <option value="REVOKED">Revoked</option>
          <option value="EXPIRED">Expired</option>
        </select>

        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">User</th>

                <th className="px-4 py-3 text-left font-medium">Device</th>

                <th className="px-4 py-3 text-left font-medium">IP Address</th>

                <th className="px-4 py-3 text-left font-medium">Last Used</th>

                <th className="px-4 py-3 text-left font-medium">Expires</th>

                <th className="px-4 py-3 text-left font-medium">Status</th>

                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    Loading sessions...
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No sessions found.
                  </td>
                </tr>
              ) : (
                sessions.map((session) => (
                  <SessionRow
                    key={session.session_id}
                    session={session}
                    onRevoke={handleRevoke}
                    onRevokeAll={handleRevokeAll}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {pagination.total} total sessions
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || pagination.page <= 1}
            onClick={() => loadSessions(pagination.page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            {pagination.page} of {pagination.totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={isLoading || pagination.page >= pagination.totalPages}
            onClick={() => loadSessions(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const SessionRow = ({ session, onRevoke, onRevokeAll }) => {
  const isRevoked = Boolean(session.revoked_at);

  const isExpired = !isRevoked && new Date(session.expires_at) <= new Date();

  const status = isRevoked ? "REVOKED" : isExpired ? "EXPIRED" : "ACTIVE";

  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-4">
        <div>
          <p className="font-medium">{session.users?.username}</p>

          <p className="text-xs text-muted-foreground">
            {session.users?.email}
          </p>
        </div>
      </td>

      <td className="px-4 py-4">{session.device_name || "Unknown"}</td>

      <td className="px-4 py-4">{session.ip_address || "Unknown"}</td>

      <td className="px-4 py-4">
        {session.last_used_at
          ? new Date(session.last_used_at).toLocaleString()
          : "Never"}
      </td>

      <td className="px-4 py-4">
        {new Date(session.expires_at).toLocaleString()}
      </td>

      <td className="px-4 py-4">
        <span
          className={[
            "rounded-full px-2 py-1 text-xs font-medium",
            status === "ACTIVE" &&
              "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            status === "REVOKED" &&
              "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            status === "EXPIRED" &&
              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {status}
        </span>
      </td>

      <td className="px-4 py-4">
        <div className="flex justify-end gap-2">
          {status === "ACTIVE" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRevoke(session.session_id)}
              >
                <ShieldOff className="mr-2 h-4 w-4" />
                Revoke
              </Button>

              {session.users?.user_id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRevokeAll(session.users.user_id)}
                >
                  Revoke All
                </Button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AdminSessionsPage;
