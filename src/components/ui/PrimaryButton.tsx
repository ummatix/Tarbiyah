import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  icon?: ReactNode;
}

export function PrimaryButton({
  children,
  icon,
  type = 'submit',
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className="mt-2 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-container px-6 font-headline-sm text-headline-sm tracking-wide text-on-primary shadow-theme-primary transition-all hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65 lg:h-auto lg:rounded-full lg:py-3.5 lg:font-title-md lg:text-title-md lg:font-bold lg:shadow-lg lg:shadow-primary/25 lg:hover:scale-[1.01] lg:hover:opacity-100 lg:hover:shadow-xl lg:hover:shadow-primary/35 lg:disabled:hover:scale-100"
      disabled={disabled}
      type={type}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="flex items-center">
          {icon}
        </span>
      ) : null}
    </button>
  );
}
