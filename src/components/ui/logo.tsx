import { Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 shadow-glow">
        <Dumbbell className="h-[18px] w-[18px] text-white" strokeWidth={2.5} />
      </div>
      {!iconOnly && (
        <span className="font-display text-lg font-extrabold tracking-tight">
          Flex<span className="text-gradient-brand">Core</span>
        </span>
      )}
    </div>
  );
}
