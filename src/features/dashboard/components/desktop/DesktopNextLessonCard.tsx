import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DesktopNextLessonCard() {
  return (
    <section
      aria-label="Next lesson"
      className="group flex flex-1 basis-[360px] flex-col gap-3 rounded-2xl border border-[#ECE8FB] bg-white p-5 shadow-[0_2px_10px_rgba(41,36,92,0.05)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(118,86,232,0.10)] dark:border-outline-variant/80 dark:bg-surface-container-lowest dark:shadow-[0_8px_28px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.45)] sm:rounded-[24px] sm:p-7 sm:gap-3.5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-heading text-[12px] font-bold tracking-[0.12em] text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
          NEXT LESSON
        </span>
        <span className="rounded-full border border-transparent bg-[#F0EDFF] px-3 py-1 font-heading text-[12px] font-semibold text-[#6446D6] transition-colors duration-200 dark:border-primary/25 dark:bg-primary/15 dark:text-primary sm:text-[13px]">
          4 min
        </span>
      </div>

      <h3 className="font-heading text-[20px] font-extrabold leading-snug tracking-tight text-[#29245C] dark:text-on-surface sm:text-[24px]">
        Why Salah matters
      </h3>

      <p className="text-[13px] leading-relaxed text-[#4A4678] dark:text-on-surface-variant sm:text-[14px]">
        Unit 2 · The Five Pillars. Three short cards and a quick quiz.
      </p>

      <div className="mt-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[12px] text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
          <span>Course progress</span>
          <span className="font-heading font-semibold text-[#6446D6] dark:text-primary">
            14 of 44
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EDFF] dark:bg-surface-container">
          <div
            className="h-full rounded-full bg-[#7656E8] dark:bg-primary"
            style={{ width: '32%' }}
          />
        </div>
      </div>

      <Link
        className="mt-3 flex h-11 items-center justify-center gap-2.5 rounded-2xl border border-transparent bg-[#F0EDFF] font-heading text-[14px] font-semibold text-[#6446D6] transition-colors duration-150 hover:bg-[#E5DEFF] active:scale-95 dark:border-primary/30 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30 sm:mt-auto sm:h-12 sm:text-[15px]"
        to="/app#journey"
      >
        <span>Continue</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
