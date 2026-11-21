import type { ReactNode } from 'react';
import { CheckCircle2, Square } from 'lucide-react';

interface QuizMultiSelectCardProps {
  selected: boolean;
  onToggle: () => void;
  title: string;
  mobileTitle?: string;
  description?: string;
  icon: ReactNode;
}

export function QuizMultiSelectCard({
  selected,
  onToggle,
  title,
  mobileTitle,
  description,
  icon,
}: QuizMultiSelectCardProps) {
  return (
    <button
      aria-checked={selected}
      className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:rounded-lg lg:p-4 ${
        selected
          ? 'bg-selected-surface text-on-selected-surface shadow-theme-selected'
          : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container dark:ring-1 dark:ring-outline-variant/75 lg:bg-surface-container-low lg:shadow-none'
      }`}
      onClick={onToggle}
      role="checkbox"
      type="button"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={`shrink-0 ${selected ? 'text-selected-accent' : 'text-primary'}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="font-label-lg text-label-lg font-bold">
            {mobileTitle ? (
              <>
                <span className="lg:hidden">{mobileTitle}</span>
                <span className="hidden lg:inline">{title}</span>
              </>
            ) : (
              title
            )}
          </div>
          {description ? (
            <div
              className={`hidden font-body-sm text-body-sm lg:block ${
                selected ? 'text-selected-muted/85' : 'text-on-surface-variant'
              }`}
            >
              {description}
            </div>
          ) : null}
        </div>
      </div>

      <span aria-hidden="true" className="shrink-0">
        {selected ? (
          <CheckCircle2 className="h-5 w-5 text-selected-accent" />
        ) : (
          <Square className="h-5 w-5 text-outline-variant" />
        )}
      </span>
    </button>
  );
}

