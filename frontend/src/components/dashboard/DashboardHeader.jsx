import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes.js";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here's an overview of your shortened URLs and their performance.
        </p>
      </div>

      <Button>
        <Link className="flex items-center" to={ROUTES.URLS}>
          <Plus className="mr-2 h-4 w-4" />
          Create URL
        </Link>
      </Button>
    </div>
  );
};

export default DashboardHeader;
