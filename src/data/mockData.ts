import type {
  Member,
  Payment,
  RevenuePoint,
  AttendancePoint,
  StatSummary,
  ActivityEvent,
  NotificationItem,
  MembershipPlan,
  Trainer,
  ClassSession,
  AttendanceRecord,
  StaffMember,
} from "@/types";

export const revenueData: RevenuePoint[] = [
  { month: "Jan", revenue: 18200, target: 17000 },
  { month: "Feb", revenue: 19850, target: 18000 },
  { month: "Mar", revenue: 21200, target: 19500 },
  { month: "Apr", revenue: 20100, target: 20500 },
  { month: "May", revenue: 23800, target: 21500 },
  { month: "Jun", revenue: 26400, target: 23000 },
  { month: "Jul", revenue: 25100, target: 24000 },
  { month: "Aug", revenue: 27900, target: 25500 },
  { month: "Sep", revenue: 29650, target: 27000 },
  { month: "Oct", revenue: 31200, target: 28500 },
  { month: "Nov", revenue: 33450, target: 30000 },
  { month: "Dec", revenue: 36800, target: 32000 },
];

export const attendanceData: AttendancePoint[] = [
  { day: "Mon", morning: 62, evening: 88 },
  { day: "Tue", morning: 58, evening: 92 },
  { day: "Wed", morning: 70, evening: 101 },
  { day: "Thu", morning: 65, evening: 95 },
  { day: "Fri", morning: 74, evening: 110 },
  { day: "Sat", morning: 90, evening: 76 },
  { day: "Sun", morning: 40, evening: 38 },
];

export const statSummaries: StatSummary[] = [
  { label: "Total Members", value: "1,284", delta: 8.2, trend: "up", icon: "Users" },
  { label: "Monthly Revenue", value: "$36,800", delta: 12.4, trend: "up", icon: "Wallet" },
  { label: "Active Check-ins", value: "312", delta: 4.1, trend: "up", icon: "Activity" },
  { label: "Churn Rate", value: "2.4%", delta: -1.1, trend: "down", icon: "TrendingDown", lowerIsBetter: true },
];

export const recentMembers: Member[] = [
  { id: "m1", name: "Ayesha Raza", email: "ayesha.raza@mail.com", phone: "+92 300 1234567", plan: "Elite Annual", status: "active", joinDate: "2026-07-20", expiryDate: "2027-07-20", avatarUrl: "" },
  { id: "m2", name: "Bilal Ahmed", email: "bilal.ahmed@mail.com", phone: "+92 301 2345678", plan: "Pro Monthly", status: "active", joinDate: "2026-07-18", expiryDate: "2026-08-18", avatarUrl: "" },
  { id: "m3", name: "Sara Khan", email: "sara.khan@mail.com", phone: "+92 302 3456789", plan: "Basic Monthly", status: "expiring", joinDate: "2026-06-02", expiryDate: "2026-07-30", avatarUrl: "" },
  { id: "m4", name: "Hamza Tariq", email: "hamza.tariq@mail.com", phone: "+92 303 4567890", plan: "Elite Annual", status: "active", joinDate: "2026-07-15", expiryDate: "2027-07-15", avatarUrl: "" },
  { id: "m5", name: "Mahnoor Fatima", email: "mahnoor.f@mail.com", phone: "+92 304 5678901", plan: "Pro Monthly", status: "frozen", joinDate: "2026-05-11", expiryDate: "2026-08-11", avatarUrl: "" },
];

export const recentPayments: Payment[] = [
  { id: "p1", memberName: "Ayesha Raza", amount: 480, method: "card", status: "paid", date: "2026-07-22", plan: "Elite Annual" },
  { id: "p2", memberName: "Bilal Ahmed", amount: 45, method: "upi", status: "paid", date: "2026-07-21", plan: "Pro Monthly" },
  { id: "p3", memberName: "Zara Malik", amount: 25, method: "cash", status: "pending", date: "2026-07-21", plan: "Basic Monthly" },
  { id: "p4", memberName: "Hamza Tariq", amount: 480, method: "bank", status: "paid", date: "2026-07-20", plan: "Elite Annual" },
  { id: "p5", memberName: "Usman Ali", amount: 45, method: "card", status: "failed", date: "2026-07-19", plan: "Pro Monthly" },
];

export const allPayments: Payment[] = [
  { id: "p1", memberName: "Ayesha Raza", amount: 480, method: "card", status: "paid", date: "2026-07-22", plan: "Elite Annual" },
  { id: "p2", memberName: "Bilal Ahmed", amount: 45, method: "upi", status: "paid", date: "2026-07-21", plan: "Pro Monthly" },
  { id: "p3", memberName: "Zara Malik", amount: 25, method: "cash", status: "pending", date: "2026-07-21", plan: "Basic Monthly" },
  { id: "p4", memberName: "Hamza Tariq", amount: 480, method: "bank", status: "paid", date: "2026-07-20", plan: "Elite Annual" },
  { id: "p5", memberName: "Usman Ali", amount: 45, method: "card", status: "failed", date: "2026-07-19", plan: "Pro Monthly" },
  { id: "p6", memberName: "Nida Yousaf", amount: 480, method: "card", status: "paid", date: "2026-07-18", plan: "Elite Annual" },
  { id: "p7", memberName: "Kamran Sheikh", amount: 45, method: "upi", status: "paid", date: "2026-07-17", plan: "Pro Monthly" },
  { id: "p8", memberName: "Areeba Hassan", amount: 25, method: "cash", status: "paid", date: "2026-07-16", plan: "Basic Monthly" },
  { id: "p9", memberName: "Talha Farooq", amount: 480, method: "bank", status: "pending", date: "2026-07-15", plan: "Elite Annual" },
  { id: "p10", memberName: "Danish Iqbal", amount: 45, method: "card", status: "paid", date: "2026-07-14", plan: "Pro Monthly" },
  { id: "p11", memberName: "Fatima Noor", amount: 480, method: "card", status: "paid", date: "2026-07-10", plan: "Elite Annual" },
  { id: "p12", memberName: "Omer Siddiqui", amount: 25, method: "cash", status: "failed", date: "2026-07-08", plan: "Basic Monthly" },
];

export const upcomingExpiries: Member[] = [
  { id: "e1", name: "Sara Khan", email: "sara.khan@mail.com", phone: "", plan: "Basic Monthly", status: "expiring", joinDate: "2026-06-02", expiryDate: "2026-07-30" },
  { id: "e2", name: "Danish Iqbal", email: "danish.iqbal@mail.com", phone: "", plan: "Pro Monthly", status: "expiring", joinDate: "2026-06-05", expiryDate: "2026-08-01" },
  { id: "e3", name: "Fatima Noor", email: "fatima.noor@mail.com", phone: "", plan: "Elite Annual", status: "expiring", joinDate: "2025-08-03", expiryDate: "2026-08-03" },
  { id: "e4", name: "Omer Siddiqui", email: "omer.s@mail.com", phone: "", plan: "Basic Monthly", status: "expiring", joinDate: "2026-06-06", expiryDate: "2026-08-05" },
];

export const activityTimeline: ActivityEvent[] = [
  { id: "a1", type: "checkin", title: "Check-in", description: "Ayesha Raza checked in for Morning Yoga", timestamp: "2026-07-23T07:32:00", actor: "Ayesha Raza" },
  { id: "a2", type: "payment", title: "Payment received", description: "Bilal Ahmed paid $45 for Pro Monthly", timestamp: "2026-07-23T06:50:00", actor: "Bilal Ahmed" },
  { id: "a3", type: "signup", title: "New member", description: "Hamza Tariq joined on the Elite Annual plan", timestamp: "2026-07-22T18:12:00", actor: "Hamza Tariq" },
  { id: "a4", type: "class", title: "Class scheduled", description: "HIIT Blast added to Saturday 6:00 PM slot", timestamp: "2026-07-22T15:40:00", actor: "Coach Imran" },
  { id: "a5", type: "renewal", title: "Membership renewed", description: "Mahnoor Fatima renewed Pro Monthly", timestamp: "2026-07-22T11:05:00", actor: "Mahnoor Fatima" },
  { id: "a6", type: "cancellation", title: "Membership frozen", description: "Zara Malik requested a 30-day freeze", timestamp: "2026-07-21T09:20:00", actor: "Zara Malik" },
];

export const allMembers: Member[] = [
  { id: "m1", name: "Ayesha Raza", email: "ayesha.raza@mail.com", phone: "+92 300 1234567", plan: "Elite Annual", status: "active", joinDate: "2026-07-20", expiryDate: "2027-07-20", gender: "female", trainer: "Coach Imran", balance: 0 },
  { id: "m2", name: "Bilal Ahmed", email: "bilal.ahmed@mail.com", phone: "+92 301 2345678", plan: "Pro Monthly", status: "active", joinDate: "2026-07-18", expiryDate: "2026-08-18", gender: "male", trainer: "Coach Sana", balance: 0 },
  { id: "m3", name: "Sara Khan", email: "sara.khan@mail.com", phone: "+92 302 3456789", plan: "Basic Monthly", status: "expiring", joinDate: "2026-06-02", expiryDate: "2026-07-30", gender: "female", trainer: "—", balance: 25 },
  { id: "m4", name: "Hamza Tariq", email: "hamza.tariq@mail.com", phone: "+92 303 4567890", plan: "Elite Annual", status: "active", joinDate: "2026-07-15", expiryDate: "2027-07-15", gender: "male", trainer: "Coach Imran", balance: 0 },
  { id: "m5", name: "Mahnoor Fatima", email: "mahnoor.f@mail.com", phone: "+92 304 5678901", plan: "Pro Monthly", status: "frozen", joinDate: "2026-05-11", expiryDate: "2026-08-11", gender: "female", trainer: "Coach Bilal", balance: 0 },
  { id: "m6", name: "Zara Malik", email: "zara.malik@mail.com", phone: "+92 305 6789012", plan: "Basic Monthly", status: "frozen", joinDate: "2026-04-20", expiryDate: "2026-08-20", gender: "female", trainer: "—", balance: 0 },
  { id: "m7", name: "Usman Ali", email: "usman.ali@mail.com", phone: "+92 306 7890123", plan: "Pro Monthly", status: "expired", joinDate: "2026-03-10", expiryDate: "2026-07-10", gender: "male", trainer: "Coach Sana", balance: 45 },
  { id: "m8", name: "Danish Iqbal", email: "danish.iqbal@mail.com", phone: "+92 307 8901234", plan: "Pro Monthly", status: "expiring", joinDate: "2026-06-05", expiryDate: "2026-08-01", gender: "male", trainer: "Coach Imran", balance: 0 },
  { id: "m9", name: "Fatima Noor", email: "fatima.noor@mail.com", phone: "+92 308 9012345", plan: "Elite Annual", status: "expiring", joinDate: "2025-08-03", expiryDate: "2026-08-03", gender: "female", trainer: "Coach Bilal", balance: 0 },
  { id: "m10", name: "Omer Siddiqui", email: "omer.s@mail.com", phone: "+92 309 0123456", plan: "Basic Monthly", status: "expiring", joinDate: "2026-06-06", expiryDate: "2026-08-05", gender: "male", trainer: "—", balance: 0 },
  { id: "m11", name: "Nida Yousaf", email: "nida.yousaf@mail.com", phone: "+92 310 1122334", plan: "Elite Annual", status: "active", joinDate: "2026-02-14", expiryDate: "2027-02-14", gender: "female", trainer: "Coach Sana", balance: 0 },
  { id: "m12", name: "Kamran Sheikh", email: "kamran.sheikh@mail.com", phone: "+92 311 2233445", plan: "Pro Monthly", status: "active", joinDate: "2026-07-01", expiryDate: "2026-08-01", gender: "male", trainer: "Coach Imran", balance: 0 },
  { id: "m13", name: "Areeba Hassan", email: "areeba.hassan@mail.com", phone: "+92 312 3344556", plan: "Basic Monthly", status: "active", joinDate: "2026-06-28", expiryDate: "2026-07-28", gender: "female", trainer: "—", balance: 0 },
  { id: "m14", name: "Talha Farooq", email: "talha.farooq@mail.com", phone: "+92 313 4455667", plan: "Elite Annual", status: "active", joinDate: "2026-05-19", expiryDate: "2027-05-19", gender: "male", trainer: "Coach Bilal", balance: 0 },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: "pl1",
    name: "Basic Monthly",
    price: 25,
    duration: "Monthly",
    activeMembers: 214,
    color: "from-slate-500 to-slate-700",
    features: ["Gym floor access", "Locker room access", "1 free fitness assessment", "Standard operating hours"],
  },
  {
    id: "pl2",
    name: "Pro Monthly",
    price: 45,
    duration: "Monthly",
    activeMembers: 486,
    color: "from-primary-500 to-primary-600",
    popular: true,
    features: ["Everything in Basic", "Group classes included", "2 personal training sessions", "Extended hours access"],
  },
  {
    id: "pl3",
    name: "Elite Quarterly",
    price: 120,
    duration: "Quarterly",
    activeMembers: 158,
    color: "from-amber-500 to-orange-600",
    features: ["Everything in Pro", "Unlimited personal training", "Nutrition coaching", "Priority class booking"],
  },
  {
    id: "pl4",
    name: "Elite Annual",
    price: 480,
    duration: "Annual",
    activeMembers: 426,
    color: "from-orange-600 to-red-600",
    features: ["Everything in Elite Quarterly", "24/7 facility access", "Guest passes (4/mo)", "Free merchandise kit"],
  },
];

export const trainers: Trainer[] = [
  { id: "t1", name: "Coach Imran Malik", specialty: "Strength & Conditioning", clients: 38, rating: 4.9, email: "imran.malik@flexcore.gym", phone: "+92 300 1112223", experience: "9 yrs", status: "active", availability: ["Mon", "Wed", "Fri"] },
  { id: "t2", name: "Coach Sana Aziz", specialty: "Yoga & Mobility", clients: 29, rating: 4.8, email: "sana.aziz@flexcore.gym", phone: "+92 301 2223334", experience: "6 yrs", status: "active", availability: ["Tue", "Thu", "Sat"] },
  { id: "t3", name: "Coach Bilal Rauf", specialty: "HIIT & Weight Loss", clients: 42, rating: 4.7, email: "bilal.rauf@flexcore.gym", phone: "+92 302 3334445", experience: "7 yrs", status: "active", availability: ["Mon", "Tue", "Thu", "Sat"] },
  { id: "t4", name: "Coach Hina Farooq", specialty: "Pilates & Rehab", clients: 21, rating: 4.9, email: "hina.farooq@flexcore.gym", phone: "+92 303 4445556", experience: "5 yrs", status: "on-leave", availability: ["Wed", "Fri"] },
  { id: "t5", name: "Coach Asad Javed", specialty: "Powerlifting", clients: 33, rating: 4.6, email: "asad.javed@flexcore.gym", phone: "+92 304 5556667", experience: "11 yrs", status: "active", availability: ["Mon", "Wed", "Fri", "Sat"] },
  { id: "t6", name: "Coach Mehreen Ali", specialty: "Cycling & Cardio", clients: 26, rating: 4.8, email: "mehreen.ali@flexcore.gym", phone: "+92 305 6667778", experience: "4 yrs", status: "active", availability: ["Tue", "Thu", "Sun"] },
];

export const classSchedule: ClassSession[] = [
  { id: "c1", name: "Morning Yoga Flow", trainer: "Coach Sana Aziz", day: "Mon", startTime: "07:00", endTime: "08:00", capacity: 20, enrolled: 17, category: "Yoga", location: "Studio A" },
  { id: "c2", name: "HIIT Blast", trainer: "Coach Bilal Rauf", day: "Mon", startTime: "18:00", endTime: "19:00", capacity: 25, enrolled: 25, category: "HIIT", location: "Studio B" },
  { id: "c3", name: "Strength Fundamentals", trainer: "Coach Imran Malik", day: "Tue", startTime: "17:00", endTime: "18:00", capacity: 15, enrolled: 9, category: "Strength", location: "Weight Room" },
  { id: "c4", name: "Spin & Burn", trainer: "Coach Mehreen Ali", day: "Wed", startTime: "06:30", endTime: "07:15", capacity: 18, enrolled: 18, category: "Cycling", location: "Cycle Studio" },
  { id: "c5", name: "Pilates Core", trainer: "Coach Hina Farooq", day: "Wed", startTime: "10:00", endTime: "11:00", capacity: 16, enrolled: 8, category: "Pilates", location: "Studio A" },
  { id: "c6", name: "Powerlifting Lab", trainer: "Coach Asad Javed", day: "Thu", startTime: "19:00", endTime: "20:15", capacity: 12, enrolled: 11, category: "Strength", location: "Weight Room" },
  { id: "c7", name: "Cardio Circuit", trainer: "Coach Bilal Rauf", day: "Fri", startTime: "18:00", endTime: "19:00", capacity: 22, enrolled: 14, category: "Cardio", location: "Studio B" },
  { id: "c8", name: "Evening Yoga & Stretch", trainer: "Coach Sana Aziz", day: "Fri", startTime: "19:30", endTime: "20:30", capacity: 20, enrolled: 12, category: "Yoga", location: "Studio A" },
  { id: "c9", name: "Weekend Warrior HIIT", trainer: "Coach Bilal Rauf", day: "Sat", startTime: "09:00", endTime: "10:00", capacity: 25, enrolled: 21, category: "HIIT", location: "Studio B" },
  { id: "c10", name: "Sunday Spin", trainer: "Coach Mehreen Ali", day: "Sun", startTime: "09:00", endTime: "09:45", capacity: 18, enrolled: 10, category: "Cycling", location: "Cycle Studio" },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "att1", memberName: "Ayesha Raza", activity: "Morning Yoga Flow", checkIn: "2026-07-23T07:02:00", checkOut: "2026-07-23T08:05:00", date: "2026-07-23", method: "QR" },
  { id: "att2", memberName: "Bilal Ahmed", activity: "Free Weights", checkIn: "2026-07-23T06:45:00", checkOut: "2026-07-23T08:00:00", date: "2026-07-23", method: "Biometric" },
  { id: "att3", memberName: "Hamza Tariq", activity: "HIIT Blast", checkIn: "2026-07-22T18:00:00", checkOut: "2026-07-22T19:05:00", date: "2026-07-22", method: "QR" },
  { id: "att4", memberName: "Nida Yousaf", activity: "Strength Fundamentals", checkIn: "2026-07-22T17:05:00", checkOut: null, date: "2026-07-22", method: "Manual" },
  { id: "att5", memberName: "Kamran Sheikh", activity: "Cardio Circuit", checkIn: "2026-07-21T18:10:00", checkOut: "2026-07-21T19:00:00", date: "2026-07-21", method: "QR" },
  { id: "att6", memberName: "Areeba Hassan", activity: "Pilates Core", checkIn: "2026-07-21T10:02:00", checkOut: "2026-07-21T11:00:00", date: "2026-07-21", method: "Biometric" },
  { id: "att7", memberName: "Talha Farooq", activity: "Powerlifting Lab", checkIn: "2026-07-20T19:00:00", checkOut: "2026-07-20T20:20:00", date: "2026-07-20", method: "QR" },
  { id: "att8", memberName: "Sara Khan", activity: "Free Weights", checkIn: "2026-07-20T08:15:00", checkOut: "2026-07-20T09:10:00", date: "2026-07-20", method: "Manual" },
];

export const staffMembers: StaffMember[] = [
  { id: "s1", name: "Ahmed Raza (You)", email: "ahmed.raza@flexcore.gym", role: "admin", status: "active", joinDate: "2025-01-10" },
  { id: "s2", name: "Mariam Idris", email: "mariam.idris@flexcore.gym", role: "receptionist", status: "active", joinDate: "2025-03-22" },
  { id: "s3", name: "Coach Imran Malik", email: "imran.malik@flexcore.gym", role: "trainer", status: "active", joinDate: "2025-02-01" },
  { id: "s4", name: "Coach Sana Aziz", email: "sana.aziz@flexcore.gym", role: "trainer", status: "active", joinDate: "2025-04-15" },
  { id: "s5", name: "Junaid Farhan", email: "junaid.farhan@flexcore.gym", role: "receptionist", status: "invited", joinDate: "2026-07-20" },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "12 memberships expiring this week", description: "Review and send renewal reminders", timestamp: "2026-07-23T08:00:00", read: false, type: "warning" },
  { id: "n2", title: "Payment failed — Usman Ali", description: "Card declined for Pro Monthly renewal", timestamp: "2026-07-22T22:10:00", read: false, type: "error" },
  { id: "n3", title: "New trainer application", description: "Coach Sana applied for a strength coaching role", timestamp: "2026-07-22T14:30:00", read: true, type: "info" },
  { id: "n4", title: "Monthly revenue goal reached", description: "July revenue surpassed the $32K target", timestamp: "2026-07-21T10:00:00", read: true, type: "success" },
  { id: "n5", title: "Class at full capacity", description: "HIIT Blast (Mon 6PM) has reached its 25-person cap", timestamp: "2026-07-20T17:15:00", read: true, type: "info" },
  { id: "n6", title: "Trainer on leave", description: "Coach Hina Farooq marked herself on leave for 3 days", timestamp: "2026-07-19T09:40:00", read: true, type: "warning" },
  { id: "n7", title: "Equipment maintenance due", description: "Treadmill #4 is due for scheduled maintenance", timestamp: "2026-07-18T13:00:00", read: true, type: "warning" },
  { id: "n8", title: "New 5-star review", description: "A member left a 5-star review mentioning Coach Bilal", timestamp: "2026-07-17T20:22:00", read: true, type: "success" },
];
