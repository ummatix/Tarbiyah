import { useAuth } from '../features/auth/hooks/useAuth';
import { DashboardShell } from '../features/dashboard/components/DashboardShell';
import { DesktopDashboardView } from '../features/dashboard/components/desktop/DesktopDashboardView';
import { getLearnerFirstName } from '../features/dashboard/data/dashboardContent';
import { useOnboarding } from '../features/onboarding/context/OnboardingContext';

export function AuthenticatedHomePage() {
  const { user } = useAuth();
  const { answers } = useOnboarding();

  const firstName = getLearnerFirstName(user, answers.preferredName);

  return (
    <DashboardShell displayName={firstName}>
      <DesktopDashboardView displayName={firstName} />
    </DashboardShell>
  );
}
