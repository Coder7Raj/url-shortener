import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCtaSection = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border bg-background px-6 py-16 text-center shadow-sm sm:px-12 sm:py-20">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            Ready when you are
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Turn long links into{" "}
            <span className="text-primary">something better.</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Create short, shareable links and understand how they perform — all
            from one simple dashboard.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:gap-3 hover:shadow-md"
            >
              Get started for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border bg-background px-7 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            No complicated setup. Just create an account and start shortening.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
