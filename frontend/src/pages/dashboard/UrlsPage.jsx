import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import CreateUrlForm from "../../components/urls/CreateUrlForm.jsx";
import UrlCreateTips from "../../components/urls/UrlCreateTips.jsx";
import UrlList from "../../components/urls/UrlList.jsx";
import UrlPagination from "../../components/urls/UrlPagination.jsx";
import useUrls from "../../hooks/useUrls.js";

const UrlsPage = () => {
  const [page, setPage] = useState(1);

  const { fetchUrls, isLoading, urls, pagination, error } = useUrls();

  useEffect(() => {
    fetchUrls({
      page,
      limit: 10,
      sort: "createdAt",
      order: "desc",
    });
  }, [page, fetchUrls]);

  const handleCreateSuccess = () => {
    setPage(1);

    fetchUrls({
      page: 1,
      limit: 10,
      sort: "createdAt",
      order: "desc",
    });
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
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
            {/* Create URL */}
            <Card>
              {/* <CardHeader>
                <CardTitle>Create Short URL</CardTitle>
              </CardHeader> */}

              <CardContent>
                <CreateUrlForm onSuccess={handleCreateSuccess} />
              </CardContent>
            </Card>

            {/* Tips */}
            {/* <Card> */}
            <CardContent>
              <UrlCreateTips />
            </CardContent>
            {/* </Card> */}
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
