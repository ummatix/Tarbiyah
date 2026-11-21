import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import {
  extractOAuthErrorFromUrl,
  getCurrentSession,
  isSessionExpired,
  logout as signOutService,
  subscribeToAuthChanges,
} from '../services/authService';

const RECOVERY_SESSION_KEY = 'tarbiyah_recovery_active';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isRecoverySession: boolean;
  sessionExpiredNotice: string | null;
  oauthErrorNotice: string | null;
  clearSessionExpiredNotice: () => void;
  clearOAuthErrorNotice: () => void;
  markRecoverySession: (active: boolean) => void;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredRecoveryFlag(): boolean {
  try {
    return window.sessionStorage.getItem(RECOVERY_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStoredRecoveryFlag(active: boolean): void {
  try {
    if (active) {
      window.sessionStorage.setItem(RECOVERY_SESSION_KEY, '1');
    } else {
      window.sessionStorage.removeItem(RECOVERY_SESSION_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRecoverySession, setIsRecoverySession] = useState<boolean>(() => readStoredRecoveryFlag());
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState<string | null>(null);
  const [oauthErrorNotice, setOAuthErrorNotice] = useState<string | null>(() =>
    extractOAuthErrorFromUrl(window.location.pathname, window.location.search, window.location.hash)
  );
  const manualSignOutRef = useRef(false);
  const hadSessionRef = useRef(false);

  useEffect(() => {
    if (oauthErrorNotice && window.location.pathname !== '/reset-password') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [oauthErrorNotice]);

  const markRecoverySession = useCallback((active: boolean) => {
    writeStoredRecoveryFlag(active);
    setIsRecoverySession(active);
  }, []);

  useEffect(() => {
    let active = true;

    async function bootstrapSession() {
      const { session: initialSession, expired } = await getCurrentSession();
      if (!active) return;

      if (expired) {
        setSession(null);
        hadSessionRef.current = false;
        markRecoverySession(false);
        setSessionExpiredNotice('Your session has expired. Please sign in again.');
      } else {
        setSession(initialSession);
        hadSessionRef.current = Boolean(initialSession);
        if (!initialSession) {
          markRecoverySession(false);
        }
      }
      setLoading(false);
    }

    void bootstrapSession();

    const unsubscribe = subscribeToAuthChanges((event, nextSession) => {
      if (!active) return;

      if (nextSession && isSessionExpired(nextSession)) {
        setSession(null);
        hadSessionRef.current = false;
        markRecoverySession(false);
        setSessionExpiredNotice('Your session has expired. Please sign in again.');
        setLoading(false);
        return;
      }

      if (event === 'PASSWORD_RECOVERY') {
        markRecoverySession(true);
        setSessionExpiredNotice(null);
        hadSessionRef.current = Boolean(nextSession);
        setSession(nextSession);
        setLoading(false);
        return;
      }

      if (event === 'SIGNED_OUT') {
        if (!manualSignOutRef.current && hadSessionRef.current) {
          setSessionExpiredNotice('Your session has expired. Please sign in again.');
        }
        manualSignOutRef.current = false;
        hadSessionRef.current = false;
        markRecoverySession(false);
        setSession(null);
        setLoading(false);
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        setSessionExpiredNotice(null);
      }

      hadSessionRef.current = Boolean(nextSession);
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [markRecoverySession]);

  const clearSessionExpiredNotice = useCallback(() => {
    setSessionExpiredNotice(null);
  }, []);

  const clearOAuthErrorNotice = useCallback(() => {
    setOAuthErrorNotice(null);
  }, []);

  const signOut = useCallback(async () => {
    manualSignOutRef.current = true;
    markRecoverySession(false);
    await signOutService();
    setSession(null);
    hadSessionRef.current = false;
  }, [markRecoverySession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      isAuthenticated: Boolean(session?.user),
      isRecoverySession,
      sessionExpiredNotice,
      oauthErrorNotice,
      clearSessionExpiredNotice,
      clearOAuthErrorNotice,
      markRecoverySession,
      signOut,
    }),
    [
      session,
      loading,
      isRecoverySession,
      sessionExpiredNotice,
      oauthErrorNotice,
      clearSessionExpiredNotice,
      clearOAuthErrorNotice,
      markRecoverySession,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
