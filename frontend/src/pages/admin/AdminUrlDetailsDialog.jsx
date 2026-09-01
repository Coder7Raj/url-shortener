import {
  CalendarDays,
  ExternalLink,
  Link2,
  MousePointerClick,
  Trash2,
  User,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const formatDateTime = (date) => {
  if (!date) return "Never";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

    case "INACTIVE":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

    case "EXPIRED":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";

    case "DELETED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

const AdminUrlDetailsDialog = ({
  open,
  onOpenChange,
  url,
  onStatusChange,
  onDelete,
  isUpdating,
  isDeleting,
}) => {
  if (!url) {
    return null;
  }

  const isDeleted = url.status === "DELETED";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>URL Details</DialogTitle>

          <DialogDescription>
            View and manage information about this shortened URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Short URL */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-primary/10 p-2">
                <Link2 className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Short Code
                </p>

                <p className="mt-1 break-all font-semibold">{url.short_code}</p>
              </div>
            </div>
          </div>

          {/* Original URL */}
          <div>
            <p className="text-sm font-medium">Original URL</p>

            <div className="mt-2 flex items-center gap-2 rounded-md border p-3">
              <p
                className="min-w-0 flex-1 break-all text-sm text-muted-foreground"
                title={url.original_url}
              >
                {url.original_url}
              </p>

              <a
                href={url.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md border p-2 transition-colors hover:bg-muted"
                title="Visit original URL"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Title / Description */}
          {(url.title || url.description) && (
            <div className="space-y-4">
              {url.title && (
                <div>
                  <p className="text-sm font-medium">Title</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {url.title}
                  </p>
                </div>
              )}

              {url.description && (
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {url.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Owner */}
          {url.users && (
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <User className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Owner
                  </p>

                  <p className="mt-1 font-medium">
                    {url.users.username || "Unknown"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {url.users.email || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MousePointerClick className="h-4 w-4" />

                <span className="text-xs font-medium">Clicks</span>
              </div>

              <p className="mt-2 text-xl font-semibold">
                {Number(url.total_clicks || 0).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />

                <span className="text-xs font-medium">Created</span>
              </div>

              <p className="mt-2 text-sm font-medium">
                {formatDateTime(url.created_at)}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MousePointerClick className="h-4 w-4" />

                <span className="text-xs font-medium">Last Click</span>
              </div>

              <p className="mt-2 text-sm font-medium">
                {formatDateTime(url.last_clicked_at)}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="text-sm font-medium">Status</p>

            <div className="mt-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                  url.status,
                )}`}
              >
                {url.status}
              </span>
            </div>
          </div>

          {/* Expiration / Max clicks */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">Expires At</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {formatDateTime(url.expires_at)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Maximum Clicks</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {url.max_clicks
                  ? Number(url.max_clicks).toLocaleString()
                  : "Unlimited"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-5">
            <p className="mb-3 text-sm font-medium">Actions</p>

            <div className="flex flex-col gap-2 sm:flex-row">
              {!isDeleted && (
                <>
                  {url.status !== "ACTIVE" && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onStatusChange("ACTIVE")}
                    >
                      {isUpdating ? "Updating..." : "Activate"}
                    </Button>
                  )}

                  {url.status !== "INACTIVE" && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUpdating}
                      onClick={() => onStatusChange("INACTIVE")}
                    >
                      {isUpdating ? "Updating..." : "Deactivate"}
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={onDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />

                    {isDeleting ? "Deleting..." : "Delete URL"}
                  </Button>
                </>
              )}

              {isDeleted && (
                <p className="text-sm text-muted-foreground">
                  This URL has been deleted and cannot be modified.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUrlDetailsDialog;
