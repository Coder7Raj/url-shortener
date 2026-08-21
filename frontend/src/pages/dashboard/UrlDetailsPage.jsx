import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  MousePointerClick,
  Pencil,
  QrCode,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteUrlDialog from "../../components/urls/DeleteUrlDialog.jsx";
import EditUrlDialog from "../../components/urls/EditUrlDialog.jsx";
import useQr from "../../hooks/useQr.js";
import useUrls from "../../hooks/useUrls.js";

const UrlDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedUrl,
    fetchUrlById,
    updateUrl,
    deleteUrl,
    isLoading,
    isUpdating,
    isDeleting,
    error,
  } = useUrls();

  const {
    qrCode,
    clearQr,
    clearError: clearQrError,
    fetchQr,
    regenerateQr,
    isLoading: isQrLoading,
    isRegenerating,
    error: qrError,
  } = useQr();

  const [editingUrl, setEditingUrl] = useState(null);
  const [deletingUrl, setDeletingUrl] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadDetails = async () => {
      await fetchUrlById(id);
      await fetchQr(id);
    };

    loadDetails();
  }, [id, fetchUrlById, fetchQr]);

  const handleEdit = async (url) => {
    if (!url) return;

    clearQr();
    clearQrError();

    setEditingUrl(url);

    const result = await fetchQr(url.id);

    if (!result.success) {
      console.log("No QR code found for this URL.");
    }
  };
  const handleDelete = async () => {
    if (!deletingUrl) return;

    const result = await deleteUrl(deletingUrl.id);

    if (result?.success) {
      setDeletingUrl(null);
      clearQr();

      toast.success("URL deleted successfully");

      navigate("/dashboard/urls");
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
      await fetchUrlById(editingUrl.id);
      await fetchQr(editingUrl.id);

      setEditingUrl(null);

      toast.success("URL updated successfully");
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
      await fetchQr(editingUrl.id);

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
      clearQr();
      setEditingUrl(null);

      toast.success("URL deleted successfully");
      navigate("/dashboard/urls");
    }

    return result;
  };

  const handleDialogOpenChange = (open) => {
    if (!open) {
      setEditingUrl(null);
      clearQr();
      clearQrError();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading URL details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost">
          <Link className="flex items-center" to="/dashboard/urls">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!selectedUrl) {
    return (
      <div className="space-y-4">
        <Button variant="ghost">
          <Link className="flex items-center" to="/dashboard/urls">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <p className="text-muted-foreground">URL not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" className="mb-4 -ml-3">
          <Link className="flex items-center" to="/dashboard/urls">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <h1 className="text-2xl font-bold">URL Details</h1>

        <p className="mt-1 text-muted-foreground">
          View and manage your shortened URL.
        </p>
      </div>

      {/* URL Information */}
      <Card>
        <CardHeader>
          <CardTitle>URL Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Short URL */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Short URL
            </p>

            <Link
              href={selectedUrl.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 break-all font-medium text-primary hover:underline"
            >
              {selectedUrl.shortUrl}

              <ExternalLink className="h-4 w-4 shrink-0" />
            </Link>
          </div>

          {/* Original URL */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Original URL
            </p>

            <p className="mt-1 break-all">{selectedUrl.originalUrl}</p>
          </div>

          {/* Title */}
          {selectedUrl.title && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Title</p>

              <p className="mt-1">{selectedUrl.title}</p>
            </div>
          )}

          {/* Description */}
          {selectedUrl.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Description
              </p>

              <p className="mt-1 whitespace-pre-wrap">
                {selectedUrl.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Clicks */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MousePointerClick className="h-4 w-4" />

                <span className="text-sm">Total Clicks</span>
              </div>

              <p className="mt-2 text-2xl font-bold">
                {selectedUrl.totalClicks ?? 0}
              </p>
            </div>

            {/* Created */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />

                <span className="text-sm">Created</span>
              </div>

              <p className="mt-2 font-medium">
                {selectedUrl.createdAt
                  ? new Date(selectedUrl.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Status</p>

              <p className="mt-2 font-semibold">{selectedUrl.status}</p>
            </div>

            {/* Expires */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Expires</p>

              <p className="mt-2 font-medium">
                {selectedUrl.expiresAt
                  ? new Date(selectedUrl.expiresAt).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isQrLoading && (
            <p className="text-sm text-muted-foreground">Loading QR code...</p>
          )}

          {!isQrLoading && !qrCode && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <QrCode className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-3 font-medium">No QR code generated</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Generate a QR code for this URL from the edit dialog.
              </p>
            </div>
          )}

          {!isQrLoading && qrCode && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={qrCode.imageUrl}
                alt={`QR code for ${selectedUrl.shortCode}`}
                className="h-64 w-64 rounded-lg border object-contain p-2"
              />

              <p className="text-sm text-muted-foreground">
                Scan this QR code to open your short URL.
              </p>
            </div>
          )}

          {qrError && (
            <p className="mt-3 text-sm text-destructive">{qrError}</p>
          )}
        </CardContent>
      </Card>

      {/* Page Actions */}
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => handleEdit(selectedUrl)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit URL
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={() => setDeletingUrl(selectedUrl)}
        >
          Delete URL
        </Button>
      </div>

      {/* Shared Edit / Delete / QR Dialog */}
      <EditUrlDialog
        url={editingUrl}
        qrCode={qrCode}
        open={Boolean(editingUrl)}
        onOpenChange={handleDialogOpenChange}
        onUpdate={handleUpdate}
        onDelete={handleDeleteFromEdit}
        onRegenerateQr={handleRegenerateQr}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        isRegenerating={isRegenerating}
        qrError={qrError}
      />
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
    </div>
  );
};

export default UrlDetailsPage;
