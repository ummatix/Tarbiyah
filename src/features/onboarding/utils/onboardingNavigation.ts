export const ONBOARDING_COMPLETED_STORAGE_KEY = 'tarbiyah_onboarding_completed';

export function hasCompletedOnboarding(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDING_COMPLETED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Persists local onboarding completion idempotently.
 * Returns true when newly marked, false if already completed or storage fails.
 */
export function persistOnboardingCompleted(): boolean {
  try {
    if (window.localStorage.getItem(ONBOARDING_COMPLETED_STORAGE_KEY) === 'true') {
      return false;
    }
    window.localStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}

/**
 * Central post-authentication destination decision shared by email auth and Google OAuth.
 */
export function getPostAuthDestination(requestedPath?: string | null): string {
  if (!hasCompletedOnboarding()) {
    return '/onboarding';
  }

  if (requestedPath === '/onboarding') {
    return '/onboarding';
  }

  return '/app';
}

