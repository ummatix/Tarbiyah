export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export type AsrSchool = 0 | 1;

export type LocationSource =
  | {
      type: 'geolocation';
      latitude: number;
      longitude: number;
    }
  | {
      type: 'city';
      city: string;
      country: string;
    };

export interface PrayerMethodOption {
  id: number;
  name: string;
}

export interface PrayerTimingEntry {
  name: PrayerName;
  isoTimestamp: string;
  timestampMs: number;
  formattedTime: string;
}

export interface DailyPrayerSchedule {
  dateKey: string;
  timezone: string;
  methodId: number;
  methodName: string;
  school: AsrSchool;
  prayers: PrayerTimingEntry[];
}

export interface NextPrayerInfo {
  prayer: PrayerTimingEntry;
  isTomorrow: boolean;
  remainingMs: number;
}

