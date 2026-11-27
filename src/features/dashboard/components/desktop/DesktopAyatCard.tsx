import { useEffect, useState } from 'react';
import {
  fetchDailyAyat,
  getLocalCalendarDateKey,
  readCachedDailyAyat,
} from '../../../ayat/services/alquranApi';
import type { DailyAyat } from '../../../ayat/types/ayat';

const DEFAULT_AYAT: DailyAyat = {
  dateKey: 'default',
  surahNumber: 13,
  surahName: "Ar-Ra'd",
  ayahNumberInSurah: 28,
  arabicText:
    'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
  englishText:
    'Those who have believed and whose hearts find peace in the remembrance of Allah. Unquestionably, by the remembrance of Allah do hearts find peace.',
  reference: '13:28',
  translationSource: 'Saheeh International',
};

export function DesktopAyatCard() {
  const [ayat, setAyat] = useState<DailyAyat>(() => {
    const cached = readCachedDailyAyat(getLocalCalendarDateKey());
    return cached ?? DEFAULT_AYAT;
  });

  useEffect(() => {
    const key = getLocalCalendarDateKey();
    const cached = readCachedDailyAyat(key);
    if (cached) {
      setAyat(cached);
      return;
    }

    const controller = new AbortController();
    fetchDailyAyat(key, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted && data) {
          setAyat(data);
        }
      })
      .catch(() => {
        // Fallback to demonstration ayat from HTML design
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      aria-label="Ayat of the day"
      className="group flex flex-col items-center gap-5 rounded-2xl border border-[#ECE8FB] bg-white p-5 shadow-[0_2px_10px_rgba(41,36,92,0.05)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(118,86,232,0.10)] dark:border-outline-variant/80 dark:bg-surface-container-lowest dark:shadow-[0_8px_28px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.45)] sm:rounded-[24px] sm:p-7 md:flex-row lg:gap-8 lg:px-8 lg:py-7"
    >
      <div className="flex w-full min-w-0 flex-1 basis-[320px] flex-col gap-2">
        <span className="font-heading text-[12px] font-bold tracking-[0.12em] text-[#66628F] dark:text-on-surface-variant sm:text-[13px]">
          AYAT OF THE DAY
        </span>
        <blockquote className="text-[15px] italic leading-relaxed text-[#4A4678] dark:text-on-surface-variant sm:text-[17px]">
          “{ayat.englishText}”
        </blockquote>
        <span className="font-heading text-[12px] font-bold tracking-[0.08em] text-[#6446D6] dark:text-primary sm:text-[13px]">
          SURAH {ayat.surahName.toUpperCase()} ({ayat.reference})
        </span>
      </div>

      <div
        className="w-full min-w-0 flex-1 basis-[360px] text-center font-arabic text-[24px] leading-relaxed text-[#29245C] dark:text-on-surface min-[360px]:text-[26px] sm:text-[30px] md:leading-[2] xl:text-[32px]"
        dir="rtl"
        lang="ar"
      >
        {ayat.arabicText}
      </div>
    </section>
  );
}
