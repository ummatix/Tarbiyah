import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { PasswordField } from '../components/auth/PasswordField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  establishRecoverySessionFromUrl,
  mapSupabaseAuthError,
  updateRecoveredPassword,
  validateResetPasswordInputs,
} from '../features/auth/services/authService';
import type { AuthMode } from '../types/auth';

type RecoveryStatus = 'checking' | 'ready' | 'invalid' | 'succeeded';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: authLoading, isRecoverySession, markRecoverySession, signOut } =
    useAuth();

  const [status, setStatus] = useState<RecoveryStatus>('checking');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [linkErrorMessage, setLinkErrorMessage] = useState<string | null>(null);
  const hasExplicitUrlErrorRef = useRef(false);
  const hasSucceededRef = useRef(false);

  const handleModeChange = (nextMode: AuthMode) => {
    navigate(nextMode === 'login' ? '/login' : '/register');
  };

  useEffect(() => {
    let active = true;

    async function verifyRecovery() {
      if (authLoading || hasSucceededRef.current) return;

      const urlCheck = await establishRecoverySessionFromUrl(location.search, location.hash);
      if (!active) return;

      if (urlCheck.status === 'invalid') {
        hasExplicitUrlErrorRef.current = true;
        markRecoverySession(false);
        setLinkErrorMessage(
          urlCheck.errorMessage ??
            'This password reset link is invalid or has expired. Please request a new one.'
        );
        setStatus('invalid');
        return;
      }

      if (urlCheck.status === 'ready') {
        markRecoverySession(true);
        setLinkErrorMessage(null);
        setStatus('ready');
        if (location.search || location.hash) {
          window.history.replaceState(null, '', '/reset-password');
        }
        return;
      }

      if (isRecoverySession && session) {
        setLinkErrorMessage(null);
        setStatus('ready');
        return;
      }

      setLinkErrorMessage(
        'A valid password recovery link is required to reset your password. Please request a new reset link.'
      );
      setStatus('invalid');
    }

    void verifyRecovery();

    return () => {
      active = false;
    };
  }, [authLoading, isRecoverySession, location.hash, location.search, markRecoverySession, session]);

  useEffect(() => {
    if (
      !hasExplicitUrlErrorRef.current &&
      isRecoverySession &&
      session &&
      status !== 'succeeded'
    ) {
      setLinkErrorMessage(null);
      setStatus('ready');
    }
  }, [isRecoverySession, session, status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || status !== 'ready') return;

    setErrorMessage(null);
    setSubmitting(true);

    try {
      const validated = validateResetPasswordInputs(newPassword, confirmPassword);
      await updateRecoveredPassword(validated);
      hasSucceededRef.current = true;
      setNewPassword('');
      setConfirmPassword('');
      setStatus('succeeded');
      await signOut();
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      if (mapped.code === 'session_expired' || mapped.code === 'invalid_recovery_link') {
        markRecoverySession(false);
        setLinkErrorMessage(mapped.message);
        setStatus('invalid');
      } else {
        setErrorMessage(mapped.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mobileSubtitle="Choose a strong new password for your account."
      mobileTitle="Create new password"
      mode="login"
      onModeChange={handleModeChange}
    >
      <div className="mb-5 flex items-center justify-between lg:mb-6">
        <Link
          className="inline-flex min-h-[44px] items-center gap-1.5 font-label-md text-label-md text-primary transition-colors hover:text-primary-container"
          to="/login"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Log In</span>
        </Link>
      </div>

      {status === 'checking' ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Verifying your recovery link...
          </p>
        </div>
      ) : null}

      {status === 'invalid' ? (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-heading text-headline-md font-bold tracking-tight text-on-surface">
              Recovery link unavailable
            </h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              For your account security, passwords can only be changed from a valid, active
              recovery link.
            </p>
          </div>

          <div
            className="flex items-start gap-2.5 rounded-xl bg-error-container px-3.5 py-3 font-body-sm text-body-sm text-on-error-container"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {linkErrorMessage ??
                'This password reset link is invalid or has expired. Please request a new one.'}
            </span>
          </div>

          <PrimaryButton
            icon={<ArrowRight className="h-5 w-5" />}
            onClick={() => navigate('/forgot-password')}
            type="button"
          >
            Request New Reset Link
          </PrimaryButton>
        </div>
      ) : null}

      {status === 'succeeded' ? (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-heading text-headline-md font-bold tracking-tight text-on-surface">
              Password updated
            </h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Your TARBIYAH password has been updated securely.
            </p>
          </div>

          <div
            className="flex items-start gap-2.5 rounded-xl bg-primary-fixed px-4 py-3.5 font-body-sm text-body-sm text-on-primary-fixed"
            role="status"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Your password has been updated. Please sign in with your new password to continue.
            </span>
          </div>

          <PrimaryButton
            icon={<ArrowRight className="h-5 w-5" />}
            onClick={() => navigate('/login', { replace: true })}
            type="button"
          >
            Continue to Log In
          </PrimaryButton>
        </div>
      ) : null}

      {status === 'ready' ? (
        <>
          <div className="mb-6">
            <h2 className="font-heading text-headline-md font-bold tracking-tight text-on-surface">
              Set a new password
            </h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
              Choose a new password with at least 6 characters to secure your account.
            </p>
          </div>

          {errorMessage ? (
            <div
              className="mb-4 flex items-start gap-2.5 rounded-xl bg-error-container px-3.5 py-3 font-body-sm text-body-sm text-on-error-container"
              role="alert"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          ) : null}

          <form
            className="flex flex-col gap-3.5 lg:gap-4"
            noValidate
            onSubmit={(e) => void handleSubmit(e)}
          >
            <PasswordField
              autoComplete="new-password"
              disabled={submitting}
              icon={<Lock className="h-5 w-5" />}
              id="reset-new-password"
              label="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              toggleLabel="Toggle new password visibility"
              value={newPassword}
            />

            <PasswordField
              autoComplete="new-password"
              disabled={submitting}
              icon={<CheckCircle2 className="h-5 w-5" />}
              id="reset-confirm-password"
              label="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              required
              toggleLabel="Toggle confirm new password visibility"
              value={confirmPassword}
            />

            <PrimaryButton
              disabled={submitting}
              icon={
                submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )
              }
            >
              {submitting ? 'Updating Password...' : 'Update Password'}
            </PrimaryButton>
          </form>
        </>
      ) : null}
    </AuthLayout>
  );
}
