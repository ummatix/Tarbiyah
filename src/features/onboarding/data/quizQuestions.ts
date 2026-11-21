import type {
  AgeGroupId,
  BackgroundOptionId,
  CommitmentOptionId,
  CountryCode,
  GoalOptionId,
  LanguageId,
  QuizOption,
  QuizStepNumber,
  StartingPointId,
} from '../types/onboarding';

export const QUIZ_STEPS: Array<{
  step: QuizStepNumber;
  tabLabel: string;
  percentage: number;
  companionMessage: string;
}> = [
  {
    step: 1,
    tabLabel: 'Details',
    percentage: 20,
    companionMessage:
      'Assalamu Alaikum! Take your time — your answers help shape your personal Tarbiyah experience.',
  },
  {
    step: 2,
    tabLabel: 'Background',
    percentage: 40,
    companionMessage:
      'Whether you are taking your very first step or returning to strengthen your roots, you are welcomed here.',
  },
  {
    step: 3,
    tabLabel: 'Goals',
    percentage: 60,
    companionMessage:
      'Pick all areas your heart leans toward today. Small, sincere steps lead to lasting barakah.',
  },
  {
    step: 4,
    tabLabel: 'Rhythm',
    percentage: 80,
    companionMessage:
      'Consistency over intensity — choose a daily learning pace that fits naturally into your routine.',
  },
  {
    step: 5,
    tabLabel: 'Starting Point',
    percentage: 100,
    companionMessage:
      'Almost ready! Choose your initial starting topic so we can prepare your personalised profile view.',
  },
];

export const AGE_GROUP_OPTIONS: QuizOption<AgeGroupId>[] = [
  { id: 'under-18', label: 'Under 18' },
  { id: '18-20', label: '18–20' },
  { id: '21-25', label: '21–25' },
  { id: '26-30', label: '26–30' },
  { id: 'above-30', label: 'Above 30' },
  { id: 'prefer-not', label: 'Prefer not to say' },
];

export const COUNTRY_OPTIONS: Array<{ code: CountryCode; label: string }> = [
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'CA', label: 'Canada' },
  { code: 'AU', label: 'Australia' },
  { code: 'PK', label: 'Pakistan' },
  { code: 'IN', label: 'India' },
  { code: 'MY', label: 'Malaysia' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'AE', label: 'United Arab Emirates' },
  { code: 'OTHER', label: 'Other / Worldwide' },
];

export const LANGUAGE_OPTIONS: Array<{
  id: LanguageId;
  label: string;
  nativeLabel: string;
  subtitle: string;
  shortLabel: string;
}> = [
  {
    id: 'english',
    label: 'English',
    nativeLabel: 'English',
    subtitle: 'Default Curriculum',
    shortLabel: 'English',
  },
  {
    id: 'urdu',
    label: 'Urdu',
    nativeLabel: 'اردو',
    subtitle: 'Urdu Translations',
    shortLabel: 'Urdu',
  },
  {
    id: 'arabic',
    label: 'Arabic',
    nativeLabel: 'العربية',
    subtitle: 'Arabic Immersion',
    shortLabel: 'Arabic',
  },
  {
    id: 'hindi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    subtitle: 'Hindi Transliteration',
    shortLabel: 'Hindi',
  },
  {
    id: 'other',
    label: 'Other',
    nativeLabel: 'Other',
    subtitle: 'Bilingual glossaries',
    shortLabel: 'Other',
  },
];

export const BACKGROUND_OPTIONS: QuizOption<BackgroundOptionId>[] = [
  {
    id: 'not-muslim',
    label: "I'm curious about Islam",
    description: 'I want to learn about Islam and understand its teachings.',
  },
  {
    id: 'revert',
    label: "I'm a new Muslim / Revert",
    description: "I'm learning the basics and building my practice.",
  },
  {
    id: 'reconnecting',
    label: "I'm a Muslim looking to reconnect",
    description: 'I want to strengthen my faith and understand my Deen better.',
  },
  {
    id: 'practising',
    label: "I'm looking for deeper Islamic knowledge",
    description: 'I want to explore Islamic studies in greater depth.',
  },
];

export const GOAL_OPTIONS: QuizOption<GoalOptionId>[] = [
  {
    id: 'foundations',
    label: 'Foundations of Islam',
    description: 'Learn the basics of Islam.',
  },
  {
    id: 'pillars',
    label: 'Five Pillars',
    description: 'Understand the five pillars and how to practise them.',
  },
  {
    id: 'iman',
    label: 'Iman & Islamic Beliefs',
    description: 'Learn about Allah, faith and Islamic beliefs.',
  },
  {
    id: 'salah',
    label: 'Salah Mastery & Khushu',
    description: 'Improve your Salah and focus during prayer.',
  },
  {
    id: 'quran',
    label: "Qur'an Journey",
    description: "Learn to read, understand and reflect on the Qur'an.",
  },
  {
    id: 'dhikr',
    label: 'Dhikr & Daily Duas',
    description: 'Learn daily duas and remembrance of Allah.',
  },
  {
    id: 'prophets',
    label: 'Prophets & History',
    description: 'Discover the stories of the Prophets and Islamic history.',
  },
  {
    id: 'consistency',
    label: 'Spiritual Consistency',
    description: 'Build good habits and stay consistent in your faith.',
  },
];

export const COMMITMENT_OPTIONS: Array<{
  id: CommitmentOptionId;
  title: string;
  badge?: string;
}> = [
  {
    id: '5-10',
    title: '5–10 minutes',
    badge: 'Recommended',
  },
  {
    id: '10-15',
    title: '10–15 minutes',
  },
  {
    id: '15-20',
    title: '15–20 minutes',
  },
];

export const STARTING_POINT_OPTIONS: QuizOption<StartingPointId>[] = [
  {
    id: 'basics',
    label: 'Islamic Foundations',
    description: 'Start with the basics of Islam.',
  },
  {
    id: 'allah-iman',
    label: 'Allah & Iman',
    description: 'Learn about Allah and strengthen your faith.',
  },
  {
    id: 'salah-meaning',
    label: 'Salah & Its Meaning',
    description: 'Understand Salah and its meaning.',
  },
  {
    id: 'quran',
    label: "Qur'an & Tafseer Intro",
    description: "Begin exploring the Qur'an and its explanation.",
  },
  {
    id: 'explore',
    label: 'Explore All Topics Freely',
    description: 'Browse topics and learn at your own pace.',
  },
];

export const PATHWAY_PREVIEW_PHASES = [
  {
    phase: 'PHASE 01 • WEEKS 1–2',
    status: 'Preview',
    title: 'The Heart of Tawheed & Purpose',
    description:
      'Establish pure intention (Niyyah) and explore why Allah created us with love, mercy, and purpose.',
    highlights: ['4 Core Video Vignettes', '2 Micro Reflection Prompts'],
  },
  {
    phase: 'PHASE 02 • WEEKS 3–4',
    status: 'Upcoming',
    title: 'Khushu in Prayer — Step-by-Step',
    description:
      'Transform physical motions into a serene spiritual sanctuary by understanding the words of Salah.',
    highlights: ['Interactive Salah Visualizer', 'Recitation Clarity Audio'],
  },
  {
    phase: 'PHASE 03 • WEEKS 5–6',
    status: 'Upcoming',
    title: 'Everyday Adhkar & Quran Connection',
    description:
      'Build gentle morning and evening remembrance habits alongside thematic familiarity with short Surahs.',
    highlights: ['Morning & Evening Habit Loop', 'Tadabbur Journal Kit'],
  },
];

