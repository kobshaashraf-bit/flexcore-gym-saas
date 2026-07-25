import { Link } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { ArrowUpRight, CalendarClock, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { upcomingExpiries } from "@/data/mockData";
import { getInitials, formatDate } from "@/lib/utils";

export function UpcomingExpiry() {
  return (
    <Card className="surface-card">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            Upcoming Expiry
          </CardTitle>
          <CardDescription>Memberships expiring in the next 14 days</CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
          <Link to="/clients">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {upcomingExpiries.map((member) => {
          const daysLeft = differenceInCalendarDays(new Date(member.expiryDate), new Date("2026-07-25"));
          return (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-hover"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {member.plan} • expires {formatDate(member.expiryDate)}
                </p>
              </div>
              <Badge variant={daysLeft <= 3 ? "destructive" : "warning"}>{daysLeft}d left</Badge>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-primary">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
