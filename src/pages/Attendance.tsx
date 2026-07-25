import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  QrCode,
  Fingerprint,
  Pencil,
  Timer,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { attendanceRecords, attendanceData, allMembers } from "@/data/mockData";
import { getInitials, cn } from "@/lib/utils";
import type { AttendanceRecord } from "@/types";

const checkinSchema = z.object({
  memberName: z.string().min(1, "Select a member"),
  activity: z.string().min(2, "Enter an activity"),
});
type CheckinFormValues = z.infer<typeof checkinSchema>;

const methodIcon: Record<AttendanceRecord["method"], typeof QrCode> = {
  QR: QrCode,
  Manual: Pencil,
  Biometric: Fingerprint,
};

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function durationLabel(checkIn: string, checkOut: string | null) {
  if (!checkOut) return "In progress";
  const mins = Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 60000);
  return `${mins} min`;
}

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(attendanceRecords);
  const [range, setRange] = useState<"today" | "week" | "month">("week");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckinFormValues>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { memberName: "", activity: "" },
  });

  const filteredRecords = useMemo(() => {
    if (range === "today") return records.filter((r) => r.date === "2026-07-23");
    return records;
  }, [records, range]);

  const stats = useMemo(() => {
    const inProgress = records.filter((r) => !r.checkOut).length;
    const totalToday = records.filter((r) => r.date === "2026-07-23").length;
    const avgDuration = 58;
    return { inProgress, totalToday, avgDuration };
  }, [records]);

  const onSubmit = (values: CheckinFormValues) => {
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      memberName: values.memberName,
      activity: values.activity,
      checkIn: new Date().toISOString(),
      checkOut: null,
      date: new Date().toISOString().slice(0, 10),
      method: "Manual",
    };
    setRecords((prev) => [newRecord, ...prev]);
    toast.success(`${values.memberName} checked in manually`);
    reset();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Track check-ins, session duration, and daily gym traffic."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <QrCode className="h-4 w-4" /> Manual Check-in
            </Button>
            <DialogContent size="sm">
              <DialogHeader>
                <DialogTitle>Manual check-in</DialogTitle>
                <DialogDescription>Record an attendance entry for a member.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="memberName">Member</Label>
                  <Controller
                    control={control}
                    name="memberName"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="memberName">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                        <SelectContent>
                          {allMembers.map((m) => (
                            <SelectItem key={m.id} value={m.name}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.memberName && <p className="text-xs text-destructive">{errors.memberName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity</Label>
                  <Input id="activity" placeholder="Free Weights" error={!!errors.activity} {...register("activity")} />
                  {errors.activity && <p className="text-xs text-destructive">{errors.activity.message}</p>}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Checking in…" : "Check in"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <Activity className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{stats.totalToday}</p>
          <p className="text-sm text-muted-foreground">Check-ins today</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <Users className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{stats.inProgress}</p>
          <p className="text-sm text-muted-foreground">Currently on floor</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Timer className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{stats.avgDuration} min</p>
          <p className="text-sm text-muted-foreground">Average session</p>
        </Card>
      </div>

      <Card className="surface-card">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Weekly Traffic
            </CardTitle>
            <CardDescription>Morning vs. evening check-ins</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[240px] w-full">
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
        <div className="flex items-center justify-between border-b border-border p-4">
          <CardTitle className="text-base">Check-in Log</CardTitle>
          <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Member</th>
                  <th className="px-3 py-3 font-medium">Activity</th>
                  <th className="px-3 py-3 font-medium">Check-in</th>
                  <th className="px-3 py-3 font-medium">Check-out</th>
                  <th className="px-3 py-3 font-medium">Duration</th>
                  <th className="px-6 py-3 text-right font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => {
                  const Icon = methodIcon[record.method];
                  return (
                    <tr key={record.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{getInitials(record.memberName)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{record.memberName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{record.activity}</td>
                      <td className="px-3 py-3 text-muted-foreground">{formatTime(record.checkIn)}</td>
                      <td className="px-3 py-3 text-muted-foreground">{formatTime(record.checkOut)}</td>
                      <td className="px-3 py-3">
                        <Badge variant={record.checkOut ? "secondary" : "success"}>
                          {durationLabel(record.checkIn, record.checkOut)}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground")}>
                          <Icon className="h-3.5 w-3.5" /> {record.method}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
