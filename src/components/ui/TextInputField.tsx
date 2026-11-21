import type { InputHTMLAttributes, ReactNode } from 'react';

interface TextInputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string;
  label: string;
  icon: ReactNode;
  rightHint?: string;
}

export function TextInputField({
  id,
  label,
  icon,
  rightHint,
  type = 'text',
  ...inputProps
}: TextInputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label
          className="font-label-md text-label-md text-on-surface-variant lg:text-on-surface lg:font-medium"
          htmlFor={id}
        >
          {label}
        </label>
        {rightHint ? (
          <span className="font-label-sm text-label-sm text-tertiary lg:hidden">{rightHint}</span>
        ) : null}
      </div>
      <div className="relative flex items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 flex items-center text-on-surface-variant lg:text-outline"
        >
          {icon}
        </span>
        <input
          className="h-12 w-full rounded-xl bg-surface-container-lowest pl-11 pr-4 font-body-md text-body-md text-on-surface ring-1 ring-inset ring-outline-variant/60 transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container dark:bg-surface-container-low dark:ring-outline-variant/90 dark:focus:bg-surface-container-low lg:h-auto lg:bg-surface-container-low lg:py-3 lg:ring-0 lg:placeholder:text-outline-variant lg:focus:ring-2 lg:focus:ring-primary/40 lg:dark:ring-1 lg:dark:ring-outline-variant/80 lg:dark:placeholder:text-outline lg:dark:focus:ring-primary"
          id={id}
          type={type}
          {...inputProps}
        />
      </div>
    </div>
  );
}

