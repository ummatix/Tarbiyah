import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  addDaysToCalendarDate,
  DEFAULT_ASR_SCHOOL,
  fetchPrayerSchedule,
  getDatePartsInTimeZone,
} from '../services/aladhanApi';
import type {
  AsrSchool,
  DailyPrayerSchedule,
  LocationSource,
  NextPrayerInfo,
} from '../types/prayer';
import { resolveNextPrayer } from '../utils/prayerTimeUtils';

const PRAYER_SETTINGS_KEY = 'tarbiyah_prayer_settings';

interface StoredPrayerSettings {
  methodId: number | null;
  school: AsrSchool;
}

function readStoredSettings(): StoredPrayerSettings {
  try {
    const raw = window.localStorage.getItem(PRAYER_SETTINGS_KEY);
    if (!raw) return { methodId: null, school: DEFAULT_ASR_SCHOOL };
    const parsed = JSON.parse(raw) as Partial<StoredPrayerSettings>;
    return {
      methodId: typeof parsed.methodId === 'number' ? parsed.methodId : null,
      school: parsed.school === 1 ? 1 : 0,
    };
  } catch {
    return { methodId: null, school: DEFAULT_ASR_SCHOOL };
  }
}

function writeStoredSettings(settings: StoredPrayerSettings): void {
  try {
    window.localStorage.setItem(PRAYER_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export function usePrayerTimes() {
  const initialSettings = useMemo(() => readStoredSettings(), []);
  // Coordinates remain strictly in React session state and are never persisted or exposed in UI.
  const [location, setLocation] = useState<LocationSource | null>(null);
  const [methodId, setMethodIdState] = useState<number | null>(initialSettings.methodId);
  const [school, setSchoolState] = useState<AsrSchool>(initialSettings.school);
  const [activeDateKey, setActiveDateKey] = useState<string>(
    () => getDatePartsInTimeZone().dateKey
  );
  const [todaySchedule, setTodaySchedule] = useState<DailyPrayerSchedule | null>(null);
  const [tomorrowSchedule, setTomorrowSchedule] = useState<DailyPrayerSchedule | null>(null);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchingTomorrowRef = useRef(false);
  const locationTimezoneRef = useRef<string | undefined>(undefined);

  const setMethodId = useCallback(
    (nextMethodId: number | null) => {
      setMethodIdState(nextMethodId);
      writeStoredSettings({ methodId: nextMethodId, school });
    },
    [school]
  );

  const setSchool = useCallback(
    (nextSchool: AsrSchool) => {
      setSchoolState(nextSchool);
      writeStoredSettings({ methodId, school: nextSchool });
    },
    [methodId]
  );

  const requestGeolocation = useCallback(() => {
    setGeoError(null);
    setApiError(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setPermissionDenied(true);
      setGeoError('Browser location is not available here. You can select your city manually.');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLoading(false);
        setPermissionDenied(false);
        setGeoError(null);
        locationTimezoneRef.current = undefined;
        setLocation({
          type: 'geolocation',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setGeoLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionDenied(true);
          setGeoError(
            'Location permission was declined. Choose your city and country below to view prayer times.'
          );
        } else {
          setGeoError(
            'Could not determine your location right now. You can retry or enter your city below.'
          );
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  const selectCityLocation = useCallback((city: string, country: string) => {
    setGeoError(null);
    setApiError(null);
    setPermissionDenied(false);
    locationTimezoneRef.current = undefined;
    setLocation({
      type: 'city',
      city: city.trim(),
      country: country.trim(),
    });
  }, []);

  const retryFetch = useCallback(() => {
    setApiError(null);
    setRetryCount((c) => c + 1);
  }, []);

  // Fetch today's (and, if Isha has already passed, tomorrow's) schedule from AlAdhan
  useEffect(() => {
    if (!location) {
      setTodaySchedule(null);
      setTomorrowSchedule(null);
      setApiError(null);
      setApiLoading(false);
      return;
    }

    const controller = new AbortController();
    fetchingTomorrowRef.current = false;

    async function loadSchedules() {
      if (!location) return;
      setApiLoading(true);
      setApiError(null);

      try {
        const initialDateParts = getDatePartsInTimeZone(locationTimezoneRef.current);
        let todayData = await fetchPrayerSchedule({
          location,
          dateParts: initialDateParts,
          methodId,
          school,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        locationTimezoneRef.current = todayData.timezone;
        const locationTodayParts = getDatePartsInTimeZone(todayData.timezone);

        // If device calendar date differs from selected location's meta.timezone date, align to locationTodayParts
        if (todayData.dateKey !== locationTodayParts.dateKey) {
          todayData = await fetchPrayerSchedule({
            location,
            dateParts: locationTodayParts,
            methodId,
            school,
            signal: controller.signal,
          });
          if (controller.signal.aborted) return;
        }

        let nextDayData: DailyPrayerSchedule | null = null;
        const currentTimeMs = Date.now();
        const ishaEntry = todayData.prayers[todayData.prayers.length - 1];
        if (ishaEntry && currentTimeMs >= ishaEntry.timestampMs) {
          const locationTomorrowParts = addDaysToCalendarDate(locationTodayParts.dateKey, 1);
          nextDayData = await fetchPrayerSchedule({
            location,
            dateParts: locationTomorrowParts,
            methodId,
            school,
            signal: controller.signal,
          });
        }

        if (controller.signal.aborted) return;

        setTodaySchedule(todayData);
        setTomorrowSchedule(nextDayData);
        setNowMs(Date.now());
      } catch (err) {
        if (controller.signal.aborted) return;
        setTodaySchedule(null);
        setTomorrowSchedule(null);
        setApiError(
          err instanceof Error
            ? err.message
            : 'Unable to load prayer times right now. Please try again.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setApiLoading(false);
        }
      }
    }

    void loadSchedules();

    return () => controller.abort();
  }, [location, methodId, school, activeDateKey, retryCount]);

  // 1-second local countdown tick & automatic transition after Isha / midnight in meta.timezone
  useEffect(() => {
    if (!location || !todaySchedule) return;

    const timer = window.setInterval(() => {
      const current = new Date();
      const currentMs = current.getTime();
      setNowMs(currentMs);

      const currentLocationDateKey = getDatePartsInTimeZone(
        todaySchedule.timezone,
        current
      ).dateKey;
      if (currentLocationDateKey !== todaySchedule.dateKey) {
        locationTimezoneRef.current = todaySchedule.timezone;
        setActiveDateKey(currentLocationDateKey);
        return;
      }

      const ishaEntry = todaySchedule.prayers[todaySchedule.prayers.length - 1];
      if (
        ishaEntry &&
        currentMs >= ishaEntry.timestampMs &&
        !tomorrowSchedule &&
        !fetchingTomorrowRef.current
      ) {
        fetchingTomorrowRef.current = true;
        const locationTomorrowParts = addDaysToCalendarDate(todaySchedule.dateKey, 1);
        void fetchPrayerSchedule({
          location,
          dateParts: locationTomorrowParts,
          methodId,
          school,
        })
          .then((data) => {
            setTomorrowSchedule(data);
          })
          .catch(() => {
            fetchingTomorrowRef.current = false;
          });
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [location, todaySchedule, tomorrowSchedule, methodId, school]);

  const nextPrayer: NextPrayerInfo | null = useMemo(() => {
    if (!todaySchedule) return null;
    return resolveNextPrayer(todaySchedule, tomorrowSchedule, nowMs);
  }, [todaySchedule, tomorrowSchedule, nowMs]);

  return {
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
  };
}

