import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useUrls from "../../hooks/useUrls.js";
import DeleteUrlDialog from "./DeleteUrlDialog.jsx";
import EditUrlDialog from "./EditUrlDialog.jsx";

const UrlList = ({ onUpdated, onDeleted }) => {
  const { urls, updateUrl, isLoading, deleteUrl, isDeleting } = useUrls();

  const [editingUrl, setEditingUrl] = useState(null);
  const [deletingUrl, setDeletingUrl] = useState(null);

  const handleUpdate = async (payload) => {
    if (!editingUrl) return;

    const result = await updateUrl(editingUrl.id, payload);

    if (result?.success) {
      setEditingUrl(null);
      onUpdated?.();
    }
  };

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL copied to clipboard");
    } catch {
      toast.error("Failed to copy short URL");
    }
  };

  const handleDelete = async () => {
    if (!deletingUrl) {
      return;
    }

    const result = await deleteUrl(deletingUrl.id);

    if (result?.success) {
      setDeletingUrl(null);
      onDeleted?.();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-sm text-muted-foreground">Loading URLs...</p>
        </CardContent>
      </Card>
    );
  }

  if (!urls.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="font-medium">No URLs found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first shortened URL above.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {urls.map((url) => (
            <div key={url.id} className="rounded-lg border p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {url.shortUrl}
                  </a>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {url.originalUrl}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{url.totalClicks || 0} clicks</span>

                    <span>•</span>

                    <span>{url.status}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(url.shortUrl)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>

                  <Button type="button" variant="outline" size="sm">
                    <a href={url.shortUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingUrl(url)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  {/* Delete */}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingUrl(url)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <EditUrlDialog
          url={editingUrl}
          open={Boolean(editingUrl)}
          onOpenChange={(open) => {
            if (!open) {
              setEditingUrl(null);
            }
          }}
          onSubmit={handleUpdate}
        />

        {/* Delete Dialog */}

        <DeleteUrlDialog
          url={deletingUrl}
          open={Boolean(deletingUrl)}
          onOpenChange={(open) => {
            if (!open) {
              setDeletingUrl(null);
            }
          }}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />
      </CardContent>
    </Card>
  );
};

export default UrlList;
