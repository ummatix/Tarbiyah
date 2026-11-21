import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase/client';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  marketingConsent?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type RegisterResult =
  | {
      status: 'authenticated';
      user: User;
      session: Session;
    }
  | {
      status: 'confirmation_required';
      user: User | null;
      session: null;
      email: string;
    };

export interface LoginResult {
  user: User;
  session: Session;
}

export class AuthServiceError extends Error {
  readonly code:
    | 'invalid_email'
    | 'weak_password'
    | 'password_mismatch'
    | 'same_password'
    | 'existing_account'
    | 'invalid_credentials'
    | 'email_not_confirmed'
    | 'network_error'
    | 'session_expired'
    | 'rate_limited'
    | 'invalid_recovery_link'
    | 'oauth_error'
    | 'unknown';

  constructor(code: AuthServiceError['code'], message: string) {
    super(message);
    this.name = 'AuthServiceError';
    this.code = code;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmailFormat(email: string): string {
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_PATTERN.test(normalized)) {
    throw new AuthServiceError('invalid_email', 'Please enter a valid email address.');
  }
  return normalized;
}

export function validateRegistrationInputs(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): { fullName: string; email: string; password: string } {
  const trimmedName = fullName.trim();
  if (!trimmedName) {
    throw new AuthServiceError('unknown', 'Please enter your full name.');
  }

  const normalizedEmail = validateEmailFormat(email);

  if (password.length < 6) {
    throw new AuthServiceError(
      'weak_password',
      'Password is too weak. Please use at least 6 characters.'
    );
  }

  if (password !== confirmPassword) {
    throw new AuthServiceError(
      'password_mismatch',
      'Passwords do not match. Please re-enter both password fields.'
    );
  }

  return {
    fullName: trimmedName,
    email: normalizedEmail,
    password,
  };
}

export function mapSupabaseAuthError(error: unknown): AuthServiceError {
  if (error instanceof AuthServiceError) {
    return error;
  }

  const rawMessage =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : '';
  const rawCode =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : '';
  const errorName =
    typeof error === 'object' && error !== null && 'name' in error
      ? String((error as { name: unknown }).name)
      : '';

  const msg = rawMessage.toLowerCase();
  const code = rawCode.toLowerCase();

  if (
    errorName === 'AuthRetryableFetchError' ||
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('network request failed') ||
    msg.includes('fetch failed')
  ) {
    return new AuthServiceError(
      'network_error',
      'Network error: unable to reach authentication service. Please check your connection and try again.'
    );
  }

  if (
    code === 'user_already_exists' ||
    code === 'email_exists' ||
    msg.includes('already registered') ||
    msg.includes('already exists')
  ) {
    return new AuthServiceError(
      'existing_account',
      'An account with this email already exists. Please log in instead.'
    );
  }

  if (
    code === 'email_not_confirmed' ||
    msg.includes('email not confirmed') ||
    msg.includes('confirm your email')
  ) {
    return new AuthServiceError(
      'email_not_confirmed',
      'Email confirmation is required before logging in. Please check your inbox for the verification link.'
    );
  }

  if (
    code === 'invalid_credentials' ||
    msg.includes('invalid login credentials') ||
    msg.includes('invalid email or password')
  ) {
    return new AuthServiceError(
      'invalid_credentials',
      'Incorrect email or password. Please verify your credentials and try again.'
    );
  }

  if (
    code === 'provider_disabled' ||
    msg.includes('provider is not enabled') ||
    msg.includes('unsupported provider')
  ) {
    return new AuthServiceError(
      'oauth_error',
      'Google sign-in is currently unavailable. Please continue with email.'
    );
  }

  if (code === 'access_denied' || msg.includes('access_denied')) {
    return new AuthServiceError(
      'oauth_error',
      'Google sign-in was cancelled. Please try again or continue with email.'
    );
  }

  if (
    code === 'same_password' ||
    msg.includes('new password should be different') ||
    msg.includes('different from the old password')
  ) {
    return new AuthServiceError(
      'same_password',
      'New password must be different from your previous password.'
    );
  }

  if (
    code === 'over_email_send_rate_limit' ||
    code === 'over_request_rate_limit' ||
    msg.includes('rate limit')
  ) {
    return new AuthServiceError(
      'rate_limited',
      'Too many requests. Please wait a moment before trying again.'
    );
  }

  if (
    code === 'otp_expired' ||
    code === 'flow_state_expired' ||
    msg.includes('link is invalid or has expired') ||
    msg.includes('token has expired')
  ) {
    return new AuthServiceError(
      'invalid_recovery_link',
      'This password reset link is invalid or has expired. Please request a new one.'
    );
  }

  if (
    code === 'weak_password' ||
    msg.includes('password should be at least') ||
    msg.includes('weak password')
  ) {
    return new AuthServiceError(
      'weak_password',
      rawMessage || 'Password is too weak. Please choose a stronger password.'
    );
  }

  if (
    code === 'validation_failed' ||
    code === 'email_address_invalid' ||
    msg.includes('unable to validate email address') ||
    msg.includes('invalid format')
  ) {
    return new AuthServiceError('invalid_email', 'Please enter a valid email address.');
  }

  if (
    code === 'session_expired' ||
    code === 'refresh_token_not_found' ||
    msg.includes('refresh token') ||
    msg.includes('jwt expired') ||
    msg.includes('session expired')
  ) {
    return new AuthServiceError(
      'session_expired',
      'Your session has expired. Please sign in again.'
    );
  }

  return new AuthServiceError(
    'unknown',
    rawMessage || 'An unexpected authentication error occurred. Please try again.'
  );
}

export async function registerWithEmail({
  fullName,
  email,
  password,
  marketingConsent = false,
}: RegisterPayload): Promise<RegisterResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          full_name: fullName,
          marketing_consent: marketingConsent,
        },
      },
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    // Supabase returns empty identities when an account already exists and email confirmation is enabled
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      throw new AuthServiceError(
        'existing_account',
        'An account with this email already exists. Please log in instead.'
      );
    }

    if (!data.session) {
      return {
        status: 'confirmation_required',
        user: data.user,
        session: null,
        email,
      };
    }

    if (!data.user) {
      throw new AuthServiceError('unknown', 'Registration succeeded but no user profile returned.');
    }

    return {
      status: 'authenticated',
      user: data.user,
      session: data.session,
    };
  } catch (err) {
    throw mapSupabaseAuthError(err);
  }
}

export async function loginWithEmail({ email, password }: LoginPayload): Promise<LoginResult> {
  const normalizedEmail = validateEmailFormat(email);

  if (!password) {
    throw new AuthServiceError('invalid_credentials', 'Please enter your password.');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    if (!data.session || !data.user) {
      throw new AuthServiceError(
        'invalid_credentials',
        'Unable to establish a session. Please try again.'
      );
    }

    return {
      user: data.user,
      session: data.session,
    };
  } catch (err) {
    throw mapSupabaseAuthError(err);
  }
}

export async function signInWithGoogle(): Promise<void> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }

    if (!data?.url) {
      throw new AuthServiceError(
        'oauth_error',
        'Unable to start Google sign-in. Please try again.'
      );
    }
  } catch (err) {
    throw mapSupabaseAuthError(err);
  }
}

export function extractOAuthErrorFromUrl(pathname: string, search: string, hash: string): string | null {
  if (pathname === '/reset-password') {
    return null;
  }

  const searchParams = new URLSearchParams(search);
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
  const errorCode = searchParams.get('error') || hashParams.get('error');
  const errorDescription =
    searchParams.get('error_description') || hashParams.get('error_description');

  if (!errorCode && !errorDescription) {
    return null;
  }

  if (errorCode === 'access_denied') {
    return 'Google sign-in was cancelled. Please try again or continue with email.';
  }

  return errorDescription || 'Google sign-in could not be completed. Please try again.';
}

export async function logout(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw mapSupabaseAuthError(error);
    }
  } catch (err) {
    throw mapSupabaseAuthError(err);
  }
}

export function isSessionExpired(session: Session | null): boolean {
  if (!session?.expires_at) {
    return false;
  }
  return session.expires_at * 1000 <= Date.now();
}

function hasStoredSupabaseSession(): boolean {
  try {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        return Boolean(window.localStorage.getItem(key));
      }
    }
  } catch {
    return false;
  }
  return false;
}

export async function getCurrentSession(): Promise<{
  session: Session | null;
  expired: boolean;
}> {
  const hadStoredSession = hasStoredSupabaseSession();

  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      const mapped = mapSupabaseAuthError(error);
      if (mapped.code === 'session_expired' || hadStoredSession) {
        await supabase.auth.signOut({ scope: 'local' });
        return { session: null, expired: true };
      }
      throw mapped;
    }

    if (!data.session && hadStoredSession) {
      return { session: null, expired: true };
    }

    if (data.session && isSessionExpired(data.session)) {
      const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError || !refreshed.session) {
        await supabase.auth.signOut({ scope: 'local' });
        return { session: null, expired: true };
      }
      return { session: refreshed.session, expired: false };
    }

    return { session: data.session, expired: false };
  } catch (err) {
    const mapped = mapSupabaseAuthError(err);
    if (mapped.code === 'session_expired' || hadStoredSession) {
      return { session: null, expired: true };
    }
    return { session: null, expired: false };
  }
}

export function subscribeToAuthChanges(
  handler: (event: AuthChangeEvent, session: Session | null) => void
): () => void {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(handler);

  return () => {
    subscription.unsubscribe();
  };
}

export function validateResetPasswordInputs(
  password: string,
  confirmPassword: string
): string {
  if (password.length < 6) {
    throw new AuthServiceError(
      'weak_password',
      'Password is too weak. Please use at least 6 characters.'
    );
  }

  if (password !== confirmPassword) {
    throw new AuthServiceError(
      'password_mismatch',
      'Passwords do not match. Please re-enter both password fields.'
    );
  }

  return password;
}

export async function requestPasswordReset(email: string): Promise<void> {
  const normalizedEmail = validateEmailFormat(email);

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      const mapped = mapSupabaseAuthError(error);
      // Security: never reveal whether an email address is registered.
      if (mapped.code === 'network_error' || mapped.code === 'rate_limited') {
        throw mapped;
      }
    }
  } catch (err) {
    const mapped = mapSupabaseAuthError(err);
    if (mapped.code === 'network_error' || mapped.code === 'rate_limited') {
      throw mapped;
    }
  }
}

export async function establishRecoverySessionFromUrl(
  search: string,
  hash: string
): Promise<{ status: 'ready' | 'invalid' | 'none'; errorMessage?: string }> {
  const searchParams = new URLSearchParams(search);
  const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);

  const errorCode = searchParams.get('error_code') || hashParams.get('error_code');
  const errorDesc = searchParams.get('error_description') || hashParams.get('error_description');
  const urlError = searchParams.get('error') || hashParams.get('error');

  if (urlError || errorCode || errorDesc) {
    return {
      status: 'invalid',
      errorMessage:
        errorCode === 'otp_expired' || errorDesc?.toLowerCase().includes('expired')
          ? 'This password reset link is invalid or has expired. Please request a new one.'
          : errorDesc || 'This password reset link is invalid or has expired. Please request a new one.',
    };
  }

  const tokenHash = searchParams.get('token_hash');
  const typeParam = searchParams.get('type') || hashParams.get('type');
  const code = searchParams.get('code');
  const hasAccessTokenInHash = Boolean(hashParams.get('access_token'));

  if (tokenHash && typeParam === 'recovery') {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'recovery',
      });
      if (error || !data.session) {
        const mapped = mapSupabaseAuthError(error);
        return {
          status: 'invalid',
          errorMessage:
            mapped.code === 'network_error'
              ? mapped.message
              : 'This password reset link is invalid or has expired. Please request a new one.',
        };
      }
      return { status: 'ready' };
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      return { status: 'invalid', errorMessage: mapped.message };
    }
  }

  if (code) {
    try {
      const { data: existing } = await supabase.auth.getSession();
      if (existing.session) {
        return { status: 'ready' };
      }
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error || !data.session) {
        return {
          status: 'invalid',
          errorMessage: 'This password reset link is invalid or has expired. Please request a new one.',
        };
      }
      return { status: 'ready' };
    } catch (err) {
      const mapped = mapSupabaseAuthError(err);
      return { status: 'invalid', errorMessage: mapped.message };
    }
  }

  if (hasAccessTokenInHash && typeParam === 'recovery') {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return {
        status: 'invalid',
        errorMessage: 'This password reset link is invalid or has expired. Please request a new one.',
      };
    }
    return { status: 'ready' };
  }

  return { status: 'none' };
}

export async function updateRecoveredPassword(newPassword: string): Promise<void> {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session || isSessionExpired(sessionData.session)) {
      throw new AuthServiceError(
        'session_expired',
        'Your password recovery session is invalid or has expired. Please request a new reset link.'
      );
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw mapSupabaseAuthError(error);
    }
  } catch (err) {
    throw mapSupabaseAuthError(err);
  }
}
