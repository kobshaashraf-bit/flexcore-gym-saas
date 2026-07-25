import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Snowflake,
  Trash2,
  Eye,
  Mail,
  Phone,
  Users,
  UserCheck,
  Clock,
  ShieldOff,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { allMembers, membershipPlans } from "@/data/mockData";
import { getInitials, formatDate, cn } from "@/lib/utils";
import { memberSchema, type MemberFormValues } from "@/schemas/moduleSchemas";
import type { Member } from "@/types";

const statusVariant: Record<Member["status"], "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  expiring: "warning",
  expired: "destructive",
  frozen: "secondary",
};

const statusOptions = ["all", "active", "expiring", "expired", "frozen"] as const;

export default function Clients() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [members, setMembers] = useState<Member[]>(allMembers);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: { name: "", email: "", phone: "", plan: "" },
  });

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || m.status === statusFilter;
      const matchesPlan = planFilter === "all" || m.plan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [members, search, statusFilter, planFilter]);

  const summary = useMemo(
    () => ({
      total: members.length,
      active: members.filter((m) => m.status === "active").length,
      expiring: members.filter((m) => m.status === "expiring").length,
      frozen: members.filter((m) => m.status === "frozen").length,
    }),
    [members]
  );

  const onSubmit = (values: MemberFormValues) => {
    const newMember: Member = {
      id: `m-${Date.now()}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      plan: values.plan,
      status: "active",
      joinDate: new Date().toISOString().slice(0, 10),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    };
    setMembers((prev) => [newMember, ...prev]);
    toast.success(`${values.name} was added as a new member`);
    reset();
    setDialogOpen(false);
  };

  const toggleFreeze = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "frozen" ? "active" : "frozen" } : m
      )
    );
  };

  const removeMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (member) toast.success(`${member.name} was removed from your directory`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage member profiles, plans, and membership status."
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="gap-2" onClick={() => setDialogOpen(true)}>
              <UserPlus className="h-4 w-4" /> Add Member
            </Button>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Add a new member</DialogTitle>
                <DialogDescription>Create a member profile and assign a plan.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Jordan Lee" error={!!errors.name} {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jordan@mail.com" error={!!errors.email} {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+92 300 1234567" error={!!errors.phone} {...register("phone")} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Membership plan</Label>
                  <Controller
                    control={control}
                    name="plan"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="plan">
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {membershipPlans.map((p) => (
                            <SelectItem key={p.id} value={p.name}>
                              {p.name} — ${p.price}/{p.duration.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.plan && <p className="text-xs text-destructive">{errors.plan.message}</p>}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding…" : "Add member"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Members", value: summary.total, icon: Users, color: "text-primary-600 dark:text-primary-400 bg-primary-500/10" },
          { label: "Active", value: summary.active, icon: UserCheck, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Expiring Soon", value: summary.expiring, icon: Clock, color: "text-amber-500 bg-amber-500/10" },
          { label: "Frozen", value: summary.frozen, icon: ShieldOff, color: "text-slate-500 bg-slate-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="surface-card p-5">
              <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl", s.color)}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="surface-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email…"
              className="pl-10"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                setSearchParams(value ? { q: value } : {}, { replace: true });
              }}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s === "all" ? "All statuses" : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                {membershipPlans.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Member</th>
                  <th className="px-3 py-3 font-medium">Contact</th>
                  <th className="px-3 py-3 font-medium">Plan</th>
                  <th className="px-3 py-3 font-medium">Trainer</th>
                  <th className="px-3 py-3 font-medium">Expiry</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((member) => (
                  <tr key={member.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{member.name}</p>
                          <p className="truncate text-xs text-muted-foreground">Joined {formatDate(member.joinDate)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Mail className="h-3 w-3" /> {member.email}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs">
                        <Phone className="h-3 w-3" /> {member.phone}
                      </div>
                    </td>
                    <td className="px-3 py-3">{member.plan}</td>
                    <td className="px-3 py-3 text-muted-foreground">{member.trainer ?? "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{formatDate(member.expiryDate)}</td>
                    <td className="px-3 py-3">
                      <Badge variant={statusVariant[member.status]} className="capitalize">
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Opening ${member.name}'s profile…`)}>
                            <Eye /> View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleFreeze(member.id)}>
                            <Snowflake /> {member.status === "frozen" ? "Unfreeze" : "Freeze"} membership
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => removeMember(member.id)}
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 /> Remove member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-sm text-muted-foreground">
                      No members match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
