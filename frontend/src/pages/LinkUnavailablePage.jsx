import {
  AlertTriangle,
  ArrowLeft,
  Clock3,
  Link2Off,
  ShieldX,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ERROR_CONFIG = {
  "not-found": {
    icon: Link2Off,
    title: "Link not found",
    message:
      "The short link you're trying to access doesn't exist or may have been removed.",
  },

  inactive: {
    icon: ShieldX,
    title: "Link unavailable",
    message:
      "This short link has been disabled by its owner and is currently unavailable.",
  },

  expired: {
    icon: Clock3,
    title: "Link expired",
    message: "This short link has expired and is no longer available.",
  },
};

const LinkUnavailablePage = () => {
  const [searchParams] = useSearchParams();

  const reason = searchParams.get("reason") || "not-found";

  const config = ERROR_CONFIG[reason] || ERROR_CONFIG["not-found"];

  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {config.title}
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {config.message}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link className="flex items-center" to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to homepage
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link className="flex items-center" to="/dashboard">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Go to dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkUnavailablePage;
