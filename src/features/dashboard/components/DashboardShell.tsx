import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  CalendarDays,
  Compass,
  HandHeart,
  Home,
  LogOut,
  MessageCircleQuestion,
  SlidersHorizontal,
  Sparkles,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../../../components/ui/ThemeSwitcher';
import { useAuth } from '../../auth/hooks/useAuth';
import {
  MOBILE_NAV_ITEMS,
  type NavItemId,
} from '../data/dashboardContent';
import { DesktopSidebar } from './desktop/DesktopSidebar';

const NAV_ICONS: Record<NavItemId, ReactNode> = {
  home: <Home className="h-[18px] w-[18px]" />,
  journey: <Compass className="h-[18px] w-[18px]" />,
  prayer: <HandHeart className="h-[18px] w-[18px]" />,
  calendar: <CalendarDays className="h-[18px] w-[18px]" />,
  ask: <MessageCircleQuestion className="h-[18px] w-[18px]" />,
  profile: <User className="h-[18px] w-[18px]" />,
};

interface DashboardShellProps {
  children: ReactNode;
  displayName: string;
}

export function DashboardShell({ children, displayName }: DashboardShellProps) {
  const { user, signOut } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accountOpen]);

  const handleSignOut = async () => {
    setSignOutError(null);
    setSigningOut(true);
    try {
      await signOut();
    } catch (err) {
      setSignOutError(
        err instanceof Error ? err.message : 'Unable to sign out. Please try again.'
      );
      setSigningOut(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface antialiased">
      {/* Desktop Left Sidebar (>=1024px) */}
      <div className="hidden lg:flex">
        <DesktopSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#F5F2FF] dark:bg-surface">
        {/* Compact Top Header */}
        <header className="pt-safe sticky top-0 z-40 border-b border-outline-variant/35 bg-surface/85 backdrop-blur-xl dark:border-outline-variant/70 lg:static lg:border-b-0 lg:bg-transparent lg:pt-5 lg:backdrop-blur-none">
          <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-margin-mobile sm:px-margin lg:h-12 lg:max-w-[1120px] lg:px-8">
            {/* Mobile & Tablet Branding */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-on-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-heading text-title-md font-bold tracking-wider text-on-surface">
                TARBIYAH
              </span>
            </div>

            {/* Subtle Desktop Spacer / Context */}
            <div className="hidden lg:block" />

            {/* Right Utility Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <ThemeSwitcher />

              <div className="relative" ref={menuRef}>
                <button
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  aria-label="Account menu"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-outline-variant/60 bg-surface-container-lowest text-on-surface transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-outline-variant"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  type="button"
                >
                  <User className="h-4 w-4" />
                </button>

                {accountOpen ? (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3 shadow-theme-elevated dark:border-outline-variant"
                    role="menu"
                  >
                    <div className="border-b border-outline-variant/40 px-2 pb-2.5 dark:border-outline-variant/75">
                      <p className="truncate font-label-md text-label-md font-semibold text-on-surface">
                        {displayName}
                      </p>
                      {user?.email ? (
                        <p className="truncate font-body-sm text-body-sm text-on-surface-variant">
                          {user.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                      <Link
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 font-body-sm text-body-sm text-on-surface transition-colors hover:bg-surface-container"
                        onClick={() => setAccountOpen(false)}
                        role="menuitem"
                        to="/onboarding"
                      >
                        <SlidersHorizontal className="h-4 w-4 text-outline" />
                        <span>Learning preferences</span>
                      </Link>
                      <button
                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left font-body-sm text-body-sm text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={signingOut}
                        onClick={() => void handleSignOut()}
                        role="menuitem"
                        type="button"
                      >
                        <LogOut className="h-4 w-4 text-primary" />
                        <span>{signingOut ? 'Signing out...' : 'Log Out'}</span>
                      </button>
                    </div>

                    {signOutError ? (
                      <p className="mt-2 px-2 font-body-sm text-body-sm text-error" role="alert">
                        {signOutError}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <button
                className="hidden min-h-[38px] cursor-pointer items-center gap-1.5 rounded-full border border-outline-variant/60 px-3.5 py-1.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-outline-variant sm:inline-flex"
                disabled={signingOut}
                onClick={() => void handleSignOut()}
                type="button"
              >
                <LogOut className="h-3.5 w-3.5 text-primary" />
                <span>{signingOut ? 'Signing out...' : 'Log Out'}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-4xl flex-1 px-margin-mobile pb-28 pt-8 sm:px-margin sm:pt-10 lg:max-w-[1120px] lg:px-8 lg:pb-16 lg:pt-6">
          {children}
        </main>
      </div>

      {/* Fixed Mobile & Tablet Bottom Navigation (<1024px) */}
      <nav
        aria-label="Mobile dashboard navigation"
        className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/50 bg-surface-container-lowest/95 shadow-theme-dock backdrop-blur-md dark:border-outline-variant lg:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {MOBILE_NAV_ITEMS.map((item) => {
            if (item.implemented) {
              return (
                <Link
                  aria-current="page"
                  className="flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 py-2 text-primary"
                  key={item.id}
                  to="/app"
                >
                  <span aria-hidden="true">{NAV_ICONS[item.id]}</span>
                  <span className="font-label-sm text-label-sm font-semibold">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                aria-disabled="true"
                aria-label={`${item.label} (Coming soon)`}
                className="flex min-h-[56px] cursor-not-allowed flex-col items-center justify-center gap-1 px-1 py-2 text-on-surface-variant/55"
                disabled
                key={item.id}
                title="Coming soon"
                type="button"
              >
                <span aria-hidden="true">{NAV_ICONS[item.id]}</span>
                <span className="font-label-sm text-label-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
