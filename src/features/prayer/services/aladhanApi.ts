import type {
  AsrSchool,
  DailyPrayerSchedule,
  LocationSource,
  PrayerMethodOption,
  PrayerName,
  PrayerTimingEntry,
} from '../types/prayer';

const ALADHAN_BASE_URL = 'https://api.aladhan.com/v1';

export const OBLIGATORY_PRAYERS: PrayerName[] = [
  'Fajr',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
];

/**
 * Documented AlAdhan calculation methods retrieved from /v1/methods.
 */
export const CALCULATION_METHODS: PrayerMethodOption[] = [
  { id: 3, name: 'Muslim World League' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 5, name: 'Egyptian General Authority of Survey' },
  { id: 15, name: 'Moonsighting Committee Worldwide' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 11, name: 'Majlis Ugama Islam Singapura' },
  { id: 12, name: 'Union Organization Islamic de France' },
  { id: 8, name: 'Gulf Region' },
];

export const DEFAULT_ASR_SCHOOL: AsrSchool = 0;

interface AlAdhanApiResponse {
  code: number;
  status: string;
  data?: {
    timings?: Record<string, string>;
    meta?: {
      timezone?: string;
      method?: {
        id?: number;
        name?: string;
      };
      school?: string;
    };
  };
}

export interface CalendarDateParts {
  year: number;
  month: number;
  day: number;
  dateKey: string;
  aladhanDate: string;
}

function buildCalendarDateParts(year: number, month: number, day: number): CalendarDateParts {
  const y = String(year).padStart(4, '0');
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return {
    year,
    month,
    day,
    dateKey: `${y}-${m}-${d}`,
    aladhanDate: `${d}-${m}-${y}`,
  };
}

/**
 * Resolves the calendar YYYY-MM-DD and DD-MM-YYYY date in an arbitrary IANA timezone,
 * falling back cleanly to the local clock if the timezone identifier is unsupported.
 */
export function getDatePartsInTimeZone(
  timeZone?: string,
  date: Date = new Date()
): CalendarDateParts {
  if (timeZone) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).formatToParts(date);

      const year = Number(parts.find((p) => p.type === 'year')?.value);
      const month = Number(parts.find((p) => p.type === 'month')?.value);
      const day = Number(parts.find((p) => p.type === 'day')?.value);
      if (Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day)) {
        return buildCalendarDateParts(year, month, day);
      }
    } catch {
      // Fallback to local calendar parts below
    }
  }

  return buildCalendarDateParts(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Adds whole calendar days to a YYYY-MM-DD key independent of browser DST or offset.
 */
export function addDaysToCalendarDate(dateKey: string, days: number): CalendarDateParts {
  const [yStr, mStr, dStr] = dateKey.split('-');
  const utc = new Date(Date.UTC(Number(yStr), Number(mStr) - 1, Number(dStr) + days));
  return buildCalendarDateParts(utc.getUTCFullYear(), utc.getUTCMonth() + 1, utc.getUTCDate());
}

export function getLocalDateKey(date: Date = new Date()): string {
  return buildCalendarDateParts(date.getFullYear(), date.getMonth() + 1, date.getDate()).dateKey;
}

export function formatAladhanDate(date: Date): string {
  return buildCalendarDateParts(date.getFullYear(), date.getMonth() + 1, date.getDate()).aladhanDate;
}

export function formatPrayerClockTime(isoTimestamp: string, timezone?: string): string {
  const parsed = new Date(isoTimestamp);
  if (Number.isNaN(parsed.getTime())) {
    return '--:--';
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone || undefined,
    }).format(parsed);
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(parsed);
  }
}

export async function fetchPrayerSchedule(params: {
  location: LocationSource;
  dateParts: CalendarDateParts;
  methodId: number | null;
  school: AsrSchool;
  signal?: AbortSignal;
}): Promise<DailyPrayerSchedule> {
  const { location, dateParts, methodId, school, signal } = params;
  const dateSegment = dateParts.aladhanDate;
  const query = new URLSearchParams({
    iso8601: 'true',
    school: String(school),
  });

  if (methodId !== null) {
    query.set('method', String(methodId));
  }

  let endpoint = '';
  if (location.type === 'geolocation') {
    query.set('latitude', String(location.latitude));
    query.set('longitude', String(location.longitude));
    endpoint = `${ALADHAN_BASE_URL}/timings/${dateSegment}?${query.toString()}`;
  } else {
    query.set('city', location.city.trim());
    query.set('country', location.country.trim());
    endpoint = `${ALADHAN_BASE_URL}/timingsByCity/${dateSegment}?${query.toString()}`;
  }

  const response = await fetch(endpoint, { signal });
  if (!response.ok) {
    throw new Error(`Unable to fetch prayer times (HTTP ${response.status}).`);
  }

  const payload = (await response.json()) as AlAdhanApiResponse;
  if (payload.code !== 200 || !payload.data?.timings || !payload.data.meta) {
    throw new Error('Prayer times were not available for this location.');
  }

  const { timings, meta } = payload.data;
  const timezone = meta.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC';

  const prayers: PrayerTimingEntry[] = OBLIGATORY_PRAYERS.map((name) => {
    const rawIso = timings[name];
    const timestampMs = rawIso ? Date.parse(rawIso) : Number.NaN;
    if (!rawIso || Number.isNaN(timestampMs)) {
      throw new Error(`Invalid timestamp returned for ${name}.`);
    }

    return {
      name,
      isoTimestamp: rawIso,
      timestampMs,
      formattedTime: formatPrayerClockTime(rawIso, timezone),
    };
  });

  return {
    dateKey: dateParts.dateKey,
    timezone,
    methodId: meta.method?.id ?? methodId ?? 3,
    methodName: meta.method?.name ?? 'Muslim World League',
    school,
    prayers,
  };
}

