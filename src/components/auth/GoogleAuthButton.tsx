import { Loader2 } from 'lucide-react';
import { GoogleIcon } from '../../assets/GoogleIcon';

interface GoogleAuthButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GoogleAuthButton({ onClick, disabled, loading = false }: GoogleAuthButtonProps) {
  return (
    <button
      aria-busy={loading}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-transparent bg-surface-container-low px-4 font-label-lg text-label-lg font-semibold text-on-surface transition-all hover:bg-surface-container active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:border-outline-variant/90 dark:bg-surface-container-low lg:h-auto lg:bg-surface-container-lowest lg:py-3 lg:shadow-sm lg:hover:shadow lg:dark:bg-surface-container-low"
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-primary" />
      ) : (
        <GoogleIcon className="h-5 w-5 shrink-0" />
      )}
      <span>{loading ? 'Connecting to Google...' : 'Continue with Google'}</span>
    </button>
  );
}
