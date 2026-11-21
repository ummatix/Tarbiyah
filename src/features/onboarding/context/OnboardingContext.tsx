import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type {
  GoalOptionId,
  OnboardingAnswers,
  QuizStepNumber,
  Step1ValidationErrors,
} from '../types/onboarding';
import {
  hasCompletedOnboarding,
  persistOnboardingCompleted,
} from '../utils/onboardingNavigation';

const INITIAL_ANSWERS: OnboardingAnswers = {
  preferredName: '',
  ageGroup: null,
  country: '',
  preferredLanguage: null,
  islamicBackground: null,
  learningGoals: [],
  dailyCommitment: null,
  startingPoint: null,
};

export function validateStep1(answers: OnboardingAnswers): Step1ValidationErrors {
  const errors: Step1ValidationErrors = {};

  if (!answers.preferredName.trim()) {
    errors.preferredName = 'Please enter what we should call you.';
  }
  if (!answers.ageGroup) {
    errors.ageGroup = 'Please select your age group.';
  }
  if (!answers.country) {
    errors.country = 'Please select your country of residence.';
  }
  if (!answers.preferredLanguage) {
    errors.preferredLanguage = 'Please select your preferred learning language.';
  }

  return errors;
}

export function isStep1Valid(answers: OnboardingAnswers): boolean {
  return Object.keys(validateStep1(answers)).length === 0;
}

export interface OnboardingContextValue {
  answers: OnboardingAnswers;
  currentStep: QuizStepNumber;
  hasCompletedQuiz: boolean;
  isOnboardingCompleted: boolean;
  setCurrentStep: (step: QuizStepNumber) => void;
  toggleGoal: (goalId: GoalOptionId) => void;
  updateAnswers: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
  completeQuiz: () => void;
  markOnboardingCompleted: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>(INITIAL_ANSWERS);
  const [currentStep, setCurrentStep] = useState<QuizStepNumber>(1);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(() =>
    hasCompletedOnboarding()
  );
  const completionMarkedRef = useRef<boolean>(hasCompletedOnboarding());

  const updateAnswers = useCallback(
    <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => {
      setAnswers((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const toggleGoal = useCallback((goalId: GoalOptionId) => {
    setAnswers((prev) => {
      const exists = prev.learningGoals.includes(goalId);
      return {
        ...prev,
        learningGoals: exists
          ? prev.learningGoals.filter((g) => g !== goalId)
          : [...prev.learningGoals, goalId],
      };
    });
  }, []);

  const completeQuiz = useCallback(() => {
    setHasCompletedQuiz(true);
  }, []);

  const markOnboardingCompleted = useCallback(() => {
    if (!completionMarkedRef.current) {
      persistOnboardingCompleted();
      completionMarkedRef.current = true;
    }
    setIsOnboardingCompleted(true);
  }, []);

  const resetOnboarding = useCallback(() => {
    setAnswers(INITIAL_ANSWERS);
    setCurrentStep(1);
    setHasCompletedQuiz(false);
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      answers,
      currentStep,
      hasCompletedQuiz,
      isOnboardingCompleted,
      setCurrentStep,
      toggleGoal,
      updateAnswers,
      completeQuiz,
      markOnboardingCompleted,
      resetOnboarding,
    }),
    [
      answers,
      currentStep,
      hasCompletedQuiz,
      isOnboardingCompleted,
      toggleGoal,
      updateAnswers,
      completeQuiz,
      markOnboardingCompleted,
      resetOnboarding,
    ]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider.');
  }
  return ctx;
}

