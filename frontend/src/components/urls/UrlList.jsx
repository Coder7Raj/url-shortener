import { Copy, ExternalLink, Pencil, QrCode, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

import useQr from "../../hooks/useQr.js";
import useUrls from "../../hooks/useUrls.js";

import DeleteUrlDialog from "./DeleteUrlDialog.jsx";
import EditUrlDialog from "./EditUrlDialog.jsx";
import QrCodeDialog from "./QrCodeDialog.jsx";

const UrlList = ({ onUpdated, onDeleted }) => {
  const {
    qrCode,
    fetchQr,
    regenerateQr,
    isRegenerating,
    clearQr,
    clearError: clearQrError,
  } = useQr();

  const { urls, updateUrl, isLoading, deleteUrl, isDeleting } = useUrls();

  const [editingUrl, setEditingUrl] = useState(null);
  const [deletingUrl, setDeletingUrl] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL copied to clipboard");
    } catch {
      toast.error("Failed to copy short URL");
    }
  };
  const handleEdit = async (url) => {
    clearQr();
    clearQrError();
    setEditingUrl(url);

    const result = await fetchQr(url.id);

    if (!result.success) {
      console.log("No QR code found for this URL.");
    }
  };

  const handleUpdate = async (payload) => {
    if (!editingUrl) {
      return {
        success: false,
        error: "No URL selected",
      };
    }

    const result = await updateUrl(editingUrl.id, payload);

    if (result?.success) {
      setEditingUrl(null);
      onUpdated?.();
    }

    return result;
  };

  const handleRegenerateQr = async () => {
    if (!editingUrl) {
      return {
        success: false,
        error: "No URL selected",
      };
    }

    const result = await regenerateQr(editingUrl.id);

    if (result?.success) {
      toast.success("QR code regenerated successfully");
    }

    return result;
  };

  const handleDeleteFromEdit = async () => {
    if (!editingUrl) {
      return {
        success: false,
        error: "No URL selected",
      };
    }

    const result = await deleteUrl(editingUrl.id);

    if (result?.success) {
      setEditingUrl(null);
      clearQr();

      onDeleted?.();
    }

    return result;
  };

  const handleDelete = async () => {
    if (!deletingUrl) {
      return;
    }

    const result = await deleteUrl(deletingUrl.id);

    if (result?.success) {
      setDeletingUrl(null);

      onDeleted?.();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-muted-foreground">Loading URLs...</p>
        </CardContent>
      </Card>
    );
  }

  if (!urls.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="font-medium">No URLs found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first shortened URL above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {urls.map((url) => (
            <div key={url.id} className="rounded-lg p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* URL INFO */}
                <div className="min-w-0">
                  <Link
                    href={url.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {url.shortUrl}
                  </Link>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {url.originalUrl}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{url.totalClicks || 0} clicks</span>

                    <span>•</span>

                    <span>{url.status}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex shrink-0 flex-wrap gap-2">
                  {/* COPY */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(url.shortUrl)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>

                  {/* OPEN */}
                  <Button type="button" variant="outline" size="sm">
                    <Link
                      className="flex items-center"
                      to={url.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Link>
                  </Button>

                  {/* QR */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearQr();
                      clearQrError();
                      setQrUrl(url);
                    }}
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    QR
                  </Button>

                  {/* DETAILS */}
                  <Button variant="outline" size="sm">
                    <Link to={`/dashboard/urls/${url.id}`}>View Details</Link>
                  </Button>

                  {/* EDIT */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(url)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  {/* DELETE */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingUrl(url)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT DIALOG */}
        <EditUrlDialog
          url={editingUrl}
          qrCode={qrCode}
          open={Boolean(editingUrl)}
          onOpenChange={(open) => {
            if (!open) {
              setEditingUrl(null);
              clearQr();
              clearQrError();
            }
          }}
          onUpdate={handleUpdate}
          onDelete={handleDeleteFromEdit}
          onRegenerateQr={handleRegenerateQr}
          isUpdating={false}
          isDeleting={isDeleting}
          isRegenerating={isRegenerating}
        />

        {/* DELETE DIALOG */}
        <DeleteUrlDialog
          url={deletingUrl}
          open={Boolean(deletingUrl)}
          onOpenChange={(open) => {
            if (!open) {
              setDeletingUrl(null);
            }
          }}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />

        {/* QR DIALOG */}
        <QrCodeDialog
          url={qrUrl}
          open={Boolean(qrUrl)}
          onOpenChange={(open) => {
            if (!open) {
              setQrUrl(null);
              clearQr();
              clearQrError();
            }
          }}
        />
      </CardContent>
    </Card>
  );
};

export default UrlList;
