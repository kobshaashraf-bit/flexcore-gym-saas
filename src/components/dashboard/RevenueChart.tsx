import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { revenueData } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  // Look values up by dataKey rather than array position — the payload
  // order follows series declaration order in the chart, not data order,
  // so indexing by [0]/[1] silently breaks if series are ever reordered.
  const revenue = payload.find((p) => p.dataKey === "revenue")?.value;
  const target = payload.find((p) => p.dataKey === "target")?.value;

  return (
    <div className="glass-strong rounded-xl border border-border px-3.5 py-2.5 shadow-glass">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold text-primary-600 dark:text-primary-400">
        {formatCurrency(Number(revenue ?? 0))}
      </p>
      <p className="text-[11px] text-muted-foreground">Target {formatCurrency(Number(target ?? 0))}</p>
    </div>
  );
}

export function RevenueChart() {
  const ytd = revenueData.reduce((sum, r) => sum + r.revenue, 0);

  return (
    <Card className="surface-card">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue vs. target — year to date</CardDescription>
        </div>
        <Badge variant="success">{formatCurrency(ytd)} YTD</Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(24 95% 53%)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(24 95% 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) => `$${v / 1000}k`}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--primary))", strokeDasharray: "4 4" }} />
              <Area
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="4 4"
                fill="transparent"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(24 95% 53%)"
                strokeWidth={2.5}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
