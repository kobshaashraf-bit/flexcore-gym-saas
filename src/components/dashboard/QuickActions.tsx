import { Link } from "react-router-dom";
import { UserPlus, CreditCard, CalendarPlus, FileBarChart, QrCode } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

interface QuickAction {
  label: string;
  icon: typeof UserPlus;
  to: string;
  color: string;
  /** Restrict to specific roles — mirrors the RoleGuard on the destination route. */
  roles?: UserRole[];
}

const actions: QuickAction[] = [
  { label: "Add Member", icon: UserPlus, to: "/clients", color: "from-primary-500 to-primary-600" },
  { label: "Record Payment", icon: CreditCard, to: "/payments", color: "from-orange-400 to-orange-600", roles: ["admin", "receptionist"] },
  { label: "Schedule Class", icon: CalendarPlus, to: "/classes", color: "from-amber-400 to-amber-600" },
  { label: "Check-in (QR)", icon: QrCode, to: "/attendance", color: "from-orange-500 to-red-500" },
  { label: "Generate Report", icon: FileBarChart, to: "/reports", color: "from-secondary to-secondary", roles: ["admin"] },
];

export function QuickActions() {
  const { user } = useAuth();
  const visibleActions = actions.filter((a) => !a.roles || (user && a.roles.includes(user.role)));

  return (
    <Card className="surface-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump straight into common tasks</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {visibleActions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300/60 hover:shadow-card dark:hover:border-primary-500/30 lg:flex-row lg:items-center"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition-transform group-hover:scale-105 ${action.color}`}
            >
              <action.icon className="h-[18px] w-[18px]" />
            </div>
            <span className="text-sm font-semibold">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
