import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ContactRound,
  Loader2,
  Lock,
  Mail,
  MailCheck,
} from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthModeTabs } from '../components/auth/AuthModeTabs';
import { GoogleAuthButton } from '../components/auth/GoogleAuthButton';
import { PasswordField } from '../components/auth/PasswordField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { TextInputField } from '../components/ui/TextInputField';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  loginWithEmail,
  mapSupabaseAuthError,
  registerWithEmail,
  signInWithGoogle,
  validateRegistrationInputs,
} from '../features/auth/services/authService';
import { getPostAuthDestination } from '../features/onboarding/utils/onboardingNavigation';
import type { AuthFormState, AuthMode } from '../types/auth';

interface AuthPageProps {
  initialMode: AuthMode;
}

const INITIAL_FORM: AuthFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  rememberMe: true,
  marketingConsent: false,
};

export function AuthPage({ initialMode }: AuthPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sessionExpiredNotice,
    oauthErrorNotice,
    clearSessionExpiredNotice,
    clearOAuthErrorNotice,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [form, setForm] = useState<AuthFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [oauthSubmitting, setOAuthSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setConfirmationEmail(null);
  }, [initialMode]);

  const isLogin = mode === 'login';
  const isBusy = submitting || oauthSubmitting;
  const requestedFrom =
    typeof (location.state as { from?: unknown } | null)?.from === 'string'
      ? (location.state as { from: string }).from
      : null;

  const handleModeChange = (nextMode: AuthMode) => {
    if (isBusy) return;
    setErrorMessage(null);
    setConfirmationEmail(null);
    clearSessionExpiredNotice();
    clearOAuthErrorNotice();
    setMode(nextMode);
    navigate(nextMode === 'login' ? '/login' : '/register');
  };

  const handleGoogleSignIn = async () => {
    if (isBusy) return;
    setErrorMessage(null);
    setConfirmationEmail(null);
    clearSessionExpiredNotice();
    clearOAuthErrorNotice();
    setOAuthSubmitting(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      setErrorMessage(mapped.message);
      setOAuthSubmitting(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBusy) return;

    setErrorMessage(null);
    setConfirmationEmail(null);
    clearSessionExpiredNotice();
    clearOAuthErrorNotice();
    setSubmitting(true);

    try {
      if (isLogin) {
        await loginWithEmail({
          email: form.email,
          password: form.password,
        });
        navigate(getPostAuthDestination(requestedFrom), { replace: true });
      } else {
        const validated = validateRegistrationInputs(
          form.fullName,
          form.email,
          form.password,
          form.confirmPassword
        );

        const result = await registerWithEmail({
          fullName: validated.fullName,
          email: validated.email,
          password: validated.password,
          marketingConsent: form.marketingConsent,
        });

        if (result.status === 'confirmation_required') {
          setConfirmationEmail(result.email);
          setForm((prev) => ({
            ...prev,
            password: '',
            confirmPassword: '',
          }));
        } else {
          navigate(getPostAuthDestination(), { replace: true });
        }
      }
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      setErrorMessage(mapped.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout mode={mode} onModeChange={handleModeChange}>
      <AuthModeTabs mode={mode} onModeChange={handleModeChange} />

      {/* Desktop section heading */}
      <div className="mb-6 hidden lg:block">
        <h2 className="font-heading text-headline-md font-bold tracking-tight text-on-surface">
          {isLogin ? 'Welcome back' : 'Begin your path'}
        </h2>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          {isLogin
            ? 'Enter your credentials to continue your growth journey.'
            : 'Create an account to embark on tailored spiritual growth.'}
        </p>
      </div>

      {/* Google OAuth Sign-In */}
      <GoogleAuthButton
        disabled={submitting}
        loading={oauthSubmitting}
        onClick={() => void handleGoogleSignIn()}
      />

      {/* Email separator */}
      <div className="relative my-5 flex items-center justify-center lg:my-6">
        <div className="h-px w-full bg-surface-variant lg:bg-surface-container-high" />
        <span className="absolute bg-surface-container-lowest px-3 font-body-sm text-body-sm text-on-surface-variant lg:px-4 lg:font-label-sm lg:text-label-sm lg:uppercase lg:tracking-wider lg:text-outline">
          <span className="lg:hidden">or with email</span>
          <span className="hidden lg:inline">or continue with email</span>
        </span>
      </div>

      {/* Status & Feedback Banners */}
      {sessionExpiredNotice ? (
        <div
          className="mb-4 flex items-start gap-2.5 rounded-xl bg-error-container px-3.5 py-3 font-body-sm text-body-sm text-on-error-container"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{sessionExpiredNotice}</span>
        </div>
      ) : null}

      {oauthErrorNotice ? (
        <div
          className="mb-4 flex items-start gap-2.5 rounded-xl bg-error-container px-3.5 py-3 font-body-sm text-body-sm text-on-error-container"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{oauthErrorNotice}</span>
        </div>
      ) : null}

      {errorMessage ? (
        <div
          className="mb-4 flex items-start gap-2.5 rounded-xl bg-error-container px-3.5 py-3 font-body-sm text-body-sm text-on-error-container"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      {confirmationEmail ? (
        <div
          className="mb-4 flex items-start gap-2.5 rounded-xl bg-primary-fixed px-3.5 py-3 font-body-sm text-body-sm text-on-primary-fixed"
          role="status"
        >
          <MailCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Confirm your email address</p>
            <p className="mt-0.5">
              We sent a verification link to <span className="font-semibold">{confirmationEmail}</span>.
              Please verify your email before logging in.
            </p>
          </div>
        </div>
      ) : null}

      {/* Authentication Form */}
      <form className="flex flex-col gap-3.5 lg:gap-4" noValidate onSubmit={(e) => void handleSubmit(e)}>
        {!isLogin ? (
          <TextInputField
            autoComplete="name"
            disabled={isBusy}
            icon={<ContactRound className="h-5 w-5" />}
            id="auth-fullname"
            label="Full Name"
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="e.g. Zayd Ibrahim"
            required
            rightHint="For personalized learning"
            value={form.fullName}
          />
        ) : null}

        <TextInputField
          autoComplete="email"
          disabled={isBusy}
          icon={<Mail className="h-5 w-5" />}
          id="auth-email"
          label="Email Address"
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="you@domain.com"
          required
          type="email"
          value={form.email}
        />

        <PasswordField
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          disabled={isBusy}
          icon={<Lock className="h-5 w-5" />}
          id="auth-password"
          label="Password"
          labelAccessory={
            isLogin ? (
              <Link
                className="hidden font-label-sm text-label-sm font-semibold text-primary hover:underline lg:inline"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            ) : undefined
          }
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
          required
          toggleLabel="Toggle password visibility"
          value={form.password}
        />

        {!isLogin ? (
          <PasswordField
            autoComplete="new-password"
            disabled={isBusy}
            icon={<CheckCircle2 className="h-5 w-5" />}
            id="auth-confirm-password"
            label="Confirm Password"
            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Re-enter your password"
            required
            toggleLabel="Toggle confirm password visibility"
            value={form.confirmPassword}
          />
        ) : null}

        {/* Utilities / Consent row */}
        {isLogin ? (
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer select-none items-center gap-2 lg:gap-2.5">
              <input
                checked={form.rememberMe}
                className="h-4 w-4 cursor-pointer rounded accent-primary focus:ring-primary"
                disabled={isBusy}
                onChange={(e) => setForm((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                type="checkbox"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant lg:hidden">
                Remember me
              </span>
              <span className="hidden font-label-sm text-label-sm text-on-surface-variant lg:inline">
                Remember my device for 30 days
              </span>
            </label>
            <Link
              className="font-label-md text-label-md text-primary transition-colors hover:text-primary-container lg:hidden"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        ) : (
          <div className="hidden items-center gap-2.5 pt-1 sm:flex">
            <input
              checked={form.marketingConsent}
              className="h-4 w-4 cursor-pointer rounded accent-primary focus:ring-primary"
              disabled={isBusy}
              id="register-consent-checkbox"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, marketingConsent: e.target.checked }))
              }
              type="checkbox"
            />
            <label
              className="cursor-pointer select-none font-label-sm text-label-sm text-on-surface-variant"
              htmlFor="register-consent-checkbox"
            >
              I agree to receive reflective study insights and reminders
            </label>
          </div>
        )}

        <PrimaryButton
          disabled={isBusy}
          icon={
            submitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )
          }
        >
          {submitting ? (
            <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
          ) : isLogin ? (
            <>
              <span className="lg:hidden">Continue to TARBIYAH</span>
              <span className="hidden lg:inline">Sign In to TARBIYAH</span>
            </>
          ) : (
            <>
              <span className="lg:hidden">Create Free Account</span>
              <span className="hidden lg:inline">Create Account</span>
            </>
          )}
        </PrimaryButton>
      </form>

      {/* Bottom contextual mode switch */}
      <div className="mt-4 pt-3 text-center lg:mt-6 lg:pt-0">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {isLogin ? (
            <>
              <span className="lg:hidden">New to TARBIYAH?</span>
              <span className="hidden lg:inline">Don&apos;t have an account?</span>{' '}
              <button
                className="ml-1 inline-flex cursor-pointer items-center font-label-md text-label-md font-semibold text-primary hover:underline lg:font-body-sm lg:text-body-sm"
                disabled={isBusy}
                onClick={() => handleModeChange('register')}
                type="button"
              >
                <span className="lg:hidden">Create an account</span>
                <span className="hidden lg:inline">Create Account</span>
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="ml-1 inline-flex cursor-pointer items-center font-label-md text-label-md font-semibold text-primary hover:underline lg:font-body-sm lg:text-body-sm"
                disabled={isBusy}
                onClick={() => handleModeChange('login')}
                type="button"
              >
                <span className="lg:hidden">Log in here</span>
                <span className="hidden lg:inline">Log In</span>
              </button>
            </>
          )}
        </p>
      </div>
    </AuthLayout>
  );
}
