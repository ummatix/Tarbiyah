import type { ReactNode } from 'react';
import { ArrowLeft, Sparkles, User } from 'lucide-react';
import { ThemeSwitcher } from '../../../components/ui/ThemeSwitcher';

interface OnboardingShellProps {
  children: ReactNode;
  onMobileBack?: () => void;
  hasBottomBar?: boolean;
}

export function OnboardingShell({
  children,
  onMobileBack,
  hasBottomBar = false,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between overflow-x-clip bg-surface-container-low text-on-surface antialiased dark:bg-surface lg:bg-surface">
      <header className="pt-safe sticky top-0 z-50 w-full bg-surface/85 backdrop-blur-xl shadow-theme-header">
        {/* Mobile & Tablet Header (<1024px) */}
        <div className="flex h-16 items-center justify-between px-margin-mobile sm:px-margin lg:hidden">
          <button
            aria-label="Go back"
            className="-ml-2 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full text-on-surface transition-colors hover:text-primary"
            onClick={onMobileBack}
            type="button"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-heading text-headline-sm font-bold tracking-wider text-on-surface">
              TARBIYAH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
            >
              <User className="h-[18px] w-[18px]" />
            </div>
          </div>
        </div>

        {/* Desktop Header (>=1024px) */}
        <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between px-6 lg:flex lg:px-12">
          <div className="flex items-center gap-space-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary shadow-theme-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-heading text-title-md font-bold tracking-wider text-primary">
              TARBIYAH
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            <ThemeSwitcher />
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
            >
              <User className="h-[18px] w-[18px]" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex w-full flex-1 flex-col">
        {/* Ambient blurred background orbs strictly inside background layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
        >
          <div className="absolute -top-32 left-1/2 h-[360px] w-[720px] -translate-x-1/2 bg-gradient-to-b from-primary-fixed/40 via-surface-container/20 to-transparent blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-secondary-container/10 blur-2xl" />
          <div className="absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-tertiary-fixed/20 blur-2xl" />
        </div>

        <div
          className={`relative z-10 w-full flex-1 ${
            hasBottomBar ? 'pb-28 lg:pb-12' : 'pb-10 lg:pb-12'
          }`}
        >
          {children}
        </div>
      </main>

      <footer className="hidden w-full bg-surface-container-low py-6 shadow-theme-footer lg:block">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-sm px-6 text-center sm:flex-row sm:text-left lg:px-12">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 TARBIYAH. Spiritual refinement &amp; purposeful growth.
          </span>
          <div className="flex items-center gap-space-md">
            <a
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
              href="#privacy"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
              href="#terms"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Guidance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
