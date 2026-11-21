import type { DailyAyat } from '../types/ayat';

const ALQURAN_BASE_URL = 'https://api.alquran.cloud/v1';
export const ARABIC_EDITION = 'quran-uthmani';
export const TRANSLATION_EDITION = 'en.sahih';
const CACHE_STORAGE_KEY = 'tarbiyah_daily_ayat_v1';

/**
 * Curated Quranic verse coordinates (surah:ayah) fetched verbatim from AlQuran Cloud.
 * No Arabic or translation text is stored or generated locally.
 */
const DAILY_AYAH_REFERENCES = [
  '94:5',
  '2:152',
  '13:28',
  '2:186',
  '39:53',
  '3:139',
  '14:7',
  '29:69',
  '16:97',
  '2:286',
  '65:3',
  '20:114',
  '31:17',
  '49:13',
  '55:60',
  '93:5',
  '25:74',
  '41:34',
  '6:162',
  '16:90',
  '17:80',
  '59:18',
  '8:2',
  '3:159',
  '33:41',
  '40:60',
  '42:40',
  '49:10',
  '24:35',
  '103:3',
] as const;

interface AlQuranEditionData {
  text?: string;
  numberInSurah?: number;
  edition?: {
    identifier?: string;
    englishName?: string;
    name?: string;
  };
  surah?: {
    number?: number;
    englishName?: string;
    name?: string;
  };
}

interface AlQuranMultiEditionResponse {
  code?: number;
  status?: string;
  data?: AlQuranEditionData[];
}

export function getLocalCalendarDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministically maps a local YYYY-MM-DD key to a verse reference so consecutive
 * calendar days select distinct verses while remaining stable within the same day.
 */
export function selectDailyAyahReference(dateKey: string): string {
  const [yearStr, monthStr, dayStr] = dateKey.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return DAILY_AYAH_REFERENCES[0];
  }

  const utcDayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  const index =
    ((utcDayNumber % DAILY_AYAH_REFERENCES.length) + DAILY_AYAH_REFERENCES.length) %
    DAILY_AYAH_REFERENCES.length;
  return DAILY_AYAH_REFERENCES[index] ?? DAILY_AYAH_REFERENCES[0];
}

export function readCachedDailyAyat(dateKey: string): DailyAyat | null {
  try {
    const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DailyAyat>;
    const expectedRef = selectDailyAyahReference(dateKey);

    if (
      parsed.dateKey !== dateKey ||
      parsed.reference !== expectedRef ||
      !parsed.arabicText ||
      !parsed.englishText ||
      !parsed.surahName ||
      !parsed.translationSource
    ) {
      return null;
    }

    return parsed as DailyAyat;
  } catch {
    return null;
  }
}

export function writeCachedDailyAyat(ayat: DailyAyat): void {
  try {
    window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(ayat));
  } catch {
    // Ignore storage failures in restricted browser sessions
  }
}

export async function fetchDailyAyat(
  dateKey: string,
  signal?: AbortSignal
): Promise<DailyAyat> {
  const cached = readCachedDailyAyat(dateKey);
  if (cached) {
    return cached;
  }

  const targetRef = selectDailyAyahReference(dateKey);
  const url = `${ALQURAN_BASE_URL}/ayah/${targetRef}/editions/${ARABIC_EDITION},${TRANSLATION_EDITION}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Unable to fetch today's verse (HTTP ${response.status}).`);
  }

  const payload = (await response.json()) as AlQuranMultiEditionResponse;
  if (payload.code !== 200 || !Array.isArray(payload.data) || payload.data.length < 2) {
    throw new Error("Today's verse data is currently unavailable.");
  }

  const arabicItem = payload.data.find((d) => d.edition?.identifier === ARABIC_EDITION);
  const translationItem = payload.data.find((d) => d.edition?.identifier === TRANSLATION_EDITION);

  if (
    !arabicItem?.text ||
    !translationItem?.text ||
    !arabicItem.surah?.number ||
    !translationItem.surah?.number ||
    !arabicItem.numberInSurah ||
    !translationItem.numberInSurah
  ) {
    throw new Error('Incomplete verse payload returned from Quran API.');
  }

  // Ensure the Arabic verse and English translation strictly match the requested Surah and Ayah
  const [expectedSurah, expectedAyah] = targetRef.split(':').map(Number);
  if (
    arabicItem.surah.number !== expectedSurah ||
    arabicItem.numberInSurah !== expectedAyah ||
    arabicItem.surah.number !== translationItem.surah.number ||
    arabicItem.numberInSurah !== translationItem.numberInSurah
  ) {
    throw new Error('Verse reference mismatch between Arabic and English editions.');
  }

  const ayat: DailyAyat = {
    arabicText: arabicItem.text,
    englishText: translationItem.text,
    surahName: translationItem.surah.englishName ?? arabicItem.surah.englishName ?? 'Surah',
    surahNumber: translationItem.surah.number,
    ayahNumberInSurah: translationItem.numberInSurah,
    reference: `${translationItem.surah.number}:${translationItem.numberInSurah}`,
    translationSource: translationItem.edition?.englishName ?? 'Saheeh International',
    dateKey,
  };

  writeCachedDailyAyat(ayat);
  return ayat;
}

