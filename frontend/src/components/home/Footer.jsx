import { ArrowUp, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                U
              </span>
              URL<span className="text-primary">Shortener</span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Create short, memorable links and understand how they perform with
              powerful analytics — all in one place.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              >
                <GitBranch className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#analytics"
                  className="transition-colors hover:text-foreground"
                >
                  Analytics
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-foreground"
                >
                  How it works
                </a>
              </li>

              <li>
                <a
                  href="#security"
                  className="transition-colors hover:text-foreground"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">Account</h3>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-foreground"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-foreground"
                >
                  Create account
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} URLShortener. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">
              Built with React & Node.js
            </span>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
