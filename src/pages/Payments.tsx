import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Banknote,
  Building2,
  CreditCard,
  Download,
  Plus,
  Search,
  Smartphone,
  Wallet,
  CircleCheck,
  CircleAlert,
  Clock3,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { allPayments, allMembers, membershipPlans } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { paymentSchema, type PaymentFormValues } from "@/schemas/moduleSchemas";
import type { Payment } from "@/types";

const statusVariant: Record<Payment["status"], "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  failed: "destructive",
};

const methodIcon: Record<Payment["method"], typeof CreditCard> = {
  card: CreditCard,
  cash: Banknote,
  bank: Building2,
  upi: Smartphone,
};

const statusOptions = ["all", "paid", "pending", "failed"] as const;
const methodOptions = ["all", "card", "cash", "bank", "upi"] as const;

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>(allPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("all");
  const [methodFilter, setMethodFilter] = useState<(typeof methodOptions)[number]>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { memberName: "", amount: 0, method: "card", plan: "" },
  });

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch = p.memberName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesMethod = methodFilter === "all" || p.method === methodFilter;
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const summary = useMemo(() => {
    const paid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
    const pending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
    const failed = payments.filter((p) => p.status === "failed").length;
    return { paid, pending, failed, count: payments.length };
  }, [payments]);

  const onSubmit = (values: PaymentFormValues) => {
    const newPayment: Payment = {
      id: `p-${Date.now()}`,
      memberName: values.memberName,
      amount: values.amount,
      method: values.method,
      plan: values.plan,
      status: "paid",
      date: new Date().toISOString().slice(0, 10),
    };
    setPayments((prev) => [newPayment, ...prev]);
    toast.success(`Payment of ${formatCurrency(values.amount)} recorded for ${values.memberName}`);
    reset();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Track transactions, invoices, and outstanding balances."
        actions={
          <>
            <Button variant="outline" className="gap-2" onClick={() => toast.success("Exporting payment records…")}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <Button className="gap-2" onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4" /> Record Payment
              </Button>
              <DialogContent size="md">
                <DialogHeader>
                  <DialogTitle>Record a payment</DialogTitle>
                  <DialogDescription>Log a transaction against a member's plan.</DialogDescription>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (USD)</Label>
                      <Input id="amount" type="number" step="1" placeholder="45" error={!!errors.amount} {...register("amount")} />
                      {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Method</Label>
                      <Controller
                        control={control}
                        name="method"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="method">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan</Label>
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
                                {p.name}
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
                      {isSubmitting ? "Recording…" : "Record payment"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <CircleCheck className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{formatCurrency(summary.paid)}</p>
          <p className="text-sm text-muted-foreground">Collected</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Clock3 className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{formatCurrency(summary.pending)}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
            <CircleAlert className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{summary.failed}</p>
          <p className="text-sm text-muted-foreground">Failed transactions</p>
        </Card>
        <Card className="surface-card p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <Wallet className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold">{summary.count}</p>
          <p className="text-sm text-muted-foreground">Total transactions</p>
        </Card>
      </div>

      <Card className="surface-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by member name…"
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <SelectTrigger className="w-[140px]">
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
            <Select value={methodFilter} onValueChange={(v) => setMethodFilter(v as typeof methodFilter)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                {methodOptions.map((m) => (
                  <SelectItem key={m} value={m} className="capitalize">
                    {m === "all" ? "All methods" : m}
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
                  <th className="px-3 py-3 font-medium">Plan</th>
                  <th className="px-3 py-3 font-medium">Method</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 text-right font-medium">Amount</th>
                  <th className="px-6 py-3 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment) => {
                  const Icon = methodIcon[payment.method];
                  return (
                    <tr key={payment.id} className="border-b border-border/60 last:border-0 hover:bg-surface-hover">
                      <td className="px-6 py-3 font-medium">{payment.memberName}</td>
                      <td className="px-3 py-3 text-muted-foreground">{payment.plan}</td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" />
                          <span className="capitalize">{payment.method}</span>
                        </span>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">{formatDate(payment.date)}</td>
                      <td className="px-3 py-3 text-right font-semibold">{formatCurrency(payment.amount)}</td>
                      <td className="px-6 py-3 text-right">
                        <Badge variant={statusVariant[payment.status]} className="capitalize">
                          {payment.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-sm text-muted-foreground">
                      No transactions match your filters.
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
