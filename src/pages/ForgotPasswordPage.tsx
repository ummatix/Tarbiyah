import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, ArrowRight, Loader2, Mail, MailCheck } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { TextInputField } from '../components/ui/TextInputField';
import { mapSupabaseAuthError, requestPasswordReset } from '../features/auth/services/authService';
import type { AuthMode } from '../types/auth';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleModeChange = (nextMode: AuthMode) => {
    navigate(nextMode === 'login' ? '/login' : '/register');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setErrorMessage(null);
    setSubmittedEmail(null);
    setSubmitting(true);

    try {
      await requestPasswordReset(email);
      setSubmittedEmail(email.trim().toLowerCase());
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      setErrorMessage(mapped.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      mobileSubtitle="Enter your email to receive a reset link."
      mobileTitle="Reset your password"
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

      <div className="mb-6">
        <h2 className="font-heading text-headline-md font-bold tracking-tight text-on-surface">
          Forgot your password?
        </h2>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
          Enter the email address associated with your account and we&apos;ll send instructions to
          reset your password.
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

      {submittedEmail ? (
        <div
          className="mb-5 flex items-start gap-2.5 rounded-xl bg-primary-fixed px-4 py-3.5 font-body-sm text-body-sm text-on-primary-fixed"
          role="status"
        >
          <MailCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">Check your inbox</p>
            <p className="mt-0.5">
              If an account exists for <span className="font-semibold">{submittedEmail}</span>, we
              have sent a password recovery link. Please check your inbox and spam folder.
            </p>
          </div>
        </div>
      ) : null}

      <form className="flex flex-col gap-4" noValidate onSubmit={(e) => void handleSubmit(e)}>
        <TextInputField
          autoComplete="email"
          disabled={submitting}
          icon={<Mail className="h-5 w-5" />}
          id="forgot-email"
          label="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          required
          type="email"
          value={email}
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
          {submitting ? 'Sending Reset Link...' : 'Send Reset Link'}
        </PrimaryButton>
      </form>

      <div className="mt-5 pt-2 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Remembered your password?{' '}
          <Link
            className="ml-1 font-label-md text-label-md font-semibold text-primary hover:underline"
            to="/login"
          >
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

