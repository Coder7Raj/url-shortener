import { Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ROUTES } from "@/constants/routes.js";

const RecentUrls = ({ urls = [], isLoading = false }) => {
  const copyShortUrl = async (shortCode) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const shortUrl = `${baseUrl}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL copied");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  if (isLoading) {
    return (
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Recent URLs</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-lg border p-4">
                <div className="space-y-3">
                  <div className="h-4 w-40 max-w-full rounded bg-muted" />
                  <div className="h-3 w-64 max-w-full rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent URLs</CardTitle>

        <Button variant="ghost" size="sm">
          <Link to={ROUTES.URLS}>View All</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {urls.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center text-center">
            <p className="font-medium">No URLs yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first short URL to get started.
            </p>

            <Button className="mt-4" size="sm">
              <Link to={ROUTES.URLS}>Create URL</Link>
            </Button>
          </div>
        ) : (
          <div className="min-w-0 space-y-3">
            {urls.map((url) => {
              const shortUrl = `${import.meta.env.VITE_BASE_URL}/${url.shortCode}`;

              return (
                <div
                  key={url.id}
                  className="min-w-0 rounded-xl border p-3 sm:p-4"
                >
                  {/* Main content */}
                  <div className="min-w-0">
                    {/* Title + status */}
                    <div className="flex min-w-0 items-start gap-2">
                      <h3 className="min-w-0 flex-1 truncate font-medium">
                        {url.title || url.shortCode}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                          url.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {url.status}
                      </span>
                    </div>

                    {/* Short URL */}
                    <p className="mt-1 min-w-0 truncate text-sm text-muted-foreground">
                      {shortUrl}
                    </p>

                    {/* Original URL */}
                    <p className="mt-1 min-w-0 truncate text-xs text-muted-foreground">
                      {url.originalUrl}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {url.totalClicks}{" "}
                      {url.totalClicks === 1 ? "click" : "clicks"}
                    </span>

                    <div className="flex shrink-0 items-center gap-1">
                      {/* Copy */}
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Copy"
                        onClick={() => copyShortUrl(url.shortCode)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>

                      {/* Open */}
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open URL</span>
                      </a>

                      {/* Details */}
                      <Button variant="ghost" size="icon" title="Details">
                        <Link to={`${ROUTES.URLS}/${url.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mt-2 text-right text-xs text-muted-foreground">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentUrls;
