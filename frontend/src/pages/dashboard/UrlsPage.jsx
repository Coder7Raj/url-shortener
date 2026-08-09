import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CreateUrlForm from "../../components/urls/CreateUrlForm.jsx";
import UrlList from "../../components/urls/UrlList.jsx";
import UrlPagination from "../../components/urls/UrlPagination.jsx";
import useUrls from "../../hooks/useUrls.js";

const UrlsPage = () => {
  const [page, setPage] = useState(1);

  const { fetchUrls, isLoading, urls, pagination, error } = useUrls();

  const loadUrls = (pageNumber) => {
    fetchUrls({
      page: pageNumber,
      limit: 10,
      sort: "createdAt",
      order: "desc",
    });
  };

  useEffect(() => {
    loadUrls(page);
  }, [page]);

  const handleCreateSuccess = () => {
    setPage(1);

    loadUrls(1);
  };

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
          <div className="w-full max-w-3xl">
            <CreateUrlForm onSuccess={handleCreateSuccess} />
          </div>
        </CardContent>
      </Card>

      {/* URL List */}
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

          {!isLoading && !error && urls.length > 0 && <UrlList />}

          {/* Pagination */}
          {!isLoading && !error && pagination.totalItems > 0 && (
            <UrlPagination
              page={page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={setPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlsPage;
