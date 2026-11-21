import { useEffect, useState } from 'react';
import { Check, Copy, RefreshCw } from 'lucide-react';
import {
  fetchDailyAyat,
  getLocalCalendarDateKey,
  readCachedDailyAyat,
} from '../services/alquranApi';
import type { DailyAyat } from '../types/ayat';

export function AyatOfTheDayCard() {
  const [dateKey, setDateKey] = useState<string>(() => getLocalCalendarDateKey());
  const [ayat, setAyat] = useState<DailyAyat | null>(() =>
    readCachedDailyAyat(getLocalCalendarDateKey())
  );
  const [loading, setLoading] = useState<boolean>(() => ayat === null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Sync with local calendar date if tab remains open past midnight
  useEffect(() => {
    const checkDateChange = () => {
      const nextKey = getLocalCalendarDateKey();
      setDateKey((prev) => (prev === nextKey ? prev : nextKey));
    };

    const interval = window.setInterval(checkDateChange, 60_000);
    window.addEventListener('visibilitychange', checkDateChange);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('visibilitychange', checkDateChange);
    };
  }, []);

  useEffect(() => {
    const cached = readCachedDailyAyat(dateKey);
    if (cached) {
      setAyat(cached);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    void fetchDailyAyat(dateKey, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setAyat(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setAyat(null);
          setLoading(false);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load today's verse right now."
          );
        }
      });

    return () => controller.abort();
  }, [dateKey, retryCount]);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    if (!ayat || typeof navigator === 'undefined' || !navigator.clipboard) return;
    const formatted = `${ayat.arabicText}\n\n"${ayat.englishText}"\n— Surah ${ayat.surahName} (${ayat.reference}) • ${ayat.translationSource}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
    } catch {
      // Ignore clipboard write errors in restricted environments
    }
  };

  return (
    <section
      aria-labelledby="ayat-of-the-day-heading"
      className="rounded-xl border border-outline-variant/45 bg-surface-container-lowest p-6 shadow-theme-card dark:border-outline-variant sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          className="font-label-md text-label-md font-semibold uppercase tracking-wider text-primary"
          id="ayat-of-the-day-heading"
        >
          Ayat of the Day
        </h2>

        {ayat ? (
          <button
            aria-label="Copy verse"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => void handleCopy()}
            type="button"
          >
            {copied ? (
              <>
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        ) : null}
      </div>

      {loading ? (
        <div aria-live="polite" className="mt-5 space-y-3 py-2">
          <div className="ml-auto h-7 w-4/5 animate-pulse rounded bg-surface-container-high motion-reduce:animate-none" />
          <div className="h-4 w-full animate-pulse rounded bg-surface-container-high motion-reduce:animate-none" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-surface-container-high motion-reduce:animate-none" />
        </div>
      ) : null}

      {error && !loading ? (
        <div className="mt-4 rounded-lg border border-outline-variant/45 bg-surface-container-low p-4 dark:border-outline-variant">
          <p className="font-body-md text-body-md text-on-surface-variant">{error}</p>
          <button
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 font-label-md text-label-md font-semibold text-on-primary transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setRetryCount((c) => c + 1)}
            type="button"
          >
            <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Try again</span>
          </button>
        </div>
      ) : null}

      {ayat && !loading && !error ? (
        <div className="mt-5">
          <p
            className="font-arabic text-right text-[26px] leading-[2.05] text-on-surface sm:text-[30px]"
            dir="rtl"
            lang="ar"
          >
            {ayat.arabicText}
          </p>

          <p className="mt-4 font-body-lg text-body-lg leading-relaxed text-on-surface">
            “{ayat.englishText}”
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/40 pt-3.5 font-body-sm text-body-sm text-on-surface-variant dark:border-outline-variant/75">
            <span>
              Surah {ayat.surahName} • {ayat.reference}
            </span>
            <span>Translation: {ayat.translationSource}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}

