import {
  CalendarPlus,
  CheckCircle2,
  CreditCard,
  RefreshCcw,
  UserPlus,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { activityTimeline } from "@/data/mockData";
import { relativeTime, cn } from "@/lib/utils";
import type { ActivityEvent } from "@/types";

const iconMap: Record<ActivityEvent["type"], LucideIcon> = {
  checkin: CheckCircle2,
  payment: CreditCard,
  signup: UserPlus,
  renewal: RefreshCcw,
  class: CalendarPlus,
  cancellation: XCircle,
};

const colorMap: Record<ActivityEvent["type"], string> = {
  checkin: "bg-emerald-500/10 text-emerald-500",
  payment: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
  signup: "bg-blue-500/10 text-blue-500",
  renewal: "bg-violet-500/10 text-violet-500",
  class: "bg-amber-500/10 text-amber-500",
  cancellation: "bg-red-500/10 text-red-500",
};

export function ActivityTimeline() {
  return (
    <Card className="surface-card">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Everything happening across your gym, live</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 before:absolute before:bottom-1 before:left-[15px] before:top-1 before:w-px before:bg-border">
          {activityTimeline.map((event) => {
            const Icon = iconMap[event.type];
            return (
              <li key={event.id} className="relative flex gap-4 pl-0">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background",
                    colorMap[event.type]
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 pb-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{event.title}</p>
                    <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                      {relativeTime(event.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
