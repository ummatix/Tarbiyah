import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { getPostAuthDestination } from '../features/onboarding/utils/onboardingNavigation';

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isRecoverySession, loading } = useAuth();
  const location = useLocation();
  const requestedFrom =
    typeof (location.state as { from?: unknown } | null)?.from === 'string'
      ? (location.state as { from: string }).from
      : null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">Loading TARBIYAH...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !isRecoverySession) {
    return <Navigate replace to={getPostAuthDestination(requestedFrom)} />;
  }

  return <>{children}</>;
}

