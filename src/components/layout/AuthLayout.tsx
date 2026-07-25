import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BarChart3, CalendarCheck2, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

const highlights = [
  {
    icon: BarChart3,
    title: "Real-time revenue insights",
    description: "Track payments, plans, and growth trends in one glance.",
  },
  {
    icon: CalendarCheck2,
    title: "Effortless scheduling",
    description: "Classes, trainers, and attendance stay perfectly in sync.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description: "Admins, receptionists, and trainers each see what matters.",
  },
];

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Brand panel */}
      <div className="relative hidden w-[46%] overflow-hidden bg-secondary lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.25),transparent_45%)]" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative z-10 flex items-center justify-between p-10">
          <Logo className="[&_span]:text-white" />
        </div>

        <div className="relative z-10 px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-primary-300">
              <Sparkles className="h-3 w-3" /> Built for modern fitness businesses
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white">
              Run your gym like a <span className="text-gradient-brand">premium</span> operation.
            </h1>
            <p className="mt-4 max-w-md text-sm text-white/60">
              FlexCore brings memberships, payments, attendance, and staff into a single,
              beautifully designed command center.
            </p>
          </motion.div>

          <div className="mt-10 space-y-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
                  <h.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{h.title}</p>
                  <p className="text-xs text-white/50">{h.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-10 text-xs text-white/40">
          © {new Date().getFullYear()} FlexCore. Crafted for gyms that mean business.
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col lg:w-[54%]">
        <div className="flex items-center justify-between p-6 lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeSwitcher />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
