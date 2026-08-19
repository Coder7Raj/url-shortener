import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Link2,
  MoreHorizontal,
  QrCode,
  Sparkles,
} from "lucide-react";

const QrShowcase = () => {
  return (
    <section className="border-y bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Create & share
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            One link.
            <span className="text-primary"> Endless possibilities.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            Manage your links from one place and turn any shortened URL into a
            beautiful, shareable QR code.
          </p>
        </div>

        {/* Showcase */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* URL management */}
          <div className="overflow-hidden rounded-3xl border bg-background shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <p className="text-sm font-semibold">My URLs</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Manage all your links
                </p>
              </div>

              <button className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
                + Create URL
              </button>
            </div>

            {/* URL item */}
            <div className="p-6">
              <div className="rounded-2xl border p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Link2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold">
                          Product Launch
                        </h3>

                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          Active
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        example.com/products/new-launch
                      </p>
                    </div>
                  </div>

                  <button className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Short URL */}
                <div className="mt-6 rounded-xl bg-muted/50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-medium">
                      shortly.app/launch
                    </span>

                    <button className="flex shrink-0 items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium">
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 divide-x rounded-xl border">
                  <div className="p-3 text-center">
                    <p className="text-sm font-bold">12.8K</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Clicks
                    </p>
                  </div>

                  <div className="p-3 text-center">
                    <p className="text-sm font-bold">8.4K</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Visitors
                    </p>
                  </div>

                  <div className="p-3 text-center">
                    <p className="text-sm font-bold">+24%</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Growth
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                  </button>

                  <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
                    <QrCode className="h-3.5 w-3.5" />
                    QR Code
                  </button>

                  <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
                    Analytics
                  </button>
                </div>
              </div>

              {/* Additional URL rows */}
              <div className="mt-4 space-y-3">
                {["Portfolio", "Documentation", "GitHub Repository"].map(
                  (title) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-xl border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted" />

                        <div>
                          <p className="text-xs font-medium">{title}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            shortly.app/
                            {title.toLowerCase().replaceAll(" ", "-")}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-muted-foreground">
                        Active
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* QR card */}
          <div className="relative overflow-hidden rounded-3xl border bg-background shadow-xl">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex h-full flex-col p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <QrCode className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-semibold">QR Code</span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    Share your short link offline,
                    <br />
                    anywhere and anytime.
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-[10px] font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Ready
                </div>
              </div>

              {/* QR visual */}
              <div className="mx-auto mt-10 flex w-full max-w-65 items-center justify-center rounded-3xl border bg-white p-6 shadow-lg">
                <div className="grid aspect-square w-full grid-cols-9 grid-rows-9 gap-1">
                  {[
                    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0,
                    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
                    0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
                    0,
                  ].map((cell, index) => (
                    <div
                      key={index}
                      className={cell ? "rounded-[1px] bg-black" : ""}
                    />
                  ))}
                </div>
              </div>

              {/* URL */}
              <div className="mt-8 rounded-xl border bg-muted/30 p-4">
                <p className="text-[10px] text-muted-foreground">Linked URL</p>

                <p className="mt-1 truncate text-sm font-medium">
                  shortly.app/launch
                </p>
              </div>

              {/* Actions */}
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                <Download className="h-4 w-4" />
                Download QR Code
              </button>

              {/* Features */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "High resolution",
                  "Instant generation",
                  "Cloud stored",
                  "Easy sharing",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Small badge */}
              <div className="mt-auto pt-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Built directly into your URL workflow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrShowcase;
