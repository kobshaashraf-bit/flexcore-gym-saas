import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/layout/PageLoader";

/**
 * Wraps public-only routes (login, register, forgot-password) and redirects
 * an already-authenticated user straight to their dashboard, so a signed-in
 * user can never land back on the auth screens (e.g. via browser back button
 * or a bookmarked link).
 */
export function GuestRoute({ children }: { children: ReactNode }) {
  const { firebaseUser, initializing } = useAuth();

  if (initializing) {
    return <PageLoader />;
  }

  if (firebaseUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
