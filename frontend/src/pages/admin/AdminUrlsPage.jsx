import { Eye, Link2, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AdminUrlDetailsDialog from "./AdminUrlDetailsDialog.jsx";

import useAdminUrlsStore from "../../store/admin/useAdminUrlsStore.js";

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Expired", value: "EXPIRED" },
  { label: "Deleted", value: "DELETED" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

    case "INACTIVE":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

    case "EXPIRED":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";

    case "DELETED":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatDate = (date) => {
  if (!date) return "Never";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const truncateUrl = (url, length = 45) => {
  if (!url) return "-";

  if (url.length <= length) {
    return url;
  }

  return `${url.slice(0, length)}...`;
};

const AdminUrlsPage = () => {
  const {
    urls,
    pagination,
    filters,

    isLoading,
    error,

    selectedUrl,
    isDetailsLoading,
    isUpdating,
    isDeleting,

    fetchUrls,
    fetchUrlDetails,
    updateUrlStatus,
    deleteUrl,

    setFilters,
    clearSelectedUrl,
  } = useAdminUrlsStore();

  const [searchInput, setSearchInput] = useState(filters.search);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    fetchUrls({
      page: 1,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === filters.search) {
        return;
      }

      setFilters({
        search: searchInput,
      });

      fetchUrls({
        page: 1,
        limit: pagination.limit,
        search: searchInput,
        status: filters.status,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleViewDetails = async (urlId) => {
    setDetailsOpen(true);

    await fetchUrlDetails(urlId);
  };

  const handleDetailsOpenChange = (open) => {
    setDetailsOpen(open);

    if (!open) {
      clearSelectedUrl();
    }
  };

  const handleStatusChange = async (status) => {
    if (!selectedUrl || isUpdating) {
      return;
    }

    const result = await updateUrlStatus(selectedUrl.url_id, status);

    if (!result.success) {
      return;
    }

    await fetchUrlDetails(selectedUrl.url_id);

    await fetchUrls({
      page: pagination.page,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status,
    });
  };

  const handleDelete = async () => {
    if (!selectedUrl || isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedUrl.short_code}"?`,
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteUrl(selectedUrl.url_id);

    if (!result.success) {
      return;
    }

    setDetailsOpen(false);
    clearSelectedUrl();

    const shouldGoToPreviousPage = urls.length === 1 && pagination.page > 1;

    const nextPage = shouldGoToPreviousPage
      ? pagination.page - 1
      : pagination.page;

    await fetchUrls({
      page: nextPage,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status,
    });
  };

  const handleStatusFilterChange = (value) => {
    const status = value === "ALL" ? "" : value;

    setFilters({
      status,
    });

    fetchUrls({
      page: 1,
      limit: pagination.limit,
      search: filters.search,
      status,
    });
  };

  const handlePrevious = () => {
    if (pagination.page <= 1 || isLoading) {
      return;
    }

    fetchUrls({
      page: pagination.page - 1,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status,
    });
  };

  const handleNext = () => {
    if (pagination.page >= pagination.totalPages || isLoading) {
      return;
    }

    fetchUrls({
      page: pagination.page + 1,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-foreground">
        <h1 className="text-2xl font-bold tracking-tight">URL Management</h1>

        <p className="text-sm text-muted-foreground">
          Manage and monitor all shortened URLs.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search URLs..."
            className="pl-9"
          />
        </div>

        {/* Status */}
        <Select
          value={filters.status || "ALL"}
          onValueChange={handleStatusFilterChange}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem
                key={option.value || "ALL"}
                value={option.value || "ALL"}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* URL Table */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead className="border-b bg-muted/40 text-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">URL</th>

                <th className="px-4 py-3 text-left font-medium">Owner</th>

                <th className="px-4 py-3 text-left font-medium">Status</th>

                <th className="px-4 py-3 text-left font-medium">Clicks</th>

                <th className="px-4 py-3 text-left font-medium">Created</th>

                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    Loading URLs...
                  </td>
                </tr>
              ) : urls.length === 0 ? (
                /* Empty */
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Link2 className="h-8 w-8 text-muted-foreground" />

                      <p className="font-medium">No URLs found</p>

                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                /* Data */
                urls.map((url) => (
                  <tr
                    key={url.url_id}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    {/* URL */}
                    <td className="max-w-[320px] px-4 py-4 text-foreground">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                          <Link2 className="h-4 w-4 text-primary" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium">{url.short_code}</p>

                          <p
                            className="truncate text-xs text-muted-foreground"
                            title={url.original_url}
                          >
                            {truncateUrl(url.original_url)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-4 text-foreground">
                      <div>
                        <p className="font-medium">
                          {url.users?.username || "Unknown"}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {url.users?.email || "-"}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          url.status,
                        )}`}
                      >
                        {url.status}
                      </span>
                    </td>

                    {/* Clicks */}
                    <td className="px-4 py-4 font-medium text-foreground">
                      {Number(url.total_clicks || 0).toLocaleString()}
                    </td>

                    {/* Created */}
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(url.created_at)}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 text-right text-foreground">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleViewDetails(url.url_id)}
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Details Dialog */}
        <AdminUrlDetailsDialog
          open={detailsOpen}
          onOpenChange={handleDetailsOpenChange}
          url={selectedUrl}
          isLoading={isDetailsLoading}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {!isLoading && urls.length > 0 && (
          <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages || 1} •{" "}
              {pagination.total} total URLs
            </p>

            <div className="flex gap-2 text-foreground">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={pagination.page <= 1 || isLoading}
              >
                Previous
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={pagination.page >= pagination.totalPages || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUrlsPage;
