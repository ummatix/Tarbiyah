import { CheckCircle2, ChevronDown, Circle, ContactRound, Globe } from 'lucide-react';
import {
  AGE_GROUP_OPTIONS,
  COUNTRY_OPTIONS,
  LANGUAGE_OPTIONS,
} from '../../data/quizQuestions';
import type {
  CountryCode,
  OnboardingAnswers,
  Step1ValidationErrors,
} from '../../types/onboarding';

interface QuizStep1PersonalProps {
  answers: OnboardingAnswers;
  errors: Step1ValidationErrors;
  onUpdate: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
}

export function QuizStep1Personal({ answers, errors, onUpdate }: QuizStep1PersonalProps) {
  return (
    <div className="flex flex-col gap-space-md lg:gap-space-lg">
      <div className="flex flex-col gap-1">
        <span className="hidden font-label-md text-label-md font-bold uppercase tracking-wider text-primary lg:inline">
          Step 1 of 5
        </span>
        <h2 className="font-heading text-headline-lg-mobile text-on-surface lg:text-headline-md">
          A little about you
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Let&apos;s personalise your learning experience.
        </p>
      </div>

      {/* Name + Country row */}
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:gap-space-lg">
        {/* Q1: Preferred Name */}
        <div className="flex flex-col gap-1.5">
          <label
            className="font-label-md text-label-md text-on-surface lg:font-label-lg lg:text-label-lg"
            htmlFor="onboarding-preferred-name"
          >
            What should we call you? <span className="text-primary">*</span>
          </label>
          <div className="relative flex items-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 text-outline"
            >
              <ContactRound className="h-5 w-5" />
            </span>
            <input
              aria-describedby={errors.preferredName ? 'error-preferred-name' : undefined}
              aria-invalid={Boolean(errors.preferredName)}
              autoComplete="name"
              className={`h-12 w-full rounded-xl bg-surface-container-lowest pl-11 pr-4 font-body-md text-body-md text-on-surface shadow-sm transition-all placeholder:text-outline focus:outline-none focus:ring-2 dark:bg-surface-container-low lg:rounded-lg lg:bg-surface-container-low lg:shadow-none lg:focus:bg-surface lg:dark:focus:bg-surface-container-low ${
                errors.preferredName
                  ? 'ring-2 ring-error focus:ring-error'
                  : 'ring-1 ring-inset ring-outline-variant/40 focus:ring-primary dark:ring-outline-variant/90 lg:ring-0 lg:dark:ring-1 lg:dark:ring-outline-variant/80'
              }`}
              id="onboarding-preferred-name"
              onChange={(e) => onUpdate('preferredName', e.target.value)}
              placeholder="e.g. Tariq or Fatima"
              required
              type="text"
              value={answers.preferredName}
            />
          </div>
          <span className="hidden font-body-sm text-body-sm text-on-surface-variant lg:inline">
            Your chosen preferred name across your learning space.
          </span>
          {errors.preferredName ? (
            <p
              className="font-body-sm text-body-sm font-medium text-error"
              id="error-preferred-name"
              role="alert"
            >
              {errors.preferredName}
            </p>
          ) : null}
        </div>

        {/* Q3: Country of Residence */}
        <div className="flex flex-col gap-1.5">
          <label
            className="font-label-md text-label-md text-on-surface lg:font-label-lg lg:text-label-lg"
            htmlFor="onboarding-country"
          >
            Where do you live? <span className="text-primary">*</span>
          </label>
          <div className="relative flex items-center">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 text-outline"
            >
              <Globe className="h-5 w-5" />
            </span>
            <select
              aria-describedby={errors.country ? 'error-country' : undefined}
              aria-invalid={Boolean(errors.country)}
              className={`h-12 w-full cursor-pointer appearance-none rounded-xl bg-surface-container-lowest pl-11 pr-10 font-body-md text-body-md shadow-sm transition-all focus:outline-none focus:ring-2 dark:bg-surface-container-low lg:rounded-lg lg:bg-surface-container-low lg:shadow-none lg:focus:bg-surface lg:dark:focus:bg-surface-container-low ${
                answers.country ? 'text-on-surface' : 'text-outline'
              } ${
                errors.country
                  ? 'ring-2 ring-error focus:ring-error'
                  : 'ring-1 ring-inset ring-outline-variant/40 focus:ring-primary dark:ring-outline-variant/90 lg:ring-0 lg:dark:ring-1 lg:dark:ring-outline-variant/80'
              }`}
              id="onboarding-country"
              onChange={(e) => onUpdate('country', e.target.value as CountryCode | '')}
              required
              value={answers.country}
            >
              <option value="">Select your country</option>
              {COUNTRY_OPTIONS.map((c) => (
                <option className="text-on-surface" key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3.5 text-outline"
            >
              <ChevronDown className="h-5 w-5" />
            </span>
          </div>
          <span className="hidden font-body-sm text-body-sm text-on-surface-variant lg:inline">
            Calibrates local prayer-aligned module reminders.
          </span>
          {errors.country ? (
            <p
              className="font-body-sm text-body-sm font-medium text-error"
              id="error-country"
              role="alert"
            >
              {errors.country}
            </p>
          ) : null}
        </div>
      </div>

      {/* Q2: Age Group */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-label-md text-label-md text-on-surface lg:font-label-lg lg:text-label-lg"
            id="label-age-group"
          >
            Which age group are you in? <span className="text-primary">*</span>
          </span>
          <span className="hidden font-body-sm text-body-sm text-on-surface-variant lg:inline">
            Curates age-relevant discussions
          </span>
        </div>
        <div
          aria-labelledby="label-age-group"
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5"
          role="radiogroup"
        >
          {AGE_GROUP_OPTIONS.map((option) => {
            const selected = answers.ageGroup === option.id;
            return (
              <button
                aria-checked={selected}
                className={`min-h-[44px] cursor-pointer rounded-xl px-3 py-3 text-center font-label-md text-label-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:rounded-lg ${
                  selected
                    ? 'bg-primary text-on-primary font-bold shadow-theme-selected lg:bg-primary-container lg:text-on-primary-container'
                    : 'bg-surface-container-lowest text-on-surface-variant shadow-sm hover:bg-surface-container-high dark:ring-1 dark:ring-outline-variant/75 lg:bg-surface-container-low lg:text-on-surface lg:shadow-none lg:hover:bg-surface-container'
                }`}
                key={option.id}
                onClick={() => onUpdate('ageGroup', option.id)}
                role="radio"
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {errors.ageGroup ? (
          <p className="font-body-sm text-body-sm font-medium text-error" role="alert">
            {errors.ageGroup}
          </p>
        ) : null}
      </div>

      {/* Q4: Preferred Learning Language */}
      <div className="flex flex-col gap-2">
        <span
          className="font-label-md text-label-md text-on-surface lg:font-label-lg lg:text-label-lg"
          id="label-preferred-language"
        >
          Which language do you prefer? <span className="text-primary">*</span>
        </span>
        <div
          aria-labelledby="label-preferred-language"
          className="flex flex-wrap gap-2 lg:grid lg:grid-cols-5 lg:gap-3"
          role="radiogroup"
        >
          {LANGUAGE_OPTIONS.map((lang) => {
            const selected = answers.preferredLanguage === lang.id;
            return (
              <button
                aria-checked={selected}
                className={`min-h-[44px] cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-4 py-2 font-label-md text-label-md lg:flex lg:flex-col lg:rounded-lg lg:p-4 lg:text-left ${
                  selected
                    ? 'bg-primary font-bold text-on-primary shadow-sm lg:bg-selected-surface lg:font-semibold lg:text-on-selected-surface lg:shadow-theme-selected'
                    : 'bg-surface-container-lowest text-on-surface-variant shadow-sm hover:bg-surface-container-high dark:ring-1 dark:ring-outline-variant/75 lg:bg-surface-container-low lg:text-on-surface lg:shadow-none lg:hover:bg-surface-container'
                }`}
                key={lang.id}
                onClick={() => onUpdate('preferredLanguage', lang.id)}
                role="radio"
                type="button"
              >
                <span className="lg:hidden">{lang.shortLabel}</span>
                <span className="hidden font-heading text-headline-sm font-bold lg:block">
                  {lang.nativeLabel}
                </span>
                <span
                  className={`mt-1 hidden font-body-sm text-body-sm lg:block ${
                    selected ? 'text-selected-muted/85' : 'text-on-surface-variant'
                  }`}
                >
                  {lang.subtitle}
                </span>
                <span aria-hidden="true" className="mt-2 hidden self-end lg:block">
                  {selected ? (
                    <CheckCircle2 className="h-5 w-5 text-selected-accent" />
                  ) : (
                    <Circle className="h-5 w-5 text-outline-variant" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        {errors.preferredLanguage ? (
          <p className="font-body-sm text-body-sm font-medium text-error" role="alert">
            {errors.preferredLanguage}
          </p>
        ) : null}
      </div>
    </div>
  );
}

