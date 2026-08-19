import { ArrowRight, BarChart3, Link2, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Create your link",
    description:
      "Paste your long URL, customize it if you want, and create a clean short link in seconds.",
  },
  {
    number: "02",
    icon: Share2,
    title: "Share anywhere",
    description:
      "Use your short link across social media, websites, messages, emails, campaigns, or QR codes.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analyze everything",
    description:
      "Track clicks and understand your audience with detailed analytics from one dashboard.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="border-y bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From long URL to
            <span className="text-primary"> useful insights.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            Three simple steps are all it takes to create, share, and understand
            your links.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-border lg:block" />

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="mt-6 text-xs font-bold tracking-[0.2em] text-primary">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-5 top-8 hidden h-5 w-5 text-muted-foreground/50 lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Product visual */}
        <div className="mt-24 overflow-hidden rounded-3xl border bg-background shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Built for clarity
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                Everything important,
                <br />
                in one dashboard.
              </h3>

              <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
                Manage your URLs, monitor performance, generate QR codes, review
                sessions, and understand your audience without jumping between
                different tools.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["URL Management", "Analytics", "QR Codes", "Sessions"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Right — dashboard mockup */}
            <div className="relative min-h-90 overflow-hidden bg-muted/40 p-6 sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative h-full rounded-2xl border bg-background p-4 shadow-xl sm:p-6">
                {/* Fake browser/header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="h-3 w-24 rounded-full bg-muted" />
                    <div className="mt-2 h-2 w-16 rounded-full bg-muted/60" />
                  </div>

                  <div className="h-8 w-8 rounded-full bg-primary/10" />
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["Total Clicks", "12.8K"],
                    ["Visitors", "8.4K"],
                    ["Growth", "+24%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border bg-muted/20 p-3"
                    >
                      <p className="text-[10px] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="mt-4 rounded-xl border bg-muted/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Clicks overview</p>

                    <span className="text-[10px] text-muted-foreground">
                      Last 30 days
                    </span>
                  </div>

                  <div className="mt-6 flex h-28 items-end gap-2">
                    {[35, 48, 42, 65, 55, 72, 61, 82, 68, 90, 76, 96].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-sm bg-primary/30 transition-all duration-300 hover:bg-primary/60"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
