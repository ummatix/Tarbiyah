import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, Lock, RefreshCw, ShieldCheck } from 'lucide-react';
import { OnboardingShell } from '../features/onboarding/components/OnboardingShell';
import { QuizProgressHeader } from '../features/onboarding/components/QuizProgressHeader';
import { QuizStep1Personal } from '../features/onboarding/components/steps/QuizStep1Personal';
import { QuizStep2Background } from '../features/onboarding/components/steps/QuizStep2Background';
import { QuizStep3Goals } from '../features/onboarding/components/steps/QuizStep3Goals';
import { QuizStep4Commitment } from '../features/onboarding/components/steps/QuizStep4Commitment';
import { QuizStep5StartingPoint } from '../features/onboarding/components/steps/QuizStep5StartingPoint';
import {
  isStep1Valid,
  useOnboarding,
  validateStep1,
} from '../features/onboarding/context/OnboardingContext';
import type {
  OnboardingAnswers,
  QuizStepNumber,
  Step1ValidationErrors,
} from '../features/onboarding/types/onboarding';

export function OnboardingQuizPage() {
  const navigate = useNavigate();
  const {
    answers,
    currentStep,
    setCurrentStep,
    toggleGoal,
    updateAnswers,
    completeQuiz,
    markOnboardingCompleted,
  } = useOnboarding();
  const [step1Errors, setStep1Errors] = useState<Step1ValidationErrors>({});

  const step1Complete = isStep1Valid(answers);

  const handleFieldUpdate = <K extends keyof OnboardingAnswers>(
    key: K,
    value: OnboardingAnswers[K]
  ) => {
    updateAnswers(key, value);
    if (key in step1Errors) {
      setStep1Errors((prev) => {
        const next = { ...prev };
        delete next[key as keyof Step1ValidationErrors];
        return next;
      });
    }
  };

  const handleSelectStep = (targetStep: QuizStepNumber) => {
    if (targetStep > 1 && !step1Complete) {
      setStep1Errors(validateStep1(answers));
      return;
    }
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as QuizStepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/app');
    }
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      const errors = validateStep1(answers);
      if (Object.keys(errors).length > 0) {
        setStep1Errors(errors);
        return;
      }
      setStep1Errors({});
    }

    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as QuizStepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    completeQuiz();
    markOnboardingCompleted();
    navigate('/app', { replace: true });
  };

  const handleSkipOptionalStep = () => {
    // Step 1 is strictly required and Step 5 cannot be bypassed by Skip.
    if (currentStep >= 2 && currentStep <= 4) {
      setCurrentStep((currentStep + 1) as QuizStepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <OnboardingShell hasBottomBar onMobileBack={handleBack}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-space-md px-margin-mobile py-2 sm:px-margin lg:gap-space-lg lg:px-8 lg:py-10">
        <QuizProgressHeader
          currentStep={currentStep}
          isStep1Complete={step1Complete}
          onSelectStep={handleSelectStep}
          onSkip={currentStep >= 2 && currentStep <= 4 ? handleSkipOptionalStep : undefined}
        />

        {/* Main Quiz Card */}
        <section className="lg:rounded-xl lg:bg-surface-container-lowest lg:p-10 lg:shadow-theme-elevated">
          {currentStep === 1 ? (
            <QuizStep1Personal
              answers={answers}
              errors={step1Errors}
              onUpdate={handleFieldUpdate}
            />
          ) : null}

          {currentStep === 2 ? (
            <QuizStep2Background
              onChange={(val) => updateAnswers('islamicBackground', val)}
              value={answers.islamicBackground}
            />
          ) : null}

          {currentStep === 3 ? (
            <QuizStep3Goals
              onToggleGoal={toggleGoal}
              selectedGoals={answers.learningGoals}
            />
          ) : null}

          {currentStep === 4 ? (
            <QuizStep4Commitment
              onChange={(val) => updateAnswers('dailyCommitment', val)}
              value={answers.dailyCommitment}
            />
          ) : null}

          {currentStep === 5 ? (
            <QuizStep5StartingPoint
              onChange={(val) => updateAnswers('startingPoint', val)}
              value={answers.startingPoint}
            />
          ) : null}

          {/* Desktop Card Bottom Controls (>=1024px) */}
          <div className="mt-8 hidden items-center justify-between gap-4 pt-6 lg:flex">
            <div className="flex items-center gap-4">
              <button
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-label-lg text-label-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  currentStep === 1
                    ? 'cursor-not-allowed bg-surface-container text-outline opacity-40'
                    : 'cursor-pointer bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
                disabled={currentStep === 1}
                onClick={handleBack}
                type="button"
              >
                <ArrowLeft className="h-[18px] w-[18px]" />
                <span>Back</span>
              </button>

              {currentStep >= 2 && currentStep <= 4 ? (
                <button
                  className="cursor-pointer rounded-full px-3 py-1.5 font-label-lg text-label-lg text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={handleSkipOptionalStep}
                  type="button"
                >
                  Skip for now
                </button>
              ) : null}
            </div>

            <button
              className="flex cursor-pointer items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-container px-8 py-3.5 font-heading text-headline-sm text-on-primary shadow-theme-primary transition-all hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              onClick={handleContinue}
              type="button"
            >
              <span>{currentStep === 5 ? 'Continue to Dashboard' : 'Continue to Next Step'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Desktop Trust Badges */}
        <div className="hidden flex-wrap items-center justify-center gap-8 py-2 text-on-surface-variant/80 lg:flex">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-[18px] w-[18px] text-tertiary" />
            <span className="font-label-sm text-label-sm">Scholarly Verified Curriculum</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-[18px] w-[18px] text-secondary" />
            <span className="font-label-sm text-label-sm">Private &amp; 100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-[18px] w-[18px] text-primary" />
            <span className="font-label-sm text-label-sm">Adjust Anytime in Settings</span>
          </div>
        </div>
      </div>

      {/* Fixed Mobile & Tablet Bottom Action Bar (<1024px) */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 bg-surface-container-lowest/95 shadow-theme-dock backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-[480px] items-center gap-space-md px-margin-mobile py-3">
          <button
            className={`flex min-h-[44px] shrink-0 items-center gap-1 rounded-full px-3 py-2 font-label-lg text-label-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              currentStep === 1
                ? 'cursor-not-allowed text-on-surface-variant opacity-50'
                : 'cursor-pointer text-on-surface-variant hover:text-on-surface'
            }`}
            disabled={currentStep === 1}
            onClick={handleBack}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <button
            className="flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cta-start to-cta-end px-6 py-3 font-heading text-headline-sm text-on-primary shadow-theme-primary transition-all hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={handleContinue}
            type="button"
          >
            <span>{currentStep === 5 ? 'Start My Journey' : 'Continue'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </OnboardingShell>
  );
}
