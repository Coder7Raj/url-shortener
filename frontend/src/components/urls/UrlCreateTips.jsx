import { BarChart3, Clock3, Lightbulb, Link2 } from "lucide-react";

const tips = [
  {
    icon: Link2,
    title: "Keep URLs simple",
    description:
      "Use a short, memorable custom alias when sharing important links.",
  },
  {
    icon: Clock3,
    title: "Set an expiration",
    description:
      "Add an expiration date when a link should only remain active temporarily.",
  },
  {
    icon: BarChart3,
    title: "Track performance",
    description:
      "Monitor clicks and analytics to understand how your links perform.",
  },
];

const UrlCreateTips = () => {
  return (
    <div className="rounded-xl border bg-muted/30 p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h3 className="font-semibold">Quick Tips</h3>

          <p className="text-xs text-muted-foreground">
            Get more from your short URLs
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {tips.map((tip) => {
          const Icon = tip.icon;

          return (
            <div key={tip.title} className="flex gap-3">
              <div className="mt-0.5 shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>

              <div>
                <h4 className="text-sm font-medium">{tip.title}</h4>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {tip.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UrlCreateTips;
