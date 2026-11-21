import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../features/theme/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`theme-transition-safe group relative inline-flex h-9 w-[66px] shrink-0 cursor-pointer items-center rounded-full border border-glass-border/75 bg-glass-surface/65 p-1 shadow-sm backdrop-blur-md transition-colors duration-200 hover:border-primary/45 hover:bg-glass-surface/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none sm:h-10 sm:w-[74px] ${className}`}
      data-testid="theme-switcher"
      onClick={toggleTheme}
      role="switch"
      title={isDark ? 'Switch to Light Theme' : 'Switch to Serene Midnight Dark Theme'}
      type="button"
    >
      {/* Sliding frosted glass selection indicator */}
      <span
        aria-hidden="true"
        className={`theme-transition-safe pointer-events-none absolute left-1 top-1 h-[26px] w-[28px] rounded-full border border-primary/35 bg-primary/15 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[30px] sm:w-8 ${
          isDark
            ? 'translate-x-[28px] border-primary/50 bg-primary/20 sm:translate-x-8'
            : 'translate-x-0'
        }`}
      />

      <span className="relative z-10 flex flex-1 items-center justify-center">
        <Sun
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-all duration-200 motion-reduce:transition-none sm:h-4 sm:w-4 ${
            !isDark
              ? 'scale-105 text-primary'
              : 'scale-90 text-on-surface-variant opacity-70 group-hover:opacity-95'
          }`}
        />
      </span>
      <span className="relative z-10 flex flex-1 items-center justify-center">
        <Moon
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-all duration-200 motion-reduce:transition-none sm:h-4 sm:w-4 ${
            isDark
              ? 'scale-105 text-primary'
              : 'scale-90 text-on-surface-variant opacity-70 group-hover:opacity-95'
          }`}
        />
      </span>
    </button>
  );
}

