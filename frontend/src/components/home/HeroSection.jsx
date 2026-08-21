import {
  ArrowRight,
  BarChart3,
  Check,
  Link2,
  MousePointerClick,
  QrCode,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Simple links.
              <span className="text-muted-foreground">Powerful insights.</span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Turn long links into{" "}
              <span className="text-primary">powerful connections.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Shorten your URLs, create QR codes, and understand exactly how
              your links perform — all from one simple workspace.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6">
                <Link className="flex items-center" to="/register">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="h-12 px-6">
                <Link href="#features">Explore features</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                Easy to use
              </div>

              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                Detailed analytics
              </div>

              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                QR codes
              </div>
            </div>
          </div>

          {/* Right - Product preview */}
          <div className="relative">
            <Card className="overflow-hidden rounded-2xl border shadow-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between border-b bg-muted/30 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Link2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Link analytics</p>

                    <p className="text-xs text-muted-foreground">
                      your-link.com/abc123
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  Active
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                <Stat icon={MousePointerClick} label="Clicks" value="12.8K" />

                <Stat icon={TrendingUp} label="Growth" value="+18.4%" />

                <Stat icon={BarChart3} label="Visitors" value="8.4K" />

                <Stat icon={QrCode} label="QR scans" value="2.1K" />
              </div>

              {/* Chart */}
              <div className="px-5 pb-5">
                <div className="rounded-xl border bg-muted/20 p-4">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Click activity</p>

                      <p className="text-xs text-muted-foreground">
                        Last 30 days
                      </p>
                    </div>

                    <div className="text-sm font-semibold">12,842</div>
                  </div>

                  <div className="flex h-36 items-end gap-1">
                    {[
                      32, 42, 28, 48, 44, 62, 52, 70, 56, 68, 76, 63, 82, 72,
                      88, 65, 78, 91, 73, 84, 96, 80, 87, 94,
                    ].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-sm bg-primary/70 transition-all hover:bg-primary"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-5 hidden rounded-xl border bg-background p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">This month</p>

                  <p className="text-sm font-bold">+24.8% clicks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border bg-background p-3">
      <Icon className="mb-2 h-4 w-4 text-muted-foreground" />

      <p className="text-lg font-bold">{value}</p>

      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default HeroSection;
