import { useState } from "react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, FileSpreadsheet, FileText, TrendingUp, Users, Wallet, Star } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revenueData, attendanceData, membershipPlans, trainers } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

const PIE_COLORS = ["#64748b", "#f97316", "#f59e0b", "#dc2626", "#8b5cf6", "#10b981"];

export default function Reports() {
  const [range, setRange] = useState("12m");

  const planDistribution = membershipPlans.map((p) => ({ name: p.name, value: p.activeMembers }));
  const totalRevenue = revenueData.reduce((sum, r) => sum + r.revenue, 0);
  const avgAttendance = Math.round(
    attendanceData.reduce((sum, a) => sum + a.morning + a.evening, 0) / attendanceData.length
  );
  const topTrainer = [...trainers].sort((a, b) => b.rating - a.rating)[0];

  const handleExport = (format: string) => {
    toast.success(`Exporting report as ${format}…`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Revenue, attendance, and membership analytics at a glance."
        actions={
          <>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={() => handleExport("CSV")}>
              <FileSpreadsheet className="h-4 w-4" /> CSV
            </Button>
            <Button className="gap-2" onClick={() => handleExport("PDF")}>
              <FileText className="h-4 w-4" /> Export PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <Wallet className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-muted-foreground">Total revenue (YTD)</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Users className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">
            {membershipPlans.reduce((s, p) => s + p.activeMembers, 0).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total active members</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <TrendingUp className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{avgAttendance}</p>
          <p className="text-sm text-muted-foreground">Avg. daily check-ins</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Star className="h-5 w-5" />
          </div>
          <p className="font-display text-lg font-bold leading-tight">{topTrainer.name}</p>
          <p className="text-sm text-muted-foreground">Top-rated trainer ({topTrainer.rating}★)</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="surface-card xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Actual revenue vs. target across the year</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reportRevenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v / 1000}k`} width={44} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} formatter={(v: number) => formatCurrency(v)} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(24 95% 53%)" strokeWidth={2.5} fill="url(#reportRevenueFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Active members by plan</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                    {planDistribution.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {planDistribution.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    {p.name}
                  </span>
                  <span className="font-semibold text-foreground">{p.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>Attendance Report</CardTitle>
          <CardDescription>Morning vs. evening check-ins across the week</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={32} />
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} />
                <Bar dataKey="morning" fill="hsl(24 95% 65%)" radius={[6, 6, 0, 0]} maxBarSize={26} />
                <Bar dataKey="evening" fill="hsl(24 95% 45%)" radius={[6, 6, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="surface-card">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Trainer Performance</CardTitle>
            <CardDescription>Client load and satisfaction by coach</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => handleExport("CSV")}>
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Trainer</th>
                  <th className="px-3 py-3 font-medium">Specialty</th>
                  <th className="px-3 py-3 font-medium">Clients</th>
                  <th className="px-6 py-3 text-right font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[...trainers]
                  .sort((a, b) => b.clients - a.clients)
                  .map((t) => (
                    <tr key={t.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover">
                      <td className="px-6 py-3 font-medium">{t.name}</td>
                      <td className="px-3 py-3 text-muted-foreground">{t.specialty}</td>
                      <td className="px-3 py-3">{t.clients}</td>
                      <td className="px-6 py-3 text-right">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {t.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
