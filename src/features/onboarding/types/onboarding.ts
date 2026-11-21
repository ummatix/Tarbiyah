export type QuizStepNumber = 1 | 2 | 3 | 4 | 5;

export type AgeGroupId =
  | 'under-18'
  | '18-20'
  | '21-25'
  | '26-30'
  | 'above-30'
  | 'prefer-not';

export type CountryCode =
  | 'US'
  | 'GB'
  | 'CA'
  | 'AU'
  | 'PK'
  | 'IN'
  | 'MY'
  | 'SA'
  | 'AE'
  | 'OTHER';

export type LanguageId = 'english' | 'urdu' | 'hindi' | 'arabic' | 'other';

export type BackgroundOptionId =
  | 'not-muslim'
  | 'revert'
  | 'reconnecting'
  | 'practising';

export type GoalOptionId =
  | 'foundations'
  | 'pillars'
  | 'iman'
  | 'salah'
  | 'quran'
  | 'dhikr'
  | 'prophets'
  | 'consistency';

export type CommitmentOptionId = '5-10' | '10-15' | '15-20';

export type StartingPointId =
  | 'basics'
  | 'allah-iman'
  | 'salah-meaning'
  | 'quran'
  | 'explore';

export interface OnboardingAnswers {
  preferredName: string;
  ageGroup: AgeGroupId | null;
  country: CountryCode | '';
  preferredLanguage: LanguageId | null;
  islamicBackground: BackgroundOptionId | null;
  learningGoals: GoalOptionId[];
  dailyCommitment: CommitmentOptionId | null;
  startingPoint: StartingPointId | null;
}

export interface Step1ValidationErrors {
  preferredName?: string;
  ageGroup?: string;
  country?: string;
  preferredLanguage?: string;
}

export interface QuizOption<TId extends string> {
  id: TId;
  label: string;
  mobileLabel?: string;
  description?: string;
  mobileDescription?: string;
}

