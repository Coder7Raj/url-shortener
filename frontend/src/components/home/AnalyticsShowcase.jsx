import {
  BarChart3,
  Globe2,
  Monitor,
  MousePointerClick,
  Smartphone,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Total clicks",
    value: "24,892",
    change: "+18.4%",
    icon: MousePointerClick,
  },
  {
    label: "Unique visitors",
    value: "16,430",
    change: "+12.7%",
    icon: TrendingUp,
  },
];

const countries = [
  { name: "United States", value: 68 },
  { name: "United Kingdom", value: 46 },
  { name: "Germany", value: 32 },
  { name: "Canada", value: 24 },
];

const AnalyticsShowcase = () => {
  return (
    <section id="analytics" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Analytics
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Don't just share links.
              <span className="text-primary"> Understand them.</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end sm:text-lg">
            Every click tells a story. Get the information you need to
            understand how your links perform and where your audience comes
            from.
          </p>
        </div>

        {/* Main showcase */}
        <div className="mt-16 overflow-hidden rounded-3xl border bg-card shadow-2xl">
          {/* Dashboard top bar */}
          <div className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-sm font-semibold">Analytics Overview</p>
              <p className="mt-1 text-xs text-muted-foreground">
                https://shortly.example/launch
              </p>
            </div>

            <div className="flex items-center gap-2">
              {["7 days", "30 days", "90 days"].map((range, index) => (
                <button
                  key={range}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    index === 1
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_0.8fr]">
            {/* Left side */}
            <div className="border-b p-5 sm:p-8 lg:border-b-0 lg:border-r">
              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border bg-background p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {stat.label}
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="mt-4 flex items-end gap-2">
                        <span className="text-2xl font-bold tracking-tight">
                          {stat.value}
                        </span>

                        <span className="mb-1 text-xs font-medium text-primary">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart */}
              <div className="mt-5 rounded-2xl border bg-background p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Clicks over time</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Performance during the selected period
                    </p>
                  </div>

                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="mt-8 flex h-56 items-end gap-2 sm:gap-3">
                  {[
                    32, 45, 38, 54, 48, 62, 57, 73, 64, 78, 69, 84, 76, 91, 82,
                    96,
                  ].map((height, index) => (
                    <div
                      key={index}
                      className="group relative flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-primary/25 transition-all duration-300 group-hover:bg-primary/60"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between text-[10px] text-muted-foreground">
                  <span>Aug 01</span>
                  <span>Aug 08</span>
                  <span>Aug 15</span>
                  <span>Aug 22</span>
                  <span>Aug 30</span>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="p-5 sm:p-8">
              <div>
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-primary" />

                  <p className="text-sm font-semibold">Top countries</p>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Where your audience is coming from
                </p>
              </div>

              <div className="mt-7 space-y-5">
                {countries.map((country) => (
                  <div key={country.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{country.name}</span>

                      <span className="text-muted-foreground">
                        {country.value}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${country.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Devices */}
              <div className="mt-10 border-t pt-7">
                <p className="text-sm font-semibold">Devices</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-4">
                    <Smartphone className="h-5 w-5 text-primary" />

                    <p className="mt-3 text-lg font-bold">64%</p>

                    <p className="text-xs text-muted-foreground">Mobile</p>
                  </div>

                  <div className="rounded-xl border p-4">
                    <Monitor className="h-5 w-5 text-primary" />

                    <p className="mt-3 text-lg font-bold">36%</p>

                    <p className="text-xs text-muted-foreground">Desktop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Track clicks, unique visitors, countries, cities, browsers, devices,
            operating systems, and referrers from one place.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <span>Built into your dashboard</span>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsShowcase;
