import { ExternalLink, Medal } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ROUTES } from "@/constants/routes.js";

const TopUrls = ({ urls = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Top URLs</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-32 max-w-full rounded bg-muted" />
                    <div className="h-3 w-48 max-w-full rounded bg-muted" />
                  </div>
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
        <CardTitle>Top URLs</CardTitle>

        <Button variant="ghost" size="sm">
          <Link to={ROUTES.URLS}>View All</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {urls.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center text-center text-sm text-muted-foreground">
            No URL performance data available yet.
          </div>
        ) : (
          <div className="min-w-0 space-y-3">
            {urls.map((url, index) => {
              const shortUrl = `${import.meta.env.VITE_API_URL}/${url.shortCode}`;

              return (
                <div
                  key={url.id}
                  className="min-w-0 rounded-xl border p-3 sm:p-4"
                >
                  {/* Top row */}
                  <div className="flex min-w-0 items-start gap-3">
                    {/* Rank */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index < 3 ? <Medal className="h-4 w-4" /> : index + 1}
                    </div>

                    {/* URL info */}
                    <div className="min-w-0 flex-1">
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

                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {shortUrl}
                      </p>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    {/* Click count */}
                    <div>
                      <p className="font-semibold">{url.totalClicks}</p>

                      <p className="text-xs text-muted-foreground">
                        {url.totalClicks === 1 ? "click" : "clicks"}
                      </p>
                    </div>

                    {/* Open */}
                    <Link
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Open URL</span>
                    </Link>
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

export default TopUrls;
