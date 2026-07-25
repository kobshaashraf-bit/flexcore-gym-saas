import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

export function RoleGuard({
  allow,
  children,
}: {
  allow: UserRole[];
  children: ReactNode;
}) {
  const { user } = useAuth();

  if (!user || !allow.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold">Restricted access</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your role doesn't have permission to view this page. Contact an administrator if you
            believe this is a mistake.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
