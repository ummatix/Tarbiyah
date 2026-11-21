import type { ReactNode } from 'react';
import { CheckCircle2, Circle, Clock, Flame, Hourglass } from 'lucide-react';
import { COMMITMENT_OPTIONS } from '../../data/quizQuestions';
import type { CommitmentOptionId } from '../../types/onboarding';

const COMMITMENT_ICONS: Record<CommitmentOptionId, ReactNode> = {
  '5-10': <Hourglass className="h-6 w-6" />,
  '10-15': <Clock className="h-6 w-6" />,
  '15-20': <Flame className="h-6 w-6" />,
};

interface QuizStep4CommitmentProps {
  value: CommitmentOptionId | null;
  onChange: (value: CommitmentOptionId) => void;
}

export function QuizStep4Commitment({ value, onChange }: QuizStep4CommitmentProps) {
  return (
    <div className="flex flex-col gap-space-md lg:gap-space-lg">
      <div className="flex flex-col gap-1">
        <span className="hidden font-label-md text-label-md font-bold uppercase tracking-wider text-primary lg:inline">
          Step 4 of 5
        </span>
        <h2 className="font-heading text-headline-lg-mobile text-on-surface lg:text-headline-md">
          How much time can you spend learning each day?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Choose a pace that feels comfortable for you.
        </p>
      </div>

      <div
        aria-label="Daily Learning Time"
        className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
        role="radiogroup"
      >
        {COMMITMENT_OPTIONS.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              aria-checked={selected}
              className={`relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:p-6 ${
                selected
                  ? 'bg-selected-surface text-on-selected-surface shadow-theme-selected'
                  : 'bg-surface-container-lowest text-on-surface shadow-theme-card hover:bg-surface-container dark:ring-1 dark:ring-outline-variant/75 lg:bg-surface-container-low'
              }`}
              key={opt.id}
              onClick={() => onChange(opt.id)}
              role="radio"
              type="button"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${
                    selected
                      ? 'bg-selected-icon-bg/20 text-on-selected-surface dark:text-primary'
                      : 'bg-surface-container-high text-primary'
                  }`}
                >
                  {COMMITMENT_ICONS[opt.id]}
                </div>
                {selected ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-selected-accent" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-outline-variant" />
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className={`font-heading text-headline-sm font-bold lg:text-headline-md ${
                    selected ? 'text-on-selected-surface' : 'text-on-surface'
                  }`}
                >
                  {opt.title}
                </span>
                {opt.badge ? (
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-label-sm text-label-sm font-semibold ${
                      selected
                        ? 'bg-selected-icon-bg/20 text-selected-accent'
                        : 'bg-surface-container text-primary'
                    }`}
                  >
                    {opt.badge}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

