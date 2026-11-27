import { useState } from 'react';
import { useTheme } from '../../../theme/ThemeContext';

export function DesktopDhikrCard() {
  const { isDark } = useTheme();
  const [count, setCount] = useState<number>(12);

  const target = 33;
  const left = Math.max(0, target - count);
  const D = 2 * Math.PI * 58; // 364.42
  const ringOffset = D * (1 - Math.min(1, count / target));

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleUndo = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const note = left > 0 ? `${left} more to finish` : 'Target reached, MashaAllah';

  return (
    <section
      aria-label="Dhikr"
      className="group flex flex-1 basis-[440px] flex-col items-center gap-5 rounded-2xl border border-[#ECE8FB] bg-white p-5 shadow-[0_2px_10px_rgba(41,36,92,0.05)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(118,86,232,0.10)] dark:border-outline-variant/80 dark:bg-surface-container-lowest dark:shadow-[0_8px_28px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.45)] min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-6 sm:rounded-[24px] sm:p-7"
    >
      {/* Circular Progress Ring */}
      <div className="relative h-[120px] w-[120px] shrink-0 sm:h-[132px] sm:w-[132px]">
        <svg
          aria-hidden="true"
          className="h-full w-full -rotate-90 transform"
          fill="none"
          viewBox="0 0 132 132"
        >
          <circle
            cx="66"
            cy="66"
            r="58"
            stroke={isDark ? '#143034' : '#E3F8F6'}
            strokeWidth="10"
          />
          <circle
            cx="66"
            cy="66"
            r="58"
            stroke="#35C9BE"
            strokeDasharray={D}
            strokeDashoffset={ringOffset}
            strokeLinecap="round"
            strokeWidth="10"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-[30px] font-extrabold leading-none text-[#29245C] dark:text-on-surface sm:text-[34px]">
            {count}
          </span>
          <span className="mt-1 text-[12px] font-medium text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
            of {target}
          </span>
        </div>
      </div>

      {/* Details & Controls */}
      <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-2 text-center min-[480px]:items-start min-[480px]:text-left sm:gap-2.5">
        <span className="font-heading text-[12px] font-bold tracking-[0.12em] text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
          PICK UP YOUR DHIKR
        </span>

        <div
          className="font-arabic text-[28px] leading-relaxed text-[#29245C] dark:text-on-surface sm:text-[34px]"
          dir="rtl"
          lang="ar"
        >
          سُبْحَانَ اللَّهِ
        </div>

        <p className="text-[13px] text-[#4A4678] dark:text-on-surface-variant sm:text-[14px]">
          SubhanAllah · {note}
        </p>

        <div className="mt-1 flex w-full flex-wrap justify-center gap-2.5 min-[480px]:w-auto min-[480px]:justify-start">
          <button
            className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-2xl bg-[#7656E8] px-5 font-heading text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(118,86,232,0.28)] transition-all duration-150 hover:shadow-[0_12px_24px_rgba(118,86,232,0.36)] active:scale-95 dark:bg-primary dark:text-on-primary dark:shadow-[0_8px_18px_rgba(234,203,131,0.22)] min-[400px]:flex-initial sm:h-12 sm:px-6 sm:text-[15px]"
            onClick={handleIncrement}
            type="button"
          >
            Count one
          </button>
          <button
            className="flex h-11 cursor-pointer items-center justify-center rounded-2xl border border-[#CFC6F5] bg-white px-4 font-heading text-[14px] font-semibold text-[#29245C] transition-colors duration-150 hover:bg-[#F0EDFF] active:scale-95 dark:border-outline-variant dark:bg-surface-container-low dark:text-on-surface dark:hover:bg-surface-container sm:h-12 sm:px-5 sm:text-[15px]"
            onClick={handleUndo}
            type="button"
          >
            Undo
          </button>
        </div>
      </div>
    </section>
  );
}
