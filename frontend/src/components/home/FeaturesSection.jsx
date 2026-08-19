import {
  BarChart3,
  Globe2,
  Link2,
  QrCode,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Smart URL Shortening",
    description:
      "Turn long, complicated URLs into clean, memorable links that are easy to share anywhere.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Understand how your links perform with clicks, visitors, locations, devices, browsers, and referrers.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description:
      "Generate high-quality QR codes for your shortened URLs and download them whenever you need.",
  },
  {
    icon: Globe2,
    title: "Understand Your Audience",
    description:
      "See where your visitors come from and how they interact with your links across different devices.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Authentication, sessions, token rotation, validation, and ownership checks keep your account protected.",
  },
  {
    icon: Zap,
    title: "Built for Speed",
    description:
      "A lightweight experience designed to make creating, managing, and sharing links incredibly fast.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium">
            Everything you need
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            More than just a<span className="text-primary"> short link.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            A complete platform for creating, managing, analyzing, and sharing
            your links from one simple dashboard.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="relative mt-6 text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
