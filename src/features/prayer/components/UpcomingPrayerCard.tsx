import { useEffect, useState, type FormEvent } from 'react';
import { ChevronDown, ChevronUp, MapPin, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { CALCULATION_METHODS } from '../services/aladhanApi';
import type { AsrSchool } from '../types/prayer';
import { formatCountdown } from '../utils/prayerTimeUtils';

export function UpcomingPrayerCard() {
  const {
    location,
    methodId,
    school,
    todaySchedule,
    nextPrayer,
    geoLoading,
    geoError,
    permissionDenied,
    apiLoading,
    apiError,
    requestGeolocation,
    selectCityLocation,
    retryFetch,
    setMethodId,
    setSchool,
  } = usePrayerTimes();

  const [showManualForm, setShowManualForm] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showAllPrayers, setShowAllPrayers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (permissionDenied || geoError) {
      setShowManualForm(true);
    }
  }, [permissionDenied, geoError]);

  const handleCitySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!cityInput.trim() || !countryInput.trim()) {
      setFormError('Please enter both your city and country.');
      return;
    }
    setFormError(null);
    selectCityLocation(cityInput, countryInput);
    setShowManualForm(false);
  };

  const isLoading = geoLoading || apiLoading;
  const activeMethodLabel =
    todaySchedule?.methodName ??
    (methodId !== null
      ? CALCULATION_METHODS.find((m) => m.id === methodId)?.name ?? 'Regional Default'
      : 'Regional Default');

  return (
    <section
      aria-labelledby="upcoming-prayer-heading"
      className="rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-theme-card dark:border-outline-variant sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="font-heading text-headline-sm font-semibold text-on-surface"
            id="upcoming-prayer-heading"
          >
            Upcoming Prayer
          </h2>
        </div>

        {location && !showManualForm ? (
          <button
            className="shrink-0 cursor-pointer font-label-md text-label-md text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setShowManualForm(true)}
            type="button"
          >
            Change location
          </button>
        ) : null}
      </div>

      {/* Unconfigured initial state (only prompts for location after explicit user click) */}
      {!location && !isLoading ? (
        <div className="mt-3">
          <p className="font-body-md text-body-md text-on-surface-variant">
            See prayer times for your location
          </p>

          {geoError ? (
            <p
              className="mt-2.5 rounded-lg border border-outline-variant/50 bg-surface-container-low px-3.5 py-2.5 font-body-sm text-body-sm text-on-surface-variant dark:border-outline-variant"
              role="status"
            >
              {geoError}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2 font-label-lg text-label-lg font-semibold text-on-primary shadow-sm transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              onClick={requestGeolocation}
              type="button"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              <span>Use my location</span>
            </button>

            {!showManualForm ? (
              <button
                className="min-h-[42px] cursor-pointer rounded-full border border-outline-variant/70 px-4 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-outline-variant"
                onClick={() => setShowManualForm(true)}
                type="button"
              >
                Choose city manually
              </button>
            ) : null}
          </div>

          <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">
            Coordinates are sent directly to AlAdhan to look up prayer times and are not saved in
            browser storage or your account.
          </p>
        </div>
      ) : null}

      {/* Loading state */}
      {isLoading ? (
        <div aria-live="polite" className="mt-4 space-y-2 py-2">
          <p className="font-body-md text-body-md text-on-surface-variant">
            {geoLoading ? 'Requesting your location...' : 'Loading prayer times...'}
          </p>
          <div className="h-2 w-36 animate-pulse rounded-full bg-surface-container-high motion-reduce:animate-none" />
        </div>
      ) : null}

      {/* API Error state */}
      {apiError && !isLoading ? (
        <div
          className="mt-4 rounded-lg border border-error/30 bg-error-container/45 px-4 py-3 text-on-surface dark:border-error/40"
          role="alert"
        >
          <p className="font-body-md text-body-md text-on-error-container">{apiError}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 font-label-md text-label-md font-semibold text-on-primary"
              onClick={retryFetch}
              type="button"
            >
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Try again</span>
            </button>
            <button
              className="cursor-pointer font-label-md text-label-md text-on-surface-variant underline hover:text-on-surface"
              onClick={() => setShowManualForm(true)}
              type="button"
            >
              Choose a different city
            </button>
          </div>
        </div>
      ) : null}

      {/* Loaded Upcoming Prayer Display */}
      {location && todaySchedule && nextPrayer && !isLoading && !apiError ? (
        <div className="mt-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-headline-md font-bold text-on-surface sm:text-[28px]">
                {nextPrayer.prayer.name}
              </span>
              <span className="font-heading text-headline-sm font-semibold tabular-nums text-on-surface">
                {nextPrayer.prayer.formattedTime}
              </span>
              {nextPrayer.isTomorrow ? (
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Tomorrow
                </span>
              ) : null}
            </div>

            <p className="font-label-lg text-label-lg font-semibold tabular-nums text-primary">
              {formatCountdown(nextPrayer.remainingMs)}
            </p>
          </div>

          <div className="mt-3.5 space-y-1 font-body-sm text-body-sm">
            <p className="flex items-center gap-1.5 text-on-surface-variant">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-outline" />
              <span>
                <span className="font-medium text-on-surface">Location:</span>{' '}
                {location.type === 'geolocation'
                  ? 'Current location'
                  : `${location.city}, ${location.country}`}
              </span>
            </p>
            <p className="text-outline">
              Method: {activeMethodLabel} • Asr: {school === 1 ? 'Hanafi' : 'Shafi / Standard'}
            </p>
          </div>

          {/* Toggle controls */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-outline-variant/40 pt-3.5 dark:border-outline-variant/75">
            <button
              aria-expanded={showAllPrayers}
              className="inline-flex cursor-pointer items-center gap-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShowAllPrayers((prev) => !prev)}
              type="button"
            >
              <span>{showAllPrayers ? 'Hide all prayers' : 'View all 5 prayers'}</span>
              {showAllPrayers ? (
                <ChevronUp aria-hidden="true" className="h-4 w-4" />
              ) : (
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              )}
            </button>

            <button
              aria-expanded={showSettings}
              className="inline-flex cursor-pointer items-center gap-1.5 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setShowSettings((prev) => !prev)}
              type="button"
            >
              <SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Calculation settings</span>
            </button>
          </div>

          {/* Expandable 5 Daily Prayers */}
          {showAllPrayers ? (
            <div className="mt-3.5 space-y-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-low p-3 dark:border-outline-variant">
              {todaySchedule.prayers.map((prayer) => {
                const isNextToday =
                  !nextPrayer.isTomorrow && nextPrayer.prayer.name === prayer.name;
                return (
                  <div
                    className={`flex items-center justify-between rounded-md px-3 py-2 ${
                      isNextToday
                        ? 'bg-surface-container text-primary dark:bg-surface-container-high'
                        : 'text-on-surface'
                    }`}
                    key={prayer.name}
                  >
                    <span
                      className={`font-label-lg text-label-lg ${
                        isNextToday ? 'font-semibold' : 'font-medium'
                      }`}
                    >
                      {prayer.name}
                      {isNextToday ? (
                        <span className="ml-2 font-label-sm text-label-sm font-normal text-primary">
                          Next
                        </span>
                      ) : null}
                    </span>
                    <span className="font-body-md text-body-md tabular-nums">
                      {prayer.formattedTime}
                    </span>
                  </div>
                );
              })}
              {nextPrayer.isTomorrow ? (
                <p className="px-3 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                  Today&apos;s five prayers have completed. Next prayer is tomorrow&apos;s Fajr at{' '}
                  {nextPrayer.prayer.formattedTime}.
                </p>
              ) : null}
            </div>
          ) : null}

          {/* Expandable Calculation Method & Asr School Settings */}
          {showSettings ? (
            <div className="mt-3.5 space-y-3 rounded-lg border border-outline-variant/40 bg-surface-container-low p-4 dark:border-outline-variant">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="prayer-method-select"
                  >
                    Calculation method
                  </label>
                  <select
                    className="h-10 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:border-outline-variant"
                    id="prayer-method-select"
                    onChange={(e) => {
                      const val = e.target.value;
                      setMethodId(val === 'auto' ? null : Number(val));
                    }}
                    value={methodId === null ? 'auto' : String(methodId)}
                  >
                    <option value="auto">API Default (By region)</option>
                    {CALCULATION_METHODS.map((m) => (
                      <option key={m.id} value={String(m.id)}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="prayer-school-select"
                  >
                    Asr juristic school
                  </label>
                  <select
                    className="h-10 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:border-outline-variant"
                    id="prayer-school-select"
                    onChange={(e) => setSchool(Number(e.target.value) as AsrSchool)}
                    value={String(school)}
                  >
                    <option value="0">Shafi / Standard</option>
                    <option value="1">Hanafi</option>
                  </select>
                </div>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Calculated timings may differ slightly from your local mosque timetable.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Manual City & Country Fallback / Location Switcher Form */}
      {showManualForm ? (
        <form
          className="mt-4 space-y-3 rounded-lg border border-outline-variant/45 bg-surface-container-low p-4 dark:border-outline-variant"
          noValidate
          onSubmit={handleCitySubmit}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-label-md text-label-md font-semibold text-on-surface">
              Enter city and country
            </p>
            <button
              className="cursor-pointer font-label-sm text-label-sm text-primary hover:underline"
              onClick={() => {
                setShowManualForm(false);
                requestGeolocation();
              }}
              type="button"
            >
              Use my location instead
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant"
                htmlFor="prayer-city-input"
              >
                City
              </label>
              <input
                className="h-10 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary dark:border-outline-variant"
                id="prayer-city-input"
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="e.g. London"
                type="text"
                value={cityInput}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-label-sm text-label-sm text-on-surface-variant"
                htmlFor="prayer-country-input"
              >
                Country
              </label>
              <input
                className="h-10 rounded-lg border border-outline-variant/60 bg-surface-container-lowest px-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary dark:border-outline-variant"
                id="prayer-country-input"
                onChange={(e) => setCountryInput(e.target.value)}
                placeholder="e.g. United Kingdom"
                type="text"
                value={countryInput}
              />
            </div>
          </div>

          {formError ? (
            <p className="font-body-sm text-body-sm text-error" role="alert">
              {formError}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="cursor-pointer rounded-full bg-primary px-4 py-2 font-label-md text-label-md font-semibold text-on-primary transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              type="submit"
            >
              Show prayer times
            </button>
            <button
              className="cursor-pointer font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              onClick={() => {
                setFormError(null);
                setShowManualForm(false);
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}

