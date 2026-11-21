import { BookOpen, Compass } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AyatOfTheDayCard } from '../features/ayat/components/AyatOfTheDayCard';
import { DashboardShell } from '../features/dashboard/components/DashboardShell';
import {
  EXPLORE_TOPICS,
  getLearnerFirstName,
  selectDailyFocusRecommendation,
  SUGGESTED_LESSON,
  type ExploreTopic,
} from '../features/dashboard/data/dashboardContent';
import { useOnboarding } from '../features/onboarding/context/OnboardingContext';
import { UpcomingPrayerCard } from '../features/prayer/components/UpcomingPrayerCard';

const EXPLORE_ICONS: Record<ExploreTopic['id'], typeof Compass> = {
  'faith-iman': Compass,
  quran: BookOpen,
};

export function AuthenticatedHomePage() {
  const { user } = useAuth();
  const { answers } = useOnboarding();

  const firstName = getLearnerFirstName(user, answers.preferredName);
  const dailyFocus = selectDailyFocusRecommendation(answers);

  return (
    <DashboardShell displayName={firstName}>
      <div className="mx-auto flex max-w-3xl flex-col gap-9 sm:gap-10">
        {/* Section 1 — Welcome */}
        <section aria-labelledby="dashboard-welcome-heading">
          <h1
            className="font-heading text-headline-lg-mobile font-bold tracking-tight text-on-surface sm:text-headline-lg"
            id="dashboard-welcome-heading"
          >
            Assalamu Alaikum, {firstName}
          </h1>
          <p className="mt-1.5 font-body-lg text-body-lg text-on-surface-variant">
            Ready for today&apos;s learning?
          </p>
        </section>

        {/* Section 2 — Upcoming Prayer */}
        <UpcomingPrayerCard />

        {/* Section 3 — Continue Learning (Primary Focal Section) */}
        <section
          aria-labelledby="continue-learning-heading"
          className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-6 shadow-theme-card dark:border-outline-variant sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-0.5 font-label-md text-label-md sm:flex-row sm:items-center sm:gap-2.5">
            <span className="font-semibold uppercase tracking-wider text-primary">
              {SUGGESTED_LESSON.courseTitle}
            </span>
            <span aria-hidden="true" className="hidden text-outline sm:inline">
              •
            </span>
            <span className="text-on-surface-variant">Suggested starting lesson</span>
          </div>

          <h2
            className="mt-3 font-heading text-headline-md font-bold text-on-surface sm:text-[28px] sm:leading-[36px]"
            id="continue-learning-heading"
          >
            {SUGGESTED_LESSON.lessonTitle}
          </h2>

          <p className="mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {SUGGESTED_LESSON.description}
          </p>

          <div className="mt-6 flex items-center gap-2 border-t border-outline-variant/35 pt-4 dark:border-outline-variant/75">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-outline" />
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {SUGGESTED_LESSON.statusLabel}
            </p>
          </div>
        </section>

        {/* Section 4 — Ayat of the Day */}
        <AyatOfTheDayCard />

        {/* Section 5 — Daily Focus */}
        <section
          aria-labelledby="daily-focus-heading"
          className="rounded-xl border border-outline-variant/40 bg-surface-container-low/75 p-5 dark:border-outline-variant/80 dark:bg-surface-container-low sm:p-6"
        >
          <div className="border-l-2 border-primary/70 pl-4 sm:pl-5">
            <h2
              className="font-heading text-headline-sm font-semibold text-on-surface"
              id="daily-focus-heading"
            >
              One meaningful thing to learn today
            </h2>
            <p className="mt-2 font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {dailyFocus.prompt}
            </p>
            <p className="mt-2 font-label-sm text-label-sm text-outline">{dailyFocus.topic}</p>
          </div>
        </section>

        {/* Section 6 — Explore */}
        <section aria-labelledby="explore-heading">
          <h2
            className="font-heading text-headline-sm font-semibold text-on-surface"
            id="explore-heading"
          >
            Explore for yourself
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EXPLORE_TOPICS.map((topic) => {
              const Icon = EXPLORE_ICONS[topic.id];
              return (
                <div
                  className="flex items-start gap-4 rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-5 dark:border-outline-variant/85"
                  key={topic.id}
                >
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-title-md font-semibold text-on-surface">
                      {topic.title}
                    </h3>
                    <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                      {topic.description}
                    </p>
                    <p className="mt-2 font-label-sm text-label-sm text-outline">Coming soon</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 7 — Your Progress */}
        <section
          aria-labelledby="progress-heading"
          className="border-t border-outline-variant/45 pt-7 dark:border-outline-variant/80"
        >
          <h2
            className="font-heading text-headline-sm font-semibold text-on-surface"
            id="progress-heading"
          >
            Your learning journey
          </h2>
          <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Your learning journey starts here. Your progress will appear as you learn.
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
