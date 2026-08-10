import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UrlToolbar = ({
  search,
  status,
  sort,
  order,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onOrderChange,
  onReset,
}) => {
  const hasFilters =
    search || status || sort !== "createdAt" || order !== "desc";

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by URL, short code, or title..."
          className="pl-9 pr-9"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Status */}
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="EXPIRED">Expired</option>
          <option value="DELETED">Deleted</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="createdAt">Created date</option>
          <option value="clicks">Clicks</option>
          <option value="expiresAt">Expiration date</option>
        </select>

        {/* Order */}
        <select
          value={order}
          onChange={(event) => onOrderChange(event.target.value)}
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="desc">
            {sort === "clicks" ? "Highest first" : "Newest first"}
          </option>

          <option value="asc">
            {sort === "clicks" ? "Lowest first" : "Oldest first"}
          </option>
        </select>

        {/* Reset */}
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default UrlToolbar;
