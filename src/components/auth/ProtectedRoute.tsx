import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/layout/PageLoader";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { firebaseUser, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <PageLoader />;
  }

  if (!firebaseUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
