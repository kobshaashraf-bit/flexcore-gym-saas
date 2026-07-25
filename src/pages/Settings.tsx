import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Building2,
  CreditCard,
  Users,
  Bell,
  Plug,
  Check,
  MoreHorizontal,
  Mail,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staffMembers as initialStaff, membershipPlans } from "@/data/mockData";
import { getInitials, formatDate } from "@/lib/utils";
import { gymProfileSchema, type GymProfileFormValues } from "@/schemas/moduleSchemas";
import { useAuth } from "@/hooks/useAuth";
import type { StaffMember, UserRole } from "@/types";

const initialIntegrations = [
  { name: "Stripe", description: "Accept card payments and automate billing.", connected: true },
  { name: "Google Calendar", description: "Sync classes and trainer schedules.", connected: true },
  { name: "Mailchimp", description: "Send renewal reminders and campaigns.", connected: false },
  { name: "Zapier", description: "Automate workflows across your tools.", connected: false },
];

const notificationPrefs = [
  { key: "expiry", label: "Membership expiry reminders", description: "Get notified before a membership lapses.", defaultOn: true },
  { key: "payments", label: "Payment activity", description: "Alerts for successful, pending, and failed payments.", defaultOn: true },
  { key: "classes", label: "Class capacity", description: "Notify when a class nears or hits capacity.", defaultOn: true },
  { key: "staff", label: "Staff activity", description: "Updates when staff members are added or changed.", defaultOn: false },
];

export default function Settings() {
  const { user } = useAuth();
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationPrefs.map((p) => [p.key, p.defaultOn]))
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GymProfileFormValues>({
    resolver: zodResolver(gymProfileSchema),
    defaultValues: {
      gymName: user?.gymName ?? "Iron Peak Fitness",
      address: "221B Gulberg Boulevard, Lahore, Pakistan",
      phone: "+92 300 1234567",
      email: "hello@ironpeak.gym",
      timezone: "Asia/Karachi",
    },
  });

  const onSubmitGymProfile = () => {
    toast.success("Gym profile updated");
  };

  const updateStaffRole = (id: string, role: UserRole) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, role } : s)));
    toast.success("Role updated");
  };

  const removeStaff = (id: string) => {
    const member = staff.find((s) => s.id === id);
    setStaff((prev) => prev.filter((s) => s.id !== id));
    if (member) toast.success(`${member.name} was removed from staff`);
  };

  const toggleIntegration = (name: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.name === name ? { ...i, connected: !i.connected } : i))
    );
    const target = integrations.find((i) => i.name === name);
    toast.success(target?.connected ? `${name} disconnected` : `${name} connected`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your gym profile, billing, staff, and integrations." />

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general" className="gap-1.5">
            <Building2 className="h-3.5 w-3.5" /> General
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Billing
          </TabsTrigger>
          <TabsTrigger value="staff" className="gap-1.5">
            <Users className="h-3.5 w-3.5" /> Staff &amp; Roles
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1.5">
            <Plug className="h-3.5 w-3.5" /> Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle>Gym Profile</CardTitle>
              <CardDescription>This information appears on receipts and member communications.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmitGymProfile)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gymName">Gym name</Label>
                    <Input id="gymName" error={!!errors.gymName} {...register("gymName")} />
                    {errors.gymName && <p className="text-xs text-destructive">{errors.gymName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="settingsEmail">Contact email</Label>
                    <Input id="settingsEmail" type="email" error={!!errors.email} {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" error={!!errors.address} {...register("address")} />
                  {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="settingsPhone">Phone</Label>
                    <Input id="settingsPhone" error={!!errors.phone} {...register("phone")} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" error={!!errors.timezone} {...register("timezone")} />
                    {errors.timezone && <p className="text-xs text-destructive">{errors.timezone.message}</p>}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="surface-card xl:col-span-2">
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current FlexCore plan and usage.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-2xl border border-primary-300/50 bg-primary-500/5 p-5">
                  <div>
                    <p className="flex items-center gap-2 font-display font-bold">
                      FlexCore Growth <Badge variant="success">Active</Badge>
                    </p>
                    <p className="text-sm text-muted-foreground">Billed annually — renews Jan 1, 2027</p>
                  </div>
                  <p className="font-display text-2xl font-bold">$149<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
                <Separator className="my-5" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {membershipPlans.slice(0, 3).map((p) => (
                    <div key={p.id} className="rounded-xl border border-border p-4">
                      <p className="text-xs text-muted-foreground">{p.name}</p>
                      <p className="font-display text-lg font-bold">{p.activeMembers}</p>
                      <p className="text-xs text-muted-foreground">active members</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="surface-card">
              <CardHeader>
                <CardTitle>Payment method</CardTitle>
                <CardDescription>Used for your monthly subscription.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-border p-3.5">
                  <div className="flex h-9 w-12 items-center justify-center rounded-md bg-gradient-to-br from-slate-700 to-slate-900 text-[10px] font-bold text-white">
                    VISA
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 08/28</p>
                  </div>
                  <Badge variant="secondary">Default</Badge>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Payment method editor — coming soon")}>
                  Update payment method
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff">
          <Card className="surface-card">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Staff &amp; Roles</CardTitle>
                <CardDescription>Manage access levels for your team.</CardDescription>
              </div>
              <Button size="sm" className="gap-2" onClick={() => toast.success("Invite link sent")}>
                <Mail className="h-3.5 w-3.5" /> Invite staff
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-6 py-3 font-medium">Staff member</th>
                      <th className="px-3 py-3 font-medium">Role</th>
                      <th className="px-3 py-3 font-medium">Status</th>
                      <th className="px-3 py-3 font-medium">Joined</th>
                      <th className="px-6 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((s) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{s.name}</p>
                              <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <Select value={s.role} onValueChange={(v) => updateStaffRole(s.id, v as UserRole)}>
                            <SelectTrigger className="w-[150px] capitalize">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="receptionist">Receptionist</SelectItem>
                              <SelectItem value="trainer">Trainer</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-3 py-3">
                          <Badge variant={s.status === "active" ? "success" : s.status === "invited" ? "warning" : "destructive"} className="capitalize">
                            {s.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{formatDate(s.joinDate)}</td>
                        <td className="px-6 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info(`Viewing permissions for ${s.name}`)}>
                                <Shield /> View permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => removeStaff(s.id)}
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              >
                                Remove access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what your team gets notified about.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {notificationPrefs.map((pref) => (
                <div key={pref.key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.description}</p>
                  </div>
                  <Switch
                    checked={prefs[pref.key]}
                    onCheckedChange={(checked) => setPrefs((prev) => ({ ...prev, [pref.key]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {integrations.map((integration) => (
              <Card key={integration.name} className="surface-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display font-bold">{integration.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{integration.description}</p>
                  </div>
                  {integration.connected ? (
                    <Badge variant="success" className="gap-1 shrink-0">
                      <Check className="h-3 w-3" /> Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="shrink-0">
                      Not connected
                    </Badge>
                  )}
                </div>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  className="mt-4 w-full"
                  onClick={() =>
                    integration.connected
                      ? toast.info(`Managing ${integration.name} settings`)
                      : toggleIntegration(integration.name)
                  }
                >
                  {integration.connected ? "Manage" : "Connect"}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
