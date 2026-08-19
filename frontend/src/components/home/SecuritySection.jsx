import { Activity, LockKeyhole, Server, ShieldCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Protected by design",
    description:
      "Your URLs and analytics are protected by authenticated access and ownership checks.",
  },
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    description:
      "Access and refresh tokens keep your account sessions secure while keeping authentication smooth.",
  },
  {
    icon: Server,
    title: "Reliable infrastructure",
    description:
      "Built with a structured backend architecture designed to scale as your links and traffic grow.",
  },
  {
    icon: Activity,
    title: "Track what matters",
    description:
      "Monitor clicks, visitors, devices, browsers, locations and more from your analytics dashboard.",
  },
];

const SecuritySection = () => {
  return (
    <section id="security" className="border-t bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
            <ShieldCheck className="h-4 w-4" />
            Security & Reliability
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built to be{" "}
            <span className="text-primary">simple and dependable.</span>
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
            Shorten your links with confidence. Your account, links and
            analytics are protected by a backend designed with security and
            reliability in mind.
          </p>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom trust statement */}
        <div className="mx-auto mt-14 flex max-w-3xl items-center justify-center gap-3 text-center text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-border" />

          <span>Your links. Your data. Your control.</span>

          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
