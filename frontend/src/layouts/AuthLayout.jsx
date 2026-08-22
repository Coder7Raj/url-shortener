import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = ({ title, description, children, footer }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center text-foreground">
          <Link to="/" className="text-4xl font-bold tracking-tight">
            Shortly
          </Link>

          <p className="mt-2 text-muted-foreground">Smart URL Management</p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="pt-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">{title}</h1>

              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>

            {children}

            {footer && <div className="mt-8 text-center text-sm">{footer}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
