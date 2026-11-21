import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  getPostAuthDestination,
  hasCompletedOnboarding,
} from '../features/onboarding/utils/onboardingNavigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requireCompletedOnboarding?: boolean;
}

export function ProtectedRoute({
  children,
  requireCompletedOnboarding = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isRecoverySession, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  if (isRecoverySession) {
    return <Navigate replace to="/reset-password" />;
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  if (requireCompletedOnboarding && !hasCompletedOnboarding()) {
    return <Navigate replace to={getPostAuthDestination(location.pathname)} />;
  }

  return <>{children}</>;
}

