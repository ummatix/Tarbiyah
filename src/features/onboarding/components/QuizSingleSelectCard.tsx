import type { ReactNode } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuizSingleSelectCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  mobileTitle?: string;
  description?: string;
  mobileDescription?: string;
  icon: ReactNode;
}

export function QuizSingleSelectCard({
  selected,
  onSelect,
  title,
  mobileTitle,
  description,
  mobileDescription,
  icon,
}: QuizSingleSelectCardProps) {
  return (
    <button
      aria-checked={selected}
      className={`flex w-full cursor-pointer items-start gap-space-md rounded-xl p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5 ${
        selected
          ? 'bg-selected-surface text-on-selected-surface shadow-theme-selected'
          : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container dark:ring-1 dark:ring-outline-variant/75 lg:bg-surface-container-low lg:shadow-none'
      }`}
      onClick={onSelect}
      role="radio"
      type="button"
    >
      <div
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          selected
            ? 'bg-selected-icon-bg/20 text-on-selected-surface dark:text-primary'
            : 'bg-surface-container text-primary lg:bg-surface-container-high'
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={`font-heading text-title-md font-bold ${
            selected ? 'text-on-selected-surface' : 'text-on-surface'
          }`}
        >
          {mobileTitle ? (
            <>
              <span className="lg:hidden">{mobileTitle}</span>
              <span className="hidden lg:inline">{title}</span>
            </>
          ) : (
            title
          )}
        </div>
        {description || mobileDescription ? (
          <p
            className={`mt-0.5 font-body-sm text-body-sm ${
              selected ? 'text-selected-muted/85' : 'text-on-surface-variant'
            }`}
          >
            {mobileDescription && description ? (
              <>
                <span className="lg:hidden">{mobileDescription}</span>
                <span className="hidden lg:inline">{description}</span>
              </>
            ) : (
              description ?? mobileDescription
            )}
          </p>
        ) : null}
      </div>

      <span aria-hidden="true" className="shrink-0 self-center">
        {selected ? (
          <CheckCircle2 className="h-5 w-5 text-selected-accent" />
        ) : (
          <Circle className="h-5 w-5 text-outline-variant" />
        )}
      </span>
    </button>
  );
}

