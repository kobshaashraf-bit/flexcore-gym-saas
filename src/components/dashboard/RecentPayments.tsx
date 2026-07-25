import { Link } from "react-router-dom";
import { ArrowUpRight, Banknote, Building2, CreditCard, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { recentPayments } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
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

export function RecentPayments() {
  return (
    <Card className="surface-card">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest transactions across all members</CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
          <Link to="/payments">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-6 py-2.5 font-medium">Member</th>
                <th className="px-3 py-2.5 font-medium">Plan</th>
                <th className="px-3 py-2.5 font-medium">Method</th>
                <th className="px-3 py-2.5 font-medium">Date</th>
                <th className="px-3 py-2.5 text-right font-medium">Amount</th>
                <th className="px-6 py-2.5 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => {
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
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
