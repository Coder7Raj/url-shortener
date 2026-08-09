import { Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import useUrls from "../../hooks/useUrls.js";

const UrlList = () => {
  const { urls, isLoading } = useUrls();

  const handleCopy = async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL copied to clipboard");
    } catch {
      toast.error("Failed to copy short URL");
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
            <div key={url.id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* URL information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {url.shortUrl}
                    </a>

                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {url.originalUrl}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{url.totalClicks} clicks</span>

                    <span>•</span>

                    <span>{url.status}</span>

                    {url.expiresAt && (
                      <>
                        <span>•</span>

                        <span>
                          Expires {new Date(url.expiresAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(url.shortUrl)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlList;
