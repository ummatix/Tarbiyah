import type { ReactNode } from 'react';
import { BookOpen, Compass, GraduationCap, Sprout } from 'lucide-react';
import { BACKGROUND_OPTIONS } from '../../data/quizQuestions';
import type { BackgroundOptionId } from '../../types/onboarding';
import { QuizSingleSelectCard } from '../QuizSingleSelectCard';

const BACKGROUND_ICONS: Record<BackgroundOptionId, ReactNode> = {
  'not-muslim': <Compass className="h-5 w-5" />,
  revert: <Sprout className="h-5 w-5" />,
  reconnecting: <BookOpen className="h-5 w-5" />,
  practising: <GraduationCap className="h-5 w-5" />,
};

interface QuizStep2BackgroundProps {
  value: BackgroundOptionId | null;
  onChange: (value: BackgroundOptionId) => void;
}

export function QuizStep2Background({ value, onChange }: QuizStep2BackgroundProps) {
  return (
    <div className="flex flex-col gap-space-md lg:gap-space-lg">
      <div className="flex flex-col gap-1">
        <span className="hidden font-label-md text-label-md font-bold uppercase tracking-wider text-primary lg:inline">
          Step 2 of 5
        </span>
        <h2 className="font-heading text-headline-lg-mobile text-on-surface lg:text-headline-md">
          Where are you on your Islamic journey?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Everyone starts somewhere. Choose what describes you best.
        </p>
      </div>

      <div aria-label="Islamic Background" className="flex flex-col gap-3" role="radiogroup">
        {BACKGROUND_OPTIONS.map((opt) => (
          <QuizSingleSelectCard
            description={opt.description}
            icon={BACKGROUND_ICONS[opt.id]}
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

