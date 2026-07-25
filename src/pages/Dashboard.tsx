import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { RecentMembers } from "@/components/dashboard/RecentMembers";
import { RecentPayments } from "@/components/dashboard/RecentPayments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingExpiry } from "@/components/dashboard/UpcomingExpiry";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { statSummaries } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const today = formatDate(new Date(), { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening at your gym today, {today}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            className="gap-2"
            onClick={() => toast.success("Exporting dashboard summary…")}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="default" className="gap-2" onClick={() => navigate("/clients")}>
            <Plus className="h-4 w-4" /> Add Member
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statSummaries.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AttendanceChart />
        </div>
        <UpcomingExpiry />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <RecentMembers />
          <RecentPayments />
        </div>
        <ActivityTimeline />
      </div>
    </div>
  );
}
