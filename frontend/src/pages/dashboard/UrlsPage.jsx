import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import CreateUrlForm from "../../components/urls/CreateUrlForm.jsx";
import UrlCreateTips from "../../components/urls/UrlCreateTips.jsx";
import UrlList from "../../components/urls/UrlList.jsx";
import UrlPagination from "../../components/urls/UrlPagination.jsx";
import UrlToolbar from "../../components/urls/UrlToolbar.jsx";
import useDebounce from "../../hooks/useDebounce.js";
import useUrls from "../../hooks/useUrls.js";

const UrlsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { fetchUrls, isLoading, urls, pagination, error } = useUrls();

  const debouncedSearch = useDebounce(search, 400);

  const loadUrls = useCallback(
    (pageNumber = 1) => {
      fetchUrls({
        page: pageNumber,
        limit: 10,
        search: debouncedSearch.trim() || undefined,
        status: status || undefined,
        sort,
        order,
      });
    },
    [fetchUrls, debouncedSearch, status, sort, order],
  );

  useEffect(() => {
    setPage(1);
    loadUrls(1);
  }, [debouncedSearch, status, sort, order, loadUrls]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setOrder("desc");
  };

  const handleOrderChange = (value) => {
    setOrder(value);
  };

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setSort("createdAt");
    setOrder("desc");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadUrls(newPage);
  };

  const handleCreateSuccess = () => {
    setPage(1);
    loadUrls(1);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl text-foreground font-bold tracking-tight">
          My URLs
        </h1>

        <p className="mt-1 text-muted-foreground">
          Create and manage your shortened URLs.
        </p>
      </div>

      {/* create url */}
      <Card>
        <CardHeader>
          <CardTitle>Create Short URL</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
            {/* Create URL */}
            <Card>
              <CardContent>
                <CreateUrlForm onSuccess={handleCreateSuccess} />
              </CardContent>
            </Card>

            {/* Tips */}
            <CardContent>
              <UrlCreateTips />
            </CardContent>
          </div>
        </CardContent>
      </Card>

      {/* url list */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <UrlToolbar
              search={search}
              status={status}
              sort={sort}
              order={order}
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
              onReset={handleReset}
            />
          </div>
        </CardHeader>

        <CardContent>
          {/* Loading */}

          {isLoading && (
            <div className="py-10 text-center">
              <p className="text-sm text-muted-foreground">Loading URLs...</p>
            </div>
          )}

          {/* Error */}

          {!isLoading && error && (
            <div className="py-10 text-center">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Empty State */}

          {!isLoading && !error && urls.length === 0 && (
            <div className="py-10 text-center">
              <p className="font-medium">
                {search || status
                  ? "No URLs match your filters."
                  : "You haven't created any shortened URLs yet."}
              </p>

              {(search || status) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
              )}
            </div>
          )}

          {/* URL List */}

          {!isLoading && !error && urls.length > 0 && (
            <UrlList
              onUpdated={() => {
                loadUrls(page);
              }}
              onDeleted={() => {
                loadUrls(page);
              }}
            />
          )}

          {/* Pagination */}

          {!isLoading && !error && pagination.totalItems > 0 && (
            <UrlPagination
              page={page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlsPage;
