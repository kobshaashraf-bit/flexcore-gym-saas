import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus, MapPin, Clock, Users, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { classSchedule as initialClasses, trainers } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { classSchema, type ClassFormValues } from "@/schemas/moduleSchemas";
import type { ClassSession } from "@/types";

const days: ClassSession["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayLabels: Record<ClassSession["day"], string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};

const categoryColor: Record<ClassSession["category"], string> = {
  Yoga: "bg-violet-500/10 text-violet-500",
  HIIT: "bg-red-500/10 text-red-500",
  Strength: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
  Cardio: "bg-blue-500/10 text-blue-500",
  Cycling: "bg-amber-500/10 text-amber-500",
  Pilates: "bg-emerald-500/10 text-emerald-500",
};

export default function Classes() {
  const [classes, setClasses] = useState<ClassSession[]>(initialClasses);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      trainer: "",
      day: "Mon",
      startTime: "",
      endTime: "",
      capacity: 20,
      category: "HIIT",
      location: "",
    },
  });

  const grouped = useMemo(() => {
    return days.map((day) => ({
      day,
      sessions: classes.filter((c) => c.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }));
  }, [classes]);

  const onSubmit = (values: ClassFormValues) => {
    const newClass: ClassSession = {
      id: `c-${Date.now()}`,
      ...values,
      enrolled: 0,
    };
    setClasses((prev) => [...prev, newClass]);
    toast.success(`"${values.name}" scheduled for ${dayLabels[values.day]}`);
    reset();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes"
        description="Plan the weekly class schedule and monitor capacity."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Schedule Class
            </Button>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Schedule a class</DialogTitle>
                <DialogDescription>Add a new session to the weekly calendar.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="className">Class name</Label>
                    <Input id="className" placeholder="Sunrise HIIT" error={!!errors.name} {...register("name")} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trainer">Trainer</Label>
                    <Controller
                      control={control}
                      name="trainer"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="trainer">
                            <SelectValue placeholder="Select a trainer" />
                          </SelectTrigger>
                          <SelectContent>
                            {trainers.map((t) => (
                              <SelectItem key={t.id} value={t.name}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.trainer && <p className="text-xs text-destructive">{errors.trainer.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <Controller
                      control={control}
                      name="day"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="day">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {days.map((d) => (
                              <SelectItem key={d} value={d}>
                                {dayLabels[d]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start</Label>
                    <Input id="startTime" type="time" error={!!errors.startTime} {...register("startTime")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End</Label>
                    <Input id="endTime" type="time" error={!!errors.endTime} {...register("endTime")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="20" error={!!errors.capacity} {...register("capacity")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(["Yoga", "HIIT", "Strength", "Cardio", "Cycling", "Pilates"] as const).map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Studio A" error={!!errors.location} {...register("location")} />
                    {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Scheduling…" : "Schedule class"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="space-y-6">
        {grouped.map(({ day, sessions }, dayIdx) => (
          <div key={day}>
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {dayLabels[day]}
              </h2>
              <span className="text-xs text-muted-foreground">({sessions.length} classes)</span>
            </div>
            {sessions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No classes scheduled
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sessions.map((session, i) => {
                  const pct = Math.round((session.enrolled / session.capacity) * 100);
                  const full = session.enrolled >= session.capacity;
                  return (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (dayIdx * 0.02) + i * 0.03 }}
                    >
                      <Card className="surface-card-interactive">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-display font-bold">{session.name}</p>
                              <p className="text-xs text-muted-foreground">{session.trainer}</p>
                            </div>
                            <Badge className={cn("shrink-0", categoryColor[session.category])} variant="default">
                              {session.category}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {session.startTime} – {session.endTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" /> {session.location}
                            </span>
                          </div>
                          <div className="mt-4">
                            <div className="mb-1.5 flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-3.5 w-3.5" /> {session.enrolled}/{session.capacity} enrolled
                              </span>
                              <span className={cn("font-semibold", full ? "text-destructive" : "text-muted-foreground")}>
                                {full ? "Full" : `${pct}%`}
                              </span>
                            </div>
                            <Progress value={pct} indicatorClassName={cn(full && "from-destructive to-destructive")} />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
