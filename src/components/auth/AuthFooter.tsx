interface AuthFooterProps {
  variant: 'mobile' | 'desktop';
}

export function AuthFooter({ variant }: AuthFooterProps) {
  if (variant === 'mobile') {
    return (
      <footer className="mt-auto py-space-lg text-center lg:hidden">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          By continuing, you agree to the{' '}
          <a
            className="font-label-sm text-label-sm text-primary underline transition-colors hover:text-primary-container"
            href="#terms"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Service
          </a>{' '}
          &amp;{' '}
          <a
            className="font-label-sm text-label-sm text-primary underline transition-colors hover:text-primary-container"
            href="#privacy"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
        </p>
      </footer>
    );
  }

  return (
    <footer className="hidden w-full bg-surface-container-low py-space-md lg:block">
      <div className="flex w-full items-center justify-between px-margin font-body-sm text-body-sm text-on-surface-variant">
        <p>© 2025 TARBIYAH. Cultivating Mind, Character &amp; Faith.</p>
        <div className="flex items-center gap-space-lg">
          <a
            className="transition-colors hover:text-on-surface"
            href="#privacy"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
          <a
            className="transition-colors hover:text-on-surface"
            href="#terms"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Service
          </a>
          <a
            className="transition-colors hover:text-on-surface"
            href="#support"
            onClick={(e) => e.preventDefault()}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
