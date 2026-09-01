import { CalendarDays, Globe, Hash, Monitor, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatDateTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatMetadataKey = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
};

const formatMetadataValue = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const AdminLogDetailsDialog = ({ open, onOpenChange, log }) => {
  if (!log) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Audit Log Details</DialogTitle>

          <DialogDescription>
            Complete information about this administrative activity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Activity Information</h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Hash className="h-3.5 w-3.5" />
                  Log ID
                </div>

                <p className="font-medium">{log.log_id}</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-1 text-xs text-muted-foreground">Action</div>

                <p className="font-medium">{log.action}</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-1 text-xs text-muted-foreground">
                  Entity Type
                </div>

                <p className="font-medium">{log.entity_type || "-"}</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-1 text-xs text-muted-foreground">
                  Entity ID
                </div>

                <p className="font-medium">{log.entity_id || "-"}</p>
              </div>
            </div>
          </div>

          {/* User */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">User</h3>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2">
                  <User className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    {log.users?.name || "Unknown user"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    @{log.users?.username || "-"}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {log.users?.email || "-"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    User ID: {log.user_id || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Request Information</h3>

            <div className="space-y-3">
              <div className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3.5 w-3.5" />
                  IP Address
                </div>

                <p className="font-mono text-sm">{log.ip_address || "-"}</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Monitor className="h-3.5 w-3.5" />
                  User Agent
                </div>

                <p className="break-all text-sm">{log.user_agent || "-"}</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Created At
                </div>

                <p className="text-sm">{formatDateTime(log.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Metadata</h3>

            {log.metadata && Object.keys(log.metadata).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(log.metadata).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-1 rounded-lg border p-3 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <span className="text-sm font-medium">
                      {formatMetadataKey(key)}
                    </span>

                    <span className="break-all text-sm text-muted-foreground sm:max-w-[65%] sm:text-right">
                      {formatMetadataValue(value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                No metadata available.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogDetailsDialog;
