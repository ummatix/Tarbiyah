import type { ReactNode } from 'react';
import { BookOpen, Compass, LayoutGrid, Lightbulb, Sparkles } from 'lucide-react';
import { STARTING_POINT_OPTIONS } from '../../data/quizQuestions';
import type { StartingPointId } from '../../types/onboarding';
import { QuizSingleSelectCard } from '../QuizSingleSelectCard';

const STARTING_ICONS: Record<StartingPointId, ReactNode> = {
  basics: <Lightbulb className="h-5 w-5" />,
  'allah-iman': <Sparkles className="h-5 w-5" />,
  'salah-meaning': <Compass className="h-5 w-5" />,
  quran: <BookOpen className="h-5 w-5" />,
  explore: <LayoutGrid className="h-5 w-5" />,
};

interface QuizStep5StartingPointProps {
  value: StartingPointId | null;
  onChange: (value: StartingPointId) => void;
}

export function QuizStep5StartingPoint({ value, onChange }: QuizStep5StartingPointProps) {
  return (
    <div className="flex flex-col gap-space-md lg:gap-space-lg">
      <div className="flex flex-col gap-1">
        <span className="hidden font-label-md text-label-md font-bold uppercase tracking-wider text-primary lg:inline">
          Step 5 of 5
        </span>
        <h2 className="font-heading text-headline-lg-mobile text-on-surface lg:text-headline-md">
          Where would you like to begin?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Choose what you&apos;d like to explore first.
        </p>
      </div>

      <div aria-label="Learning Starting Point" className="flex flex-col gap-3" role="radiogroup">
        {STARTING_POINT_OPTIONS.map((opt) => (
          <QuizSingleSelectCard
            description={opt.description}
            icon={STARTING_ICONS[opt.id]}
            key={opt.id}
            onSelect={() => onChange(opt.id)}
            selected={value === opt.id}
            title={opt.label}
          />
        ))}
      </div>
    </div>
  );
}

