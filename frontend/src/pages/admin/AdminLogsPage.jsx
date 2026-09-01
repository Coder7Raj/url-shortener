import { Eye, FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AdminLogDetailsDialog from "./AdminLogDetailsDialog.jsx";

import useAdminLogsStore from "../../store/admin/useAdminLogsStore.js";

const ACTION_OPTIONS = [
  { label: "All Actions", value: "" },
  { label: "Login", value: "LOGIN" },
  { label: "Logout", value: "LOGOUT" },
  { label: "URL Created", value: "URL_CREATED" },
];

const ENTITY_OPTIONS = [
  { label: "All Entities", value: "" },
  { label: "User", value: "USER" },
  { label: "URL", value: "URL" },
];

const getActionClass = (action) => {
  switch (action) {
    case "LOGIN":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

    case "LOGOUT":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";

    case "URL_CREATED":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

const getEntityClass = (entityType) => {
  switch (entityType) {
    case "USER":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";

    case "URL":
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatDateTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const AdminLogsPage = () => {
  const { logs, pagination, filters, isLoading, error, fetchLogs, setFilters } =
    useAdminLogsStore();

  const [searchInput, setSearchInput] = useState(filters.search);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetchLogs({
      page: 1,
      limit: pagination.limit,
      search: filters.search,
      action: filters.action,
      entityType: filters.entityType,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === filters.search) {
        return;
      }

      setFilters({
        search: searchInput,
      });

      fetchLogs({
        page: 1,
        limit: pagination.limit,
        search: searchInput,
        action: filters.action,
        entityType: filters.entityType,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleActionChange = (action) => {
    setFilters({
      action,
    });

    fetchLogs({
      page: 1,
      limit: pagination.limit,
      search: filters.search,
      action,
      entityType: filters.entityType,
    });
  };

  const handleEntityChange = (entityType) => {
    setFilters({
      entityType,
    });

    fetchLogs({
      page: 1,
      limit: pagination.limit,
      search: filters.search,
      action: filters.action,
      entityType,
    });
  };

  const handlePrevious = () => {
    if (pagination.page <= 1 || isLoading) {
      return;
    }

    fetchLogs({
      page: pagination.page - 1,
      limit: pagination.limit,
      search: filters.search,
      action: filters.action,
      entityType: filters.entityType,
    });
  };

  const handleNext = () => {
    if (pagination.page >= pagination.totalPages || isLoading) {
      return;
    }

    fetchLogs({
      page: pagination.page + 1,
      limit: pagination.limit,
      search: filters.search,
      action: filters.action,
      entityType: filters.entityType,
    });
  };

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>

        <p className="text-sm text-muted-foreground">
          Monitor user activity and system actions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search user, action, entity or IP..."
            className="pl-9"
          />
        </div>

        {/* Action */}
        <Select
          value={filters.action || "ALL"}
          onValueChange={(value) =>
            handleActionChange(value === "ALL" ? "" : value)
          }
        >
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>

          <SelectContent>
            {ACTION_OPTIONS.map((option) => (
              <SelectItem
                key={option.value || "ALL"}
                value={option.value || "ALL"}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Entity */}
        <Select
          value={filters.entityType || "ALL"}
          onValueChange={(value) =>
            handleEntityChange(value === "ALL" ? "" : value)
          }
        >
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="All Entities" />
          </SelectTrigger>

          <SelectContent>
            {ENTITY_OPTIONS.map((option) => (
              <SelectItem
                key={option.value || "ALL"}
                value={option.value || "ALL"}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 text-left font-medium">User</th>

                <th className="px-4 py-3 text-left font-medium">Action</th>

                <th className="px-4 py-3 text-left font-medium">Entity</th>

                <th className="px-4 py-3 text-left font-medium">IP Address</th>

                <th className="px-4 py-3 text-left font-medium">Date</th>

                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Loading audit logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />

                      <p className="font-medium">No audit logs found</p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.log_id}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    {/* User */}
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">
                          {log.users?.username || "Unknown"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {log.users?.email || "-"}
                        </p>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getActionClass(
                          log.action,
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    {/* Entity */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getEntityClass(
                            log.entity_type,
                          )}`}
                        >
                          {log.entity_type || "-"}
                        </span>

                        {log.entity_id && (
                          <span className="text-xs text-muted-foreground">
                            #{log.entity_id}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* IP */}
                    <td className="px-4 py-4">
                      <span className="font-mono text-xs">
                        {log.ip_address || "-"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDateTime(log.created_at)}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(log)}
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && logs.length > 0 && (
          <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages || 1} •{" "}
              {pagination.total} total logs
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={pagination.page <= 1 || isLoading}
                className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={pagination.page >= pagination.totalPages || isLoading}
                className="rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <AdminLogDetailsDialog
        open={detailsOpen}
        onOpenChange={(open) => {
          setDetailsOpen(open);

          if (!open) {
            setSelectedLog(null);
          }
        }}
        log={selectedLog}
      />
    </div>
  );
};

export default AdminLogsPage;
