import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { recentMembers } from "@/data/mockData";
import { getInitials, formatDate, cn } from "@/lib/utils";
import type { Member } from "@/types";

const statusVariant: Record<Member["status"], "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  expiring: "warning",
  expired: "destructive",
  frozen: "secondary",
};

export function RecentMembers() {
  return (
    <Card className="surface-card">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Recent Members</CardTitle>
          <CardDescription>Newest sign-ups this week</CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
          <Link to="/clients">
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-1">
        {recentMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-hover"
          >
            <Avatar>
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{member.name}</p>
              <p className="truncate text-xs text-muted-foreground">{member.plan}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={statusVariant[member.status]} className={cn("capitalize")}>
                {member.status}
              </Badge>
              <span className="text-[11px] text-muted-foreground">{formatDate(member.joinDate)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
