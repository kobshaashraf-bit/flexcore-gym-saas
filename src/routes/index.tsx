import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageLoader } from "@/components/layout/PageLoader";

// Route-level code splitting: each page ships as its own chunk and is only
// fetched when the user actually navigates there, keeping the initial
// bundle small. The shared `PageLoader` (already used for auth/session
// bootstrapping) doubles as the Suspense fallback so the loading state is
// visually consistent everywhere.
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Clients = lazy(() => import("@/pages/Clients"));
const MembershipPlans = lazy(() => import("@/pages/MembershipPlans"));
const Attendance = lazy(() => import("@/pages/Attendance"));
const Payments = lazy(() => import("@/pages/Payments"));
const Trainers = lazy(() => import("@/pages/Trainers"));
const Classes = lazy(() => import("@/pages/Classes"));
const Reports = lazy(() => import("@/pages/Reports"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Settings = lazy(() => import("@/pages/Settings"));
const Profile = lazy(() => import("@/pages/Profile"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public auth routes — inaccessible once signed in */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        {/* Protected application shell */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/membership-plans" element={<MembershipPlans />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route
            path="/payments"
            element={
              <RoleGuard allow={["admin", "receptionist"]}>
                <Payments />
              </RoleGuard>
            }
          />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/classes" element={<Classes />} />
          <Route
            path="/reports"
            element={
              <RoleGuard allow={["admin"]}>
                <Reports />
              </RoleGuard>
            }
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/settings"
            element={
              <RoleGuard allow={["admin"]}>
                <Settings />
              </RoleGuard>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
