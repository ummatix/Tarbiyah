import { useState } from 'react';
import { usePrayerTimes } from '../../../prayer/hooks/usePrayerTimes';
import { useTheme } from '../../../theme/ThemeContext';

const DEFAULT_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const DEFAULT_TIMES = ['5:12 AM', '12:18 PM', '3:41 PM', '6:09 PM', '7:36 PM'];
const DEFAULT_GAPS = ['passed', 'passed', 'in 31 min', 'in 3 h', 'in 4 h'];

export function PrayerArcCard() {
  const { todaySchedule } = usePrayerTimes();
  const { isDark } = useTheme();
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false]);

  // Use schedule times if available, otherwise demonstration times
  const times = DEFAULT_NAMES.map((name, i) => {
    if (todaySchedule?.prayers) {
      const p = todaySchedule.prayers.find(
        (prayer) => prayer.name.toLowerCase() === name.toLowerCase()
      );
      if (p) return p.formattedTime;
    }
    return DEFAULT_TIMES[i] ?? '';
  });

  const nextIdx = done.findIndex((d) => !d);
  const doneCount = done.filter(Boolean).length;

  let nextTitle: string;
  let nextSub: string;

  if (nextIdx === -1) {
    nextTitle = 'All five done today';
    nextSub = 'MashaAllah. Your streak is safe for today.';
  } else if (DEFAULT_GAPS[nextIdx] === 'passed') {
    nextTitle = `${DEFAULT_NAMES[nextIdx]} is waiting to be logged`;
    nextSub = `The time was ${times[nextIdx]}. Log it whenever you are ready.`;
  } else {
    nextTitle = `${DEFAULT_NAMES[nextIdx]} ${DEFAULT_GAPS[nextIdx]}`;
    nextSub = `${times[nextIdx]} · Take a breath and prepare for prayer.`;
  }

  const togglePrayer = (index: number) => {
    setDone((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const C = 188.5; // 2 * Math.PI * 30
  const ringOffset = C * (1 - doneCount / 5);

  return (
    <section
      aria-label="Prayers today"
      className="group flex flex-col gap-3 rounded-2xl border border-[#ECE8FB] bg-white p-4.5 pb-5 shadow-[0_2px_10px_rgba(41,36,92,0.05)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(118,86,232,0.10)] dark:border-outline-variant/80 dark:bg-surface-container-lowest dark:shadow-[0_8px_28px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.45)] sm:rounded-[24px] sm:p-6 lg:p-8 lg:pb-7"
    >
      <style>{`
        @keyframes desktop-prayer-pulse-light {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.45); }
          70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes desktop-prayer-pulse-dark {
          0% { box-shadow: 0 0 0 0 rgba(234, 203, 131, 0.45); }
          70% { box-shadow: 0 0 0 10px rgba(234, 203, 131, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 203, 131, 0); }
        }
        .desktop-prayer-next {
          animation: desktop-prayer-pulse-light 2.2s ease-out infinite;
        }
        :root.dark .desktop-prayer-next,
        html.dark .desktop-prayer-next {
          animation: desktop-prayer-pulse-dark 2.2s ease-out infinite;
        }

        /* Mobile positions: balanced arc spacing (ts = [0.07, 0.28, 0.50, 0.72, 0.93]) to prevent overlapping at 320px-430px */
        .prayer-node-pos-0 { left: 13.45%; top: 63.28%; }
        .prayer-node-pos-1 { left: 31.30%; top: 36.93%; }
        .prayer-node-pos-2 { left: 50.00%; top: 27.59%; }
        .prayer-node-pos-3 { left: 68.70%; top: 36.93%; }
        .prayer-node-pos-4 { left: 86.55%; top: 63.28%; }

        /* Desktop positions (>=1024px): exact original desktop layout (ts = [0.08, 0.38, 0.62, 0.82, 0.94]) */
        @media (min-width: 1024px) {
          .prayer-node-pos-0 { left: 14.30%; top: 61.64%; }
          .prayer-node-pos-1 { left: 39.80%; top: 30.34%; }
          .prayer-node-pos-2 { left: 60.20%; top: 30.34%; }
          .prayer-node-pos-3 { left: 77.20%; top: 47.46%; }
          .prayer-node-pos-4 { left: 87.40%; top: 65.03%; }
        }
      `}</style>

      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <span className="font-heading text-[11px] font-bold tracking-[0.12em] text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
            UP NEXT
          </span>
          <h2 className="font-heading text-[22px] font-extrabold leading-tight tracking-tight text-[#29245C] dark:text-on-surface min-[360px]:text-[24px] sm:text-[28px] lg:text-[34px]">
            {nextTitle}
          </h2>
          <p className="text-[13px] font-normal text-[#4A4678] dark:text-on-surface-variant sm:text-[15px]">
            {nextSub}
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <svg
              aria-hidden="true"
              className="h-full w-full -rotate-90 transform"
              fill="none"
              viewBox="0 0 76 76"
            >
              <circle
                cx="38"
                cy="38"
                r="30"
                stroke={isDark ? '#303647' : '#E1DAFB'}
                strokeWidth="8"
              />
              <circle
                cx="38"
                cy="38"
                r="30"
                stroke={isDark ? '#EACB83' : '#7656E8'}
                strokeDasharray={C}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                strokeWidth="8"
                style={{ transition: 'stroke-dashoffset 0.35s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-heading text-[14px] font-extrabold text-[#29245C] dark:text-on-surface sm:text-[16px] lg:text-[17px]">
              {doneCount}/5
            </div>
          </div>
          <div className="text-[11px] leading-tight text-[#4A4678] dark:text-on-surface-variant min-[360px]:text-[12px] sm:text-[14px] sm:leading-snug">
            prayers
            <br />
            logged today
          </div>
        </div>
      </div>

      {/* Parabolic Sun Arc Visualization */}
      <div
        className="relative mt-2 w-full overflow-visible"
        style={{ aspectRatio: '800 / 290' }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          viewBox="0 0 800 290"
        >
          {/* Base horizon line */}
          <line
            stroke={isDark ? '#303647' : '#ECE8FB'}
            strokeWidth="2"
            x1="20"
            x2="780"
            y1="220"
            y2="220"
          />
          {/* Background arc track */}
          <path
            d="M60 220 Q400 -60 740 220"
            stroke={isDark ? '#263044' : '#E1DAFB'}
            strokeDasharray="2 10"
            strokeLinecap="round"
            strokeWidth="4"
          />
          {/* Traveled arc progression */}
          <path
            d="M60 220 Q400 -60 740 220"
            pathLength="1"
            stroke={isDark ? '#EACB83' : '#7656E8'}
            strokeDasharray="0.55 1"
            strokeLinecap="round"
            strokeWidth="4"
          />
          {/* Sun glowing indicators */}
          <circle
            cx="434"
            cy="81"
            fill={isDark ? '#EACB83' : '#F59E0B'}
            opacity="0.18"
            r="26"
          />
          <circle cx="434" cy="81" fill={isDark ? '#EACB83' : '#F59E0B'} r="13" />
        </svg>

        {/* 5 Prayer Checkpoint Nodes */}
        {DEFAULT_NAMES.map((name, i) => {
          const isDone = done[i];
          const isNext = i === nextIdx;

          const btnBorder = isDone
            ? isDark
              ? '3px solid #EACB83'
              : '3px solid #7656E8'
            : isNext
              ? isDark
                ? '3px solid #EACB83'
                : '3px solid #F59E0B'
              : isDark
                ? '3px solid #303647'
                : '3px solid #CFC6F5';

          const btnBg = isDone
            ? isDark
              ? '#EACB83'
              : '#7656E8'
            : isDark
              ? '#151A28'
              : '#FFFFFF';

          const btnColor = isDone
            ? isDark
              ? '#17130A'
              : '#FFFFFF'
            : isNext
              ? isDark
                ? '#EACB83'
                : '#F59E0B'
              : isDark
                ? '#C7C0B5'
                : '#7656E8';

          return (
            <div
              className={`prayer-node-pos-${i} absolute flex flex-col items-center gap-1 sm:gap-1.5 lg:gap-2`}
              key={name}
              style={{
                transform: 'translate(-50%, -20%)',
              }}
            >
              <button
                aria-label={`${isDone ? 'Unmark' : 'Mark'} ${name} as prayed`}
                aria-pressed={isDone}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-150 active:scale-95 min-[360px]:h-8.5 min-[360px]:w-8.5 min-[400px]:h-9 min-[400px]:w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 ${
                  isNext ? 'desktop-prayer-next' : ''
                }`}
                onClick={() => togglePrayer(i)}
                style={{
                  border: btnBorder,
                  backgroundColor: btnBg,
                  color: btnColor,
                }}
                type="button"
              >
                {isDone ? (
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 min-[360px]:h-4 min-[360px]:w-4 lg:h-5 lg:w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : null}
              </button>

              <div className="text-center leading-tight">
                <div className="font-heading text-[10px] font-bold text-[#29245C] dark:text-on-surface min-[360px]:text-[11px] min-[400px]:text-[12px] sm:text-[13px] lg:text-[15px]">
                  {name}
                </div>
                <div className="text-[9px] text-[#66628F] dark:text-on-surface-variant min-[360px]:text-[10px] min-[400px]:text-[11px] sm:text-[12px] lg:text-[13px]">
                  {times[i]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-[11px] text-[#66628F] dark:text-on-surface-variant sm:mt-1 sm:text-[13px]">
        Tap a prayer to log it. You can also open Prayer to fill in earlier days.
      </div>
    </section>
  );
}

// Keep DesktopPrayerArcCard export alias for 100% backward compatibility
export const DesktopPrayerArcCard = PrayerArcCard;
