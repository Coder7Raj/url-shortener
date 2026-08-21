import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  LogOut,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";

import { useEffect } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useSessions from "../../hooks/useSessions.js";

const getDeviceIcon = (deviceName = "") => {
  const device = String(deviceName || "").toLowerCase();

  if (
    device.includes("mobile") ||
    device.includes("phone") ||
    device.includes("android") ||
    device.includes("iphone")
  ) {
    return Smartphone;
  }

  if (device.includes("tablet") || device.includes("ipad")) {
    return Tablet;
  }

  return Monitor;
};
const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString();
};

const SessionsPage = () => {
  const {
    sessions,
    isLoading,
    isLoggingOutAll,
    pagination,
    error,
    fetchSessions,
    logoutAll,
  } = useSessions();

  useEffect(() => {
    fetchSessions({
      page: 1,
      limit: 10,
    });
  }, [fetchSessions]);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || page === pagination.page) {
      return;
    }

    fetchSessions({
      page,
      limit: pagination.limit,
    });
  };

  const handleLogoutAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from all sessions?",
    );

    if (!confirmed) return;

    const result = await logoutAll();

    if (result.success) {
      toast.success("Logged out from all sessions.");
    } else {
      toast.error(result.message || "Failed to logout from all sessions.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-foreground">
          <h1 className="text-2xl font-bold tracking-tight">Sessions</h1>

          <p className="text-muted-foreground">
            Manage the devices and browsers where your account is currently
            signed in.
          </p>
        </div>

        <Button
          className="text-foreground"
          variant="outline"
          onClick={fetchSessions}
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Error */}

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Monitor className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>

                <p className="text-2xl font-bold">{sessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex h-full items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Account Security</p>

              <p className="font-medium">Manage your active sessions</p>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogoutAll}
              disabled={isLoggingOutAll || sessions.length === 0}
            >
              {isLoggingOutAll ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Logout All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sessions */}

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>

        <CardContent>
          {sessions.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-center">
              <Monitor className="mb-4 h-12 w-12 text-muted-foreground" />

              <h3 className="text-lg font-semibold">No active sessions</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                There are currently no active sessions for your account.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.deviceName);

                return (
                  <div
                    key={session.sessionId}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* Device */}

                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <DeviceIcon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold">
                            {session.deviceName || "Unknown Device"}
                          </h3>

                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-3.5 w-3.5" />

                            <span>{session.ipAddress || "Unknown IP"}</span>
                          </div>

                          {session.userAgent && (
                            <p className="mt-2 break-all text-xs text-muted-foreground">
                              {session.userAgent}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Session information */}

                      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:min-w-105">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Created
                            </p>

                            <p>{formatDate(session.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Expires
                            </p>

                            <p>{formatDate(session.expiresAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {pagination.totalPages > 1 && (
                <div className="mt-6 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>
                    {" - "}
                    <span className="font-medium text-foreground">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total,
                      )}
                    </span>
                    {" of "}
                    <span className="font-medium text-foreground">
                      {pagination.total}
                    </span>
                    {" sessions"}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1 || isLoading}
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center justify-center rounded-md border px-3 py-1.5 text-sm">
                      {pagination.page} of {pagination.totalPages}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={
                        pagination.page === pagination.totalPages || isLoading
                      }
                    >
                      Next
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionsPage;
