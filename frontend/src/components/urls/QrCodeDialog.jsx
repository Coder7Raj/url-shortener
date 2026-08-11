import { Loader2, QrCode, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Alert, AlertDescription } from "@/components/ui/alert";

import useQr from "../../hooks/useQr.js";

const QrCodeDialog = ({ url, open, onOpenChange }) => {
  const {
    qrCode,
    isLoading,
    isGenerating,
    isRegenerating,
    isDeleting,
    error,
    downloadQr,
    isDownloading,
    fetchQr,
    generateQr,
    regenerateQr,
    deleteQr,
    clearQr,
    clearError,
  } = useQr();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!open || !url?.id) {
      return;
    }

    clearError();
    fetchQr(url.id);
  }, [open, url?.id, fetchQr, clearError]);

  const handleClose = (value) => {
    if (!value) {
      clearQr();
      setShowDeleteConfirm(false);
    }

    onOpenChange(value);
  };

  const handleGenerate = async () => {
    if (!url?.id) {
      return;
    }

    await generateQr(url.id);
  };

  const handleRegenerate = async () => {
    if (!url?.id) {
      return;
    }

    await regenerateQr(url.id);
  };

  const handleDelete = async () => {
    if (!url?.id) {
      return;
    }

    const result = await deleteQr(url.id);

    if (result.success) {
      setShowDeleteConfirm(false);
    }
  };

  const handleDownload = async () => {
    await downloadQr(url.id);
  };

  const loading = isLoading || isGenerating || isRegenerating;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg md:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code
          </DialogTitle>

          <DialogDescription>
            Generate and manage the QR code for this shortened URL.
          </DialogDescription>
        </DialogHeader>

        {/* URL */}

        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="break-all text-sm font-medium">{url?.shortUrl}</p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            {url?.originalUrl}
          </p>
        </div>

        {/* Error */}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading */}

        {loading && (
          <div className="flex min-h-75 items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin" />

              <p className="mt-3 text-sm text-muted-foreground">
                {isGenerating && "Generating QR code..."}

                {isRegenerating && "Regenerating QR code..."}

                {isLoading &&
                  !isGenerating &&
                  !isRegenerating &&
                  "Loading QR code..."}
              </p>
            </div>
          </div>
        )}

        {/* QR exists */}

        {!loading && qrCode && (
          <div className="space-y-4">
            <div className="flex justify-center rounded-xl border bg-white p-6">
              <img
                src={qrCode.imageUrl}
                alt={`QR code for ${url?.shortUrl}`}
                className="h-64 w-64 object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Format:</span>{" "}
                {qrCode.format?.toUpperCase()}
              </div>

              <div>
                <span className="font-medium">Size:</span> {qrCode.width} ×{" "}
                {qrCode.height}
              </div>

              {qrCode.bytes && (
                <div>
                  <span className="font-medium">File size:</span>{" "}
                  {(qrCode.bytes / 1024).toFixed(1)} KB
                </div>
              )}
            </div>

            {!showDeleteConfirm ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Button onClick={handleDownload} disabled={isDownloading}>
                  {isDownloading ? "Downloading..." : "Download QR"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-sm font-medium">Delete this QR code?</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  The QR image will be removed from Cloudinary and the database.
                </p>

                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No QR */}

        {!loading && !qrCode && !error && (
          <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <QrCode className="h-12 w-12 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">No QR code yet</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Generate a QR code that points directly to your shortened URL.
            </p>

            <Button
              className="mt-5"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeDialog;
