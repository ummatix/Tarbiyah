import type { ReactNode } from 'react';
import {
  BookOpen,
  BookText,
  Compass,
  Heart,
  History,
  Landmark,
  Repeat,
  Sparkles,
} from 'lucide-react';
import { GOAL_OPTIONS } from '../../data/quizQuestions';
import type { GoalOptionId } from '../../types/onboarding';
import { QuizMultiSelectCard } from '../QuizMultiSelectCard';

const GOAL_ICONS: Record<GoalOptionId, ReactNode> = {
  foundations: <BookText className="h-5 w-5" />,
  pillars: <Landmark className="h-5 w-5" />,
  iman: <Heart className="h-5 w-5" />,
  salah: <Compass className="h-5 w-5" />,
  quran: <BookOpen className="h-5 w-5" />,
  dhikr: <Sparkles className="h-5 w-5" />,
  prophets: <History className="h-5 w-5" />,
  consistency: <Repeat className="h-5 w-5" />,
};

interface QuizStep3GoalsProps {
  selectedGoals: GoalOptionId[];
  onToggleGoal: (goal: GoalOptionId) => void;
}

export function QuizStep3Goals({ selectedGoals, onToggleGoal }: QuizStep3GoalsProps) {
  return (
    <div className="flex flex-col gap-space-md lg:gap-space-lg">
      <div className="flex flex-col gap-1">
        <div className="hidden items-center justify-between lg:flex">
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">
            Step 3 of 5
          </span>
          <span className="font-label-sm text-label-sm font-bold text-secondary">
            Select all that apply
          </span>
        </div>
        <h2 className="font-heading text-headline-lg-mobile text-on-surface lg:text-headline-md">
          What would you like to learn?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Choose the topics you&apos;d like to focus on. You can select more than one.
        </p>
      </div>

      <div
        aria-label="Learning Goals"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:gap-3"
        role="group"
      >
        {GOAL_OPTIONS.map((goal) => (
          <QuizMultiSelectCard
            description={goal.description}
            icon={GOAL_ICONS[goal.id]}
            key={goal.id}
            onToggle={() => onToggleGoal(goal.id)}
            selected={selectedGoals.includes(goal.id)}
            title={goal.label}
          />
        ))}
      </div>
    </div>
  );
}

