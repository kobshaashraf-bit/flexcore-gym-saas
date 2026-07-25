import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Users, Wallet, Activity, TrendingDown, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatSummary } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Wallet,
  Activity,
  TrendingDown,
};

export function StatCard({ stat, index = 0 }: { stat: StatSummary; index?: number }) {
  const Icon = iconMap[stat.icon] ?? Activity;
  // A stat is "favorable" when it moves in the direction that's good for the
  // business — normally "up", but inverted for metrics like churn rate where
  // a decrease is the desired outcome.
  const favorable = stat.lowerIsBetter ? stat.trend === "down" : stat.trend === "up";
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className="surface-card-interactive relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-500/10 blur-2xl" />
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/15 to-primary-600/10 text-primary-600 dark:text-primary-400">
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              favorable
                ? "bg-success/10 text-success dark:text-emerald-400"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {Math.abs(stat.delta)}%
          </span>
        </div>
        <p className="mt-4 font-display text-2xl font-bold tracking-tight">{stat.value}</p>
        <p className="text-sm text-muted-foreground">{stat.label}</p>
      </Card>
    </motion.div>
  );
}
