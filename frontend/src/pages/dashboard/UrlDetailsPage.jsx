import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  MousePointerClick,
  QrCode,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import useQr from "../../hooks/useQr.js";
import useUrls from "../../hooks/useUrls.js";

const UrlDetailsPage = () => {
  const { id } = useParams();

  const { selectedUrl, fetchUrlById, isLoading, error } = useUrls();

  const { qrCode, isLoading: isQrLoading, fetchQr } = useQr();

  useEffect(() => {
    if (!id) return;

    fetchUrlById(id);
    fetchQr(id);
  }, [id, fetchUrlById, fetchQr]);

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
          <Link to="/dashboard/urls">
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
          <Link to="/dashboard/urls">
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

            <a
              href={selectedUrl.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-2 break-all font-medium text-primary hover:underline"
            >
              {selectedUrl.shortUrl}

              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
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
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MousePointerClick className="h-4 w-4" />

                <span className="text-sm">Total Clicks</span>
              </div>

              <p className="mt-2 text-2xl font-bold">
                {selectedUrl.totalClicks ?? 0}
              </p>
            </div>

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

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Status</p>

              <p className="mt-2 font-semibold">{selectedUrl.status}</p>
            </div>

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
                Generate a QR code for this URL.
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
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button>Edit URL</Button>

        <Button variant="destructive">Delete URL</Button>
      </div>
    </div>
  );
};

export default UrlDetailsPage;
