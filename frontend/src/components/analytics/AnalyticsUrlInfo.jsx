import { ExternalLink, Link as LinkIcon } from "lucide-react";

const AnalyticsUrlInfo = ({ url }) => {
  if (!url) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Analyzing URL</p>

          <div className="mt-1 flex items-center gap-2">
            <LinkIcon className="h-4 w-4 shrink-0 text-primary" />

            <h2 className="truncate font-semibold">
              {url.title || url.shortCode}
            </h2>
          </div>

          <p className="mt-1 truncate text-sm text-muted-foreground">
            {url.originalUrl}
          </p>
        </div>

        <a
          href={url.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Open URL
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default AnalyticsUrlInfo;
