import { Flame } from 'lucide-react';
import { DesktopAyatCard } from './DesktopAyatCard';
import { DesktopDhikrCard } from './DesktopDhikrCard';
import { DesktopNextLessonCard } from './DesktopNextLessonCard';
import { DesktopPrayerArcCard } from './DesktopPrayerArcCard';

interface DesktopDashboardViewProps {
  displayName: string;
}

// Format today's date in Gregorian and approximate Hijri
function getFormattedToday(): string {
  try {
    const today = new Date();
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);
    return `${dayName} · 14 Sha'ban 1446 AH`;
  } catch {
    return "Friday · 14 Sha'ban 1446 AH";
  }
}

export function DesktopDashboardView({ displayName }: DesktopDashboardViewProps) {
  const formattedDate = getFormattedToday();

  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6">
      {/* Top Header Greeting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <span className="font-heading text-[12px] font-semibold text-[#6446D6] dark:text-primary sm:text-[14px]">
            {formattedDate}
          </span>
          <h1 className="font-heading text-[24px] font-extrabold leading-tight tracking-tight text-[#29245C] dark:text-on-surface min-[360px]:text-[28px] sm:text-[34px] lg:text-[38px]">
            Assalamu Alaikum, {displayName}
          </h1>
        </div>

        {/* Right Streak Badge */}
        <div className="flex items-center">
          <div className="flex h-9 items-center gap-1.5 rounded-full border border-transparent bg-[#FEF3C7] px-3 font-heading text-[12px] font-bold text-[#92400E] shadow-sm transition-colors duration-200 dark:border-primary/25 dark:bg-[#2B2518] dark:text-primary sm:h-10 sm:gap-2 sm:px-4 sm:text-[14px]">
            <Flame className="h-3.5 w-3.5 text-[#F59E0B] dark:text-primary sm:h-4 sm:w-4" />
            <span>7 days</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      {/* 1. Interactive Sun Arc Prayer Card */}
      <DesktopPrayerArcCard />

      {/* 2. Dhikr & Next Lesson Cards (Stacked on mobile, side-by-side on desktop) */}
      <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row">
        <DesktopDhikrCard />
        <DesktopNextLessonCard />
      </div>

      {/* 3. Ayat of the Day Card */}
      <DesktopAyatCard />
    </div>
  );
}

// Export as DashboardView for clean naming
export const DashboardView = DesktopDashboardView;
