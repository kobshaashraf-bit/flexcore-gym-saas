import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ClipboardCheck,
  Wallet,
  UserCog,
  CalendarRange,
  BarChart3,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";
import type { UserRole } from "@/types";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: UserRole[];
  badge?: number;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", path: "/clients", icon: Users },
  { label: "Membership Plans", path: "/membership-plans", icon: CreditCard },
  { label: "Attendance", path: "/attendance", icon: ClipboardCheck },
  { label: "Payments", path: "/payments", icon: Wallet, roles: ["admin", "receptionist"] },
  { label: "Trainers", path: "/trainers", icon: UserCog },
  { label: "Classes", path: "/classes", icon: CalendarRange },
  { label: "Reports", path: "/reports", icon: BarChart3, roles: ["admin"] },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Settings", path: "/settings", icon: Settings, roles: ["admin"] },
  { label: "Profile", path: "/profile", icon: UserCircle },
];
