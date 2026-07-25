import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { navItems } from "./nav-config";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const current = navItems.find((item) => pathname.startsWith(item.path));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {current && (
        <>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <span
            className={cn(
              "font-medium text-foreground",
              pathname === "/dashboard" && "text-muted-foreground"
            )}
          >
            {current.label}
          </span>
        </>
      )}
    </nav>
  );
}
