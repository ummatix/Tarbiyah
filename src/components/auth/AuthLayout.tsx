import type { ReactNode } from 'react';
import { BadgeCheck } from 'lucide-react';
import { IslamicGeometryBackdrop } from '../../assets/IslamicGeometry';
import type { AuthMode } from '../../types/auth';
import { AuthFooter } from './AuthFooter';
import { AuthHeader } from './AuthHeader';
import { CompanionShowcase } from './CompanionShowcase';

interface AuthLayoutProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  mobileTitle?: string;
  mobileSubtitle?: string;
  children: ReactNode;
}

export function AuthLayout({
  mode,
  onModeChange,
  mobileTitle,
  mobileSubtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-between overflow-x-clip bg-surface text-on-surface antialiased">
      <AuthHeader mode={mode} onModeChange={onModeChange} />

      <main className="pb-safe relative flex w-full flex-1 flex-col bg-surface px-margin-mobile sm:px-margin lg:px-0">
        {/* Ambient spiritual background glows + watermark contained strictly to background layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
        >
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-fixed/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-secondary-fixed/40 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035]">
            <IslamicGeometryBackdrop className="h-full w-full" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col pb-4 pt-3 sm:max-w-lg sm:py-8 lg:max-w-none lg:items-center lg:justify-center lg:p-space-xl">
          {/* Mobile & Tablet compact hero banner */}
          <CompanionShowcase
            mode={mode}
            subtitleOverride={mobileSubtitle}
            titleOverride={mobileTitle}
            variant="mobile"
          />

          {/* Responsive Split Container on Desktop / Sheet Card on Mobile & Tablet */}
          <div className="relative w-full rounded-3xl bg-surface-container-lowest p-5 shadow-theme-elevated dark:ring-1 dark:ring-outline-variant/80 sm:p-8 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:overflow-clip lg:rounded-[2rem] lg:p-0">
            <CompanionShowcase mode={mode} variant="desktop" />

            <div className="flex flex-col justify-between bg-surface-container-lowest lg:col-span-6 lg:rounded-r-[2rem] lg:p-10 xl:p-14">
              <div className="mx-auto w-full lg:max-w-md">{children}</div>

              {/* Desktop in-card legal agreement */}
              <div className="mt-8 hidden w-full border-t border-surface-container pt-4 text-center dark:border-outline-variant/60 lg:block">
                <p className="mx-auto max-w-sm font-label-sm text-label-sm text-outline">
                  By continuing, you agree to TARBIYAH&apos;s{' '}
                  <a
                    className="text-on-surface-variant underline transition-colors hover:text-primary"
                    href="#terms"
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    className="text-on-surface-variant underline transition-colors hover:text-primary"
                    href="#privacy"
                    onClick={(e) => e.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet companion note (TODO: Confirm verified student count; Stitch mobile 45,000 vs desktop 25,000+) */}
          <div className="mt-4 flex items-center justify-center gap-2 px-3 text-center lg:hidden">
            <BadgeCheck className="h-[18px] w-[18px] shrink-0 text-tertiary" />
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Students growing in faith &amp; knowledge together.
            </span>
          </div>

          <AuthFooter variant="mobile" />
        </div>
      </main>

      <AuthFooter variant="desktop" />
    </div>
  );
}
