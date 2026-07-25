import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, MoreHorizontal, Pencil, Plus, Sparkles, Trash2, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { membershipPlans as initialPlans } from "@/data/mockData";
import { formatCurrency, cn } from "@/lib/utils";
import { planSchema, type PlanFormValues } from "@/schemas/moduleSchemas";
import type { MembershipPlan } from "@/types";

const colorRotation = [
  "from-slate-500 to-slate-700",
  "from-primary-500 to-primary-600",
  "from-amber-500 to-orange-600",
  "from-orange-600 to-red-600",
  "from-violet-500 to-fuchsia-600",
  "from-emerald-500 to-teal-600",
];

export default function MembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: { name: "", price: 0, duration: "Monthly", features: "" },
  });

  const totalActive = plans.reduce((sum, p) => sum + p.activeMembers, 0);
  const totalMRR = plans.reduce(
    (sum, p) => sum + p.activeMembers * (p.duration === "Annual" ? p.price / 12 : p.duration === "Quarterly" ? p.price / 3 : p.price),
    0
  );

  const onSubmit = (values: PlanFormValues) => {
    const newPlan: MembershipPlan = {
      id: `pl-${Date.now()}`,
      name: values.name,
      price: values.price,
      duration: values.duration,
      activeMembers: 0,
      color: colorRotation[plans.length % colorRotation.length],
      features: values.features.split(",").map((f) => f.trim()).filter(Boolean),
    };
    setPlans((prev) => [...prev, newPlan]);
    toast.success(`"${values.name}" plan created`);
    reset();
    setDialogOpen(false);
  };

  const removePlan = (id: string) => {
    const plan = plans.find((p) => p.id === id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
    if (plan) toast.success(`"${plan.name}" plan removed`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Membership Plans"
        description="Design pricing tiers and track plan performance."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Create Plan
            </Button>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Create a membership plan</DialogTitle>
                <DialogDescription>Define pricing and what's included.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="planName">Plan name</Label>
                  <Input id="planName" placeholder="Elite Annual" error={!!errors.name} {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input id="price" type="number" step="1" placeholder="45" error={!!errors.price} {...register("price")} />
                    {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Billing cycle</Label>
                    <Controller
                      control={control}
                      name="duration"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="duration">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                            <SelectItem value="Annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Textarea
                    id="features"
                    placeholder="Gym floor access, Group classes, 2 PT sessions"
                    error={!!errors.features}
                    {...register("features")}
                  />
                  {errors.features && <p className="text-xs text-destructive">{errors.features.message}</p>}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating…" : "Create plan"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Total Plans</p>
          <p className="font-display text-2xl font-bold">{plans.length}</p>
        </Card>
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Active Subscribers</p>
          <p className="font-display text-2xl font-bold">{totalActive.toLocaleString()}</p>
        </Card>
        <Card className="surface-card p-5">
          <p className="text-sm text-muted-foreground">Estimated MRR</p>
          <p className="font-display text-2xl font-bold">{formatCurrency(Math.round(totalMRR))}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card
              className={cn(
                "surface-card-interactive relative flex h-full flex-col overflow-hidden",
                plan.popular && "border-primary-400/70 ring-1 ring-primary-400/40"
              )}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4">
                  <Badge className="gap-1">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </Badge>
                </div>
              )}
              <div className={cn("h-1.5 w-full bg-gradient-to-r", plan.color)} />
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.duration} billing</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info(`Editing "${plan.name}" — full editor coming soon`)}>
                        <Pencil /> Edit plan
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => removePlan(plan.id)}
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      >
                        <Trash2 /> Delete plan
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-extrabold tracking-tight">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{plan.duration === "Monthly" ? "mo" : plan.duration === "Quarterly" ? "qtr" : "yr"}
                  </span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" /> {plan.activeMembers} members
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => toast.info(`Managing subscribers for "${plan.name}"`)}>
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
