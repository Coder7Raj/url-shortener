import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUrlDialog = ({
  url,
  open,
  onOpenChange,

  qrCode,

  onUpdate,
  onRegenerateQr,

  isUpdating = false,
  isDeleting = false,
  isRegenerating = false,
}) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [error, setError] = useState("");

  const formatDateTimeLocal = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const offset = date.getTimezoneOffset();

    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (!url || !open) return;

    setOriginalUrl(url.originalUrl || "");
    setCustomAlias(url.shortCode || "");
    setTitle(url.title || "");
    setDescription(url.description || "");
    setExpiresAt(formatDateTimeLocal(url.expiresAt));

    setStatus(url.status === "INACTIVE" ? "INACTIVE" : "ACTIVE");

    setError("");
  }, [url, open]);

  const handleOpenChange = (value) => {
    if (!value) {
      setError("");
    }

    onOpenChange?.(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!originalUrl.trim()) {
      setError("Original URL is required.");
      return;
    }

    try {
      new URL(originalUrl);
    } catch {
      setError("Please provide a valid URL.");
      return;
    }

    if (customAlias.trim().length > 0 && customAlias.trim().length < 3) {
      setError("Custom alias must be at least 3 characters.");
      return;
    }

    if (expiresAt) {
      const expirationDate = new Date(expiresAt);

      if (Number.isNaN(expirationDate.getTime())) {
        setError("Please provide a valid expiration date.");
        return;
      }

      if (expirationDate <= new Date()) {
        setError("Expiration date must be in the future.");
        return;
      }
    }

    const payload = {
      originalUrl: originalUrl.trim(),
      customAlias: customAlias.trim() || undefined,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
      status,
    };

    const result = await onUpdate?.(payload);

    if (!result?.success && result?.error) {
      setError(result.error);
    }
  };

  const handleRegenerate = async () => {
    setError("");

    const result = await onRegenerateQr?.();

    if (!result?.success && result?.error) {
      setError(result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit URL</DialogTitle>

          <DialogDescription>
            Update your shortened URL settings or manage its QR code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Original URL */}
          <div className="space-y-2">
            <Label htmlFor="edit-original-url">Original URL</Label>

            <Input
              id="edit-original-url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              placeholder="https://example.com"
              disabled={isUpdating}
            />
          </div>

          {/* Custom Alias */}
          <div className="space-y-2">
            <Label htmlFor="edit-custom-alias">Custom Alias</Label>

            <Input
              id="edit-custom-alias"
              value={customAlias}
              onChange={(event) => setCustomAlias(event.target.value)}
              placeholder="my-custom-link"
              disabled={isUpdating}
            />

            <p className="text-xs text-muted-foreground">
              3–20 characters. Letters, numbers, underscores and hyphens only.
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>

            <Input
              id="edit-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="My important link"
              disabled={isUpdating}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>

            <Textarea
              id="edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe this URL..."
              rows={4}
              disabled={isUpdating}
            />
          </div>

          {/* Expiration */}
          <div className="space-y-2">
            <Label htmlFor="edit-expires-at">Expiration</Label>

            <Input
              id="edit-expires-at"
              type="datetime-local"
              value={expiresAt}
              onChange={(event) => setExpiresAt(event.target.value)}
              disabled={isUpdating}
            />

            <p className="text-xs text-muted-foreground">
              Leave empty if this URL should never expire.
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>

            <Select
              value={status}
              onValueChange={setStatus}
              disabled={isUpdating}
            >
              <SelectTrigger id="edit-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>

                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* QR Code */}
          <div className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">QR Code</h3>

                <p className="text-sm text-muted-foreground">
                  Manage the QR code for this URL.
                </p>
              </div>

              <RefreshCw className="h-5 w-5 text-muted-foreground" />
            </div>

            {qrCode ? (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-lg border bg-white p-3">
                  <img
                    src={qrCode.imageUrl}
                    alt={`QR code for ${url?.shortCode}`}
                    className="h-40 w-40 object-contain"
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isRegenerating || isUpdating || isDeleting}
                >
                  <RefreshCw
                    className={`mr-2 h-4 w-4 ${
                      isRegenerating ? "animate-spin" : ""
                    }`}
                  />

                  {isRegenerating ? "Regenerating..." : "Regenerate QR"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <QrEmptyIcon />

                <div>
                  <p className="text-sm font-medium">No QR code</p>

                  <p className="text-xs text-muted-foreground">
                    A QR code has not been generated for this URL.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

              <span>{error}</span>
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
              disabled={isUpdating || isDeleting || isRegenerating}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isUpdating || isDeleting || isRegenerating}
            >
              {isUpdating ? "Updating..." : "Update URL"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const QrEmptyIcon = () => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border">
    <span className="text-xs font-bold">QR</span>
  </div>
);

export default EditUrlDialog;
