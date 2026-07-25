import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ComingSoon({
  title,
  description,
  icon: Icon = Construction,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border bg-surface/50 py-28 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/15 to-primary-600/10 text-primary-600 dark:text-primary-400">
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description ?? "This module is on the roadmap and will be built in the next milestone."}
        </p>
      </div>
    </motion.div>
  );
}
