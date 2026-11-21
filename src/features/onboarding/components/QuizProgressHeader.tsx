import { Check, Sparkles } from 'lucide-react';
import { QUIZ_STEPS } from '../data/quizQuestions';
import type { QuizStepNumber } from '../types/onboarding';

interface QuizProgressHeaderProps {
  currentStep: QuizStepNumber;
  isStep1Complete: boolean;
  onSelectStep: (step: QuizStepNumber) => void;
  onSkip?: () => void;
}

export function QuizProgressHeader({
  currentStep,
  isStep1Complete,
  onSelectStep,
  onSkip,
}: QuizProgressHeaderProps) {
  const stepInfo = QUIZ_STEPS[currentStep - 1] ?? QUIZ_STEPS[0]!;
  const canSkip = currentStep >= 2 && currentStep <= 4 && Boolean(onSkip);

  return (
    <div className="flex flex-col gap-space-md">
      {/* Desktop Hero Header */}
      <div className="hidden items-end justify-between gap-space-md lg:flex">
        <div>
          <div className="mb-2 inline-flex items-center gap-space-xs rounded-full bg-surface-container-high px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Personalized Path Synthesis</span>
          </div>
          <h1 className="font-heading text-headline-lg tracking-tight text-on-surface">
            Tailor Your Tarbiyah
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Bismillah — answering with intention shapes your personal spiritual journey.
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="font-label-lg text-label-lg text-primary">
              Step {currentStep} of 5
            </span>
            <span className="font-label-sm text-label-sm text-outline-variant">•</span>
            <span className="font-heading text-title-md font-bold text-on-surface">
              {stepInfo.percentage}%
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Takes less than 2 minutes
          </span>
        </div>
      </div>

      {/* Mobile & Tablet Step Indicator */}
      <div className="flex items-center justify-between pt-2 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-surface-container-high px-3 py-1 font-label-md text-label-md text-on-surface-variant">
            Step {currentStep} of 5
          </span>
          <span className="font-label-md text-label-md font-bold text-primary">
            {stepInfo.percentage}%
          </span>
        </div>

        {canSkip ? (
          <button
            className="cursor-pointer rounded-lg px-2.5 py-1.5 font-label-lg text-label-lg text-primary transition-colors hover:bg-surface-container hover:text-primary-container"
            onClick={onSkip}
            type="button"
          >
            Skip
          </button>
        ) : null}
      </div>

      {/* Responsive Five-Step Navigation */}
      <div className="rounded-xl bg-surface-container-lowest p-2 shadow-theme-card dark:ring-1 dark:ring-outline-variant/75 lg:p-3">
        <nav aria-label="Quiz steps" className="grid grid-cols-5 gap-1 text-center sm:gap-2">
          {QUIZ_STEPS.map((item) => {
            const isCurrent = item.step === currentStep;
            const isPast = item.step < currentStep;
            const isDisabled = item.step > 1 && !isStep1Complete;

            return (
              <button
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex flex-col items-center rounded-lg px-1 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isCurrent
                    ? 'bg-surface-container font-bold text-primary'
                    : isPast
                      ? 'cursor-pointer text-primary hover:bg-surface-container-low'
                      : isDisabled
                        ? 'cursor-not-allowed text-outline opacity-60'
                        : 'cursor-pointer text-on-surface-variant hover:bg-surface-container-low'
                }`}
                disabled={isDisabled}
                key={item.step}
                onClick={() => onSelectStep(item.step)}
                type="button"
              >
                <span
                  className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full font-label-sm text-label-sm ${
                    isCurrent
                      ? 'bg-primary text-on-primary shadow-sm'
                      : isPast
                        ? 'bg-primary/20 text-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {isPast ? <Check className="h-3.5 w-3.5" /> : item.step}
                </span>
                <span className="line-clamp-2 text-[10px] font-medium leading-tight sm:font-label-sm sm:text-label-sm lg:line-clamp-1">
                  {item.tabLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
