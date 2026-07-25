export type UserRole = "admin" | "receptionist" | "trainer";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  gymName?: string;
  createdAt?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  plan: string;
  status: "active" | "expiring" | "expired" | "frozen";
  joinDate: string;
  expiryDate: string;
  gender?: "male" | "female" | "other";
  address?: string;
  trainer?: string;
  balance?: number;
}

export interface Payment {
  id: string;
  memberName: string;
  avatarUrl?: string;
  amount: number;
  method: "card" | "cash" | "bank" | "upi";
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: "Monthly" | "Quarterly" | "Annual";
  activeMembers: number;
  color: string;
  popular?: boolean;
  features: string[];
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
  clients: number;
  rating: number;
  email?: string;
  phone?: string;
  experience?: string;
  status?: "active" | "on-leave";
  availability?: string[];
}

export interface ClassSession {
  id: string;
  name: string;
  trainer: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  category: "Yoga" | "HIIT" | "Strength" | "Cardio" | "Cycling" | "Pilates";
  location: string;
}

export interface AttendanceRecord {
  id: string;
  memberName: string;
  avatarUrl?: string;
  activity: string;
  checkIn: string;
  checkOut: string | null;
  date: string;
  method: "QR" | "Manual" | "Biometric";
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  status: "active" | "invited" | "suspended";
  joinDate: string;
}

export interface ActivityEvent {
  id: string;
  type: "checkin" | "payment" | "signup" | "renewal" | "class" | "cancellation";
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
}

export interface AttendancePoint {
  day: string;
  morning: number;
  evening: number;
}

export interface StatSummary {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down";
  icon: string;
  /** Set true for metrics where a downward trend is the desired outcome (e.g. churn rate). */
  lowerIsBetter?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}
