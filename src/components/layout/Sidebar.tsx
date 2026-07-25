import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronsLeft, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { navItems } from "./nav-config";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth();
  const visibleItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className={cn(
          "relative flex h-full flex-col border-r border-border bg-surface/80 backdrop-blur-xl transition-[width] duration-300 ease-in-out",
          collapsed ? "w-[76px]" : "w-[264px]"
        )}
      >
        <div className={cn("flex h-16 items-center px-4", collapsed && "justify-center px-0")}>
          <Link to="/dashboard" className="focus-ring rounded-lg" aria-label="FlexCore, go to dashboard">
            <Logo iconOnly={collapsed} />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const link = (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow"
                      : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && !collapsed && (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.1} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>{link}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return link;
          })}
        </nav>

        <div className="border-t border-border p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Logout"
                  className="w-full text-muted-foreground hover:text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut className="h-[18px] w-[18px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={() => logout()}
            >
              <LogOut className="h-[18px] w-[18px]" />
              Logout
            </Button>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="focus-ring absolute -right-3 top-16 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-surface shadow-card transition-transform hover:scale-110 lg:flex"
        >
          <ChevronsLeft
            className={cn("h-3.5 w-3.5 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
      </aside>
    </TooltipProvider>
  );
}
