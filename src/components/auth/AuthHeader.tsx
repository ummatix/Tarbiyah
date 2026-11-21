import { Globe, HelpCircle, User } from 'lucide-react';
import type { AuthMode } from '../../types/auth';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

interface AuthHeaderProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthHeader({ mode, onModeChange }: AuthHeaderProps) {
  return (
    <header className="pt-safe sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-xl shadow-theme-header">
      <div className="flex h-16 w-full items-center justify-between px-margin-mobile lg:px-margin">
        {/* Typographic wordmark (broken Stitch logo URL intentionally omitted) */}
        <div className="flex items-center gap-space-sm">
          <span className="font-heading text-title-md font-bold tracking-tight text-on-surface">
            TARBIYAH
          </span>
        </div>

        {/* Mobile & Tablet utility actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeSwitcher />
          <a
            aria-label="Help & Support"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-primary"
            href="#help"
            onClick={(e) => e.preventDefault()}
          >
            <HelpCircle className="h-6 w-6" />
          </a>
        </div>

        {/* Desktop navigation */}
        <nav aria-label="Authentication navigation" className="hidden items-center gap-space-lg lg:flex">
          <button
            aria-current={mode === 'login' ? 'page' : undefined}
            className={
              mode === 'login'
                ? 'cursor-pointer rounded-full bg-surface-container px-3.5 py-1.5 font-label-md text-label-md text-primary transition-colors'
                : 'cursor-pointer font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-on-surface'
            }
            onClick={() => onModeChange('login')}
            type="button"
          >
            Sign In
          </button>
          <button
            aria-current={mode === 'register' ? 'page' : undefined}
            className={
              mode === 'register'
                ? 'cursor-pointer rounded-full bg-surface-container px-3.5 py-1.5 font-label-md text-label-md text-primary transition-colors'
                : 'cursor-pointer font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-on-surface'
            }
            onClick={() => onModeChange('register')}
            type="button"
          >
            Create Account
          </button>
          <a
            className="font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-on-surface"
            href="#help"
            onClick={(e) => e.preventDefault()}
          >
            Help
          </a>
          <div className="flex items-center gap-space-xs pl-space-sm text-on-surface-variant">
            <Globe className="h-[18px] w-[18px]" />
            <span className="font-label-sm text-label-sm">EN</span>
          </div>
          <ThemeSwitcher />
          <div
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
          >
            <User className="h-[18px] w-[18px]" />
          </div>
        </nav>
      </div>
    </header>
  );
}
