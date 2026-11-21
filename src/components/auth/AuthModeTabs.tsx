import type { AuthMode } from '../../types/auth';

interface AuthModeTabsProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthModeTabs({ mode, onModeChange }: AuthModeTabsProps) {
  const isLogin = mode === 'login';

  return (
    <div
      className="mb-5 flex w-full items-center rounded-2xl bg-surface-container p-1 dark:border dark:border-outline-variant/60 lg:mb-8 lg:rounded-full lg:bg-surface-container-low lg:p-1.5 lg:shadow-inner"
      role="tablist"
    >
      <button
        aria-selected={isLogin}
        className={`flex-1 cursor-pointer rounded-xl py-2.5 text-center font-label-lg text-label-lg transition-all duration-200 lg:rounded-full ${
          isLogin
            ? 'bg-primary-container text-on-primary-container shadow-md lg:bg-surface-container-lowest lg:font-bold lg:text-primary lg:shadow-theme-tabs'
            : 'text-on-surface-variant hover:text-on-surface lg:font-medium'
        }`}
        id="tab-login-btn"
        onClick={() => onModeChange('login')}
        role="tab"
        type="button"
      >
        Log In
      </button>
      <button
        aria-selected={!isLogin}
        className={`flex-1 cursor-pointer rounded-xl py-2.5 text-center font-label-lg text-label-lg transition-all duration-200 lg:rounded-full ${
          !isLogin
            ? 'bg-primary-container text-on-primary-container shadow-md lg:bg-surface-container-lowest lg:font-bold lg:text-primary lg:shadow-theme-tabs'
            : 'text-on-surface-variant hover:text-on-surface lg:font-medium'
        }`}
        id="tab-signup-btn"
        onClick={() => onModeChange('register')}
        role="tab"
        type="button"
      >
        Create Account
      </button>
    </div>
  );
}

