import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Download,
  ExternalLink,
  Loader2,
  QrCode,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Link } from "react-router-dom";
import useQr from "../../hooks/useQr.js";
import useUrls from "../../hooks/useUrls.js";

const QrPage = () => {
  const { urls, fetchUrls, isLoading: isUrlsLoading } = useUrls();

  const {
    qrCode,
    fetchQr,
    generateQr,
    regenerateQr,
    deleteQr,
    downloadQr,
    clearQr,

    isLoading,
    isGenerating,
    isRegenerating,
    isDeleting,
    isDownloading,
  } = useQr();

  const [selectedUrlId, setSelectedUrlId] = useState(null);

  useEffect(() => {
    fetchUrls({
      page: 1,
      limit: 50,
    });
  }, [fetchUrls]);

  useEffect(() => {
    if (urls.length === 0) {
      setSelectedUrlId(null);
      return;
    }

    if (!selectedUrlId) {
      setSelectedUrlId(String(urls[0].id));
    }
  }, [urls, selectedUrlId]);

  const selectedUrl = urls.find(
    (url) => String(url.id) === String(selectedUrlId),
  );

  useEffect(() => {
    if (!selectedUrlId) {
      clearQr();
      return;
    }

    fetchQr(selectedUrlId);
  }, [selectedUrlId, fetchQr, clearQr]);

  const handleGenerate = async () => {
    if (!selectedUrlId) {
      toast.error("Please select a URL first.");
      return;
    }

    const result = await generateQr(selectedUrlId);

    if (result.success) {
      toast.success("QR code generated successfully.");
    }
  };

  const handleRegenerate = async () => {
    if (!selectedUrlId) return;

    const confirmed = window.confirm(
      "Are you sure you want to regenerate this QR code?",
    );

    if (!confirmed) return;

    const result = await regenerateQr(selectedUrlId);

    if (result.success) {
      toast.success("QR code regenerated successfully.");
    }
  };

  const handleDelete = async () => {
    if (!selectedUrlId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this QR code?",
    );

    if (!confirmed) return;

    const result = await deleteQr(selectedUrlId);

    if (result.success) {
      toast.success("QR code deleted successfully.");
    }
  };

  const handleDownload = async () => {
    if (!selectedUrlId) return;

    const result = await downloadQr(selectedUrlId);

    if (result.success) {
      toast.success("QR code download started.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">QR Codes</h1>

        <p className="text-muted-foreground">
          Generate, manage and download QR codes for your short URLs.
        </p>
      </div>

      {/* URL Selector */}

      <Card>
        <CardHeader>
          <CardTitle>Select URL</CardTitle>
        </CardHeader>

        <CardContent>
          {isUrlsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading URLs...
            </div>
          ) : urls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No URLs available.</p>
          ) : (
            <Select
              value={selectedUrlId || ""}
              onValueChange={(value) => {
                setSelectedUrlId(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a URL">
                  {selectedUrl && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-medium">
                        {selectedUrl.title || "Untitled URL"}
                      </span>

                      <span className="shrink-0 text-muted-foreground">
                        /{selectedUrl.shortCode}
                      </span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {urls.map((url) => (
                  <SelectItem key={url.id} value={String(url.id)}>
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-medium">
                        {url.title || "Untitled URL"}
                      </span>

                      <span className="shrink-0 text-muted-foreground">
                        /{url.shortCode}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {/* QR Section */}

      {!selectedUrl ? (
        <Card>
          <CardContent className="flex min-h-75 flex-col items-center justify-center text-center">
            <QrCode className="mb-4 h-12 w-12 text-muted-foreground" />

            <h3 className="text-lg font-semibold">Select a URL</h3>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Select one of your short URLs above to view or generate its QR
              code.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* URL Information */}

          <Card>
            <CardHeader>
              <CardTitle>URL Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Title */}

              <div>
                <p className="text-sm text-muted-foreground">Title</p>

                <p className="mt-1 font-medium">
                  {selectedUrl.title || "Untitled URL"}
                </p>
              </div>

              {/* Short URL */}

              <div>
                <p className="text-sm text-muted-foreground">Short URL</p>

                <Link
                  href={selectedUrl.shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {selectedUrl.shortUrl}

                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Original URL */}

              <div>
                <p className="text-sm text-muted-foreground">Original URL</p>

                <p className="mt-1 break-all text-sm">
                  {selectedUrl.originalUrl}
                </p>
              </div>

              {/* Total Clicks */}

              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>

                <p className="mt-1 text-2xl font-bold">
                  {selectedUrl.totalClicks ?? 0}
                </p>
              </div>

              {/* Generate */}

              {!qrCode && !isLoading && (
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full sm:w-auto"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* QR Preview */}

          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="flex min-h-75 items-center justify-center">
                  <Loader2 className="h-7 w-7 animate-spin" />
                </div>
              ) : qrCode ? (
                <div className="space-y-5">
                  {/* QR Image */}

                  <div className="flex justify-center rounded-lg border bg-white p-6">
                    <img
                      src={qrCode.imageUrl}
                      alt={`QR code for ${selectedUrl.shortCode}`}
                      className="h-auto w-full max-w-65"
                    />
                  </div>

                  {/* QR Information */}

                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium">
                      /{selectedUrl.shortCode}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {qrCode.width} × {qrCode.height}px
                    </p>
                  </div>

                  {/* Actions */}

                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handleDownload} disabled={isDownloading}>
                      {isDownloading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Download
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleRegenerate}
                      disabled={isRegenerating}
                    >
                      {isRegenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="mr-2 h-4 w-4" />
                      )}
                      Regenerate
                    </Button>
                  </div>

                  {/* Delete */}

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Delete QR Code
                  </Button>
                </div>
              ) : (
                <div className="flex min-h-75 flex-col items-center justify-center text-center">
                  <QrCode className="mb-4 h-12 w-12 text-muted-foreground" />

                  <p className="font-medium">No QR code generated</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Generate a QR code for this short URL.
                  </p>

                  <Button
                    className="mt-4"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="mr-2 h-4 w-4" />
                        Generate QR Code
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QrPage;
