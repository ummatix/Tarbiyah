import type { User } from '@supabase/supabase-js';
import type { OnboardingAnswers } from '../../onboarding/types/onboarding';

export type NavItemId =
  | 'home'
  | 'journey'
  | 'prayer'
  | 'calendar'
  | 'ask'
  | 'profile';

export interface DashboardNavItem {
  id: NavItemId;
  label: string;
  implemented: boolean;
}

export const DESKTOP_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'home', label: 'Home', implemented: true },
  { id: 'journey', label: 'My Journey', implemented: false },
  { id: 'prayer', label: 'Prayer & Remembrance', implemented: false },
  { id: 'calendar', label: 'Calendar', implemented: false },
  { id: 'ask', label: 'Ask & Learn', implemented: false },
  { id: 'profile', label: 'Profile', implemented: false },
];

export const MOBILE_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'home', label: 'Home', implemented: true },
  { id: 'journey', label: 'Journey', implemented: false },
  { id: 'prayer', label: 'Prayer', implemented: false },
  { id: 'calendar', label: 'Calendar', implemented: false },
  { id: 'profile', label: 'Profile', implemented: false },
];

export const SUGGESTED_LESSON = {
  courseTitle: 'Noor-ul-Bidayah',
  lessonTitle: 'The Power of Pure Intention (Niyyah)',
  description:
    'Explore how simple daily actions can become acts of worship through conscious intention.',
  statusLabel: 'Lesson content coming soon',
};

export interface ExploreTopic {
  id: 'faith-iman' | 'quran';
  title: string;
  description: string;
}

export const EXPLORE_TOPICS: ExploreTopic[] = [
  {
    id: 'faith-iman',
    title: 'Faith & Iman',
    description: 'Understand your beliefs.',
  },
  {
    id: 'quran',
    title: 'Qur’an',
    description: 'Read and reflect.',
  },
];

export interface DailyFocusRecommendation {
  topic: string;
  prompt: string;
}

const GOAL_RECOMMENDATIONS: Record<string, DailyFocusRecommendation> = {
  salah: {
    topic: 'Salah & Presence',
    prompt:
      'Before your next prayer, pause for a quiet moment to reflect on the opening words of Al-Fatihah.',
  },
  quran: {
    topic: 'Qur’an Reflection',
    prompt:
      'Read three short verses with translation today and pause on one meaning you can carry into your evening.',
  },
  dhikr: {
    topic: 'Daily Remembrance',
    prompt:
      'Pair a gentle remembrance — SubhanAllah, Alhamdulillah, Allahu Akbar — with a quiet transition in your day.',
  },
  iman: {
    topic: 'Faith & Conviction',
    prompt:
      'Reflect on one Name of Allah — Ar-Rahman (The Entirely Merciful) — and notice where mercy appears in your day.',
  },
  foundations: {
    topic: 'Foundations of Islam',
    prompt:
      'Revisit why sincerity sits at the root of every belief and action in Islamic practice.',
  },
  pillars: {
    topic: 'The Five Pillars',
    prompt:
      'Notice how the daily rhythm of worship keeps your week anchored in gratitude, discipline, and care.',
  },
  prophets: {
    topic: 'Prophetic Character',
    prompt:
      'Recall one moment where the Prophet Muhammad (peace be upon him) met difficulty with steadiness and warmth.',
  },
  consistency: {
    topic: 'Steady Habits',
    prompt:
      'Focus on keeping one small act of learning steady today rather than trying to do everything at once.',
  },
};

const STARTING_POINT_FALLBACK_GOAL: Record<string, string> = {
  basics: 'foundations',
  'allah-iman': 'iman',
  'salah-meaning': 'salah',
  quran: 'quran',
  explore: 'consistency',
};

const NEUTRAL_RECOMMENDATION: DailyFocusRecommendation = {
  topic: 'Intentional Living',
  prompt:
    'Take two quiet minutes today to renew your intention before beginning an ordinary everyday task.',
};

/**
 * Selects a single concise recommendation based on in-session onboarding goals
 * or starting point, falling back to a neutral prompt when none are set.
 */
export function selectDailyFocusRecommendation(
  answers: OnboardingAnswers
): DailyFocusRecommendation {
  for (const goalId of answers.learningGoals) {
    const match = GOAL_RECOMMENDATIONS[goalId];
    if (match) return match;
  }

  if (answers.startingPoint) {
    const mappedGoal = STARTING_POINT_FALLBACK_GOAL[answers.startingPoint];
    if (mappedGoal && GOAL_RECOMMENDATIONS[mappedGoal]) {
      return GOAL_RECOMMENDATIONS[mappedGoal];
    }
  }

  return NEUTRAL_RECOMMENDATION;
}

/**
 * Resolves the user's first name cleanly from onboarding input or Supabase auth metadata.
 */
export function getLearnerFirstName(user: User | null, preferredName: string): string {
  const candidate =
    preferredName.trim() ||
    (typeof user?.user_metadata?.full_name === 'string' ? user.user_metadata.full_name.trim() : '') ||
    (typeof user?.user_metadata?.name === 'string' ? user.user_metadata.name.trim() : '');

  if (!candidate) {
    return 'Learner';
  }

  return candidate.split(/\s+/)[0] || 'Learner';
}

