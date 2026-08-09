import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CreateUrlForm from "../../components/urls/CreateUrlForm.jsx";
import useUrls from "../../hooks/useUrls.js";

const UrlsPage = () => {
  const { fetchUrls, isLoading, urls, pagination, error } = useUrls();

  useEffect(() => {
    fetchUrls({
      page: 1,
      limit: 10,
      sort: "createdAt",
      order: "desc",
    });
  }, [fetchUrls]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My URLs</h1>

        <p className="mt-1 text-muted-foreground">
          Create and manage your shortened URLs.
        </p>
      </div>

      {/* Create URL */}
      <Card>
        <CardHeader>
          <CardTitle>Create Short URL</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-w-2xl">
            <CreateUrlForm
              onSuccess={() => {
                fetchUrls({
                  page: 1,
                  limit: 10,
                  sort: "createdAt",
                  order: "desc",
                });
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* URL list */}
      <Card>
        <CardHeader>
          <CardTitle>Your URLs</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading URLs...</p>
          )}

          {!isLoading && !error && urls.length === 0 && (
            <p className="text-sm text-muted-foreground">
              You haven't created any shortened URLs yet.
            </p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          {!isLoading && urls.length > 0 && (
            <div className="space-y-3">
              {urls.map((url) => (
                <div key={url.id} className="rounded-lg border p-4">
                  <p className="font-medium">{url.shortUrl}</p>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {url.originalUrl}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {url.totalClicks} clicks
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination info */}
          {pagination.totalItems > 0 && (
            <div className="mt-4 border-t pt-4 text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
              {" · "}
              {pagination.totalItems} total URLs
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlsPage;
