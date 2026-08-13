import { ArrowDown, ArrowUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
}) => {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Text */}
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>

            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}

            {trend !== undefined && trend !== null && (
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                {isPositive && (
                  <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />
                )}

                {isNegative && (
                  <ArrowDown className="h-3.5 w-3.5 text-red-600" />
                )}

                <span
                  className={
                    isPositive
                      ? "font-medium text-emerald-600"
                      : isNegative
                        ? "font-medium text-red-600"
                        : "font-medium text-muted-foreground"
                  }
                >
                  {Math.abs(trend)}%
                </span>

                {trendLabel && (
                  <span className="text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
