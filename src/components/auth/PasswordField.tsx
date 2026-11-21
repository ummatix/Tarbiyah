import { useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  id: string;
  label: string;
  icon: ReactNode;
  labelAccessory?: ReactNode;
  toggleLabel?: string;
}

export function PasswordField({
  id,
  label,
  icon,
  labelAccessory,
  toggleLabel = 'Toggle password visibility',
  ...inputProps
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label
          className="font-label-md text-label-md text-on-surface-variant lg:text-on-surface lg:font-medium"
          htmlFor={id}
        >
          {label}
        </label>
        {labelAccessory}
      </div>
      <div className="relative flex items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 flex items-center text-on-surface-variant lg:text-outline"
        >
          {icon}
        </span>
        <input
          className="h-12 w-full rounded-xl bg-surface-container-lowest pl-11 pr-12 font-body-md text-body-md text-on-surface ring-1 ring-inset ring-outline-variant/60 transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container dark:bg-surface-container-low dark:ring-outline-variant/90 dark:focus:bg-surface-container-low lg:h-auto lg:bg-surface-container-low lg:py-3 lg:ring-0 lg:placeholder:text-outline-variant lg:focus:ring-2 lg:focus:ring-primary/40 lg:dark:ring-1 lg:dark:ring-outline-variant/80 lg:dark:placeholder:text-outline lg:dark:focus:ring-primary"
          id={id}
          type={visible ? 'text' : 'password'}
          {...inputProps}
        />
        <button
          aria-label={toggleLabel}
          aria-pressed={visible}
          className="absolute right-0 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center text-on-surface-variant transition-colors hover:text-primary lg:right-1.5 lg:text-outline lg:hover:text-on-surface"
          onClick={() => setVisible((prev) => !prev)}
          type="button"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

