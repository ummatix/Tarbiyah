import type { DailyPrayerSchedule, NextPrayerInfo } from '../types/prayer';

/**
 * Determines the next upcoming obligatory prayer using actual epoch timestamps.
 * Falls back to tomorrow's Fajr when all five prayers for today have passed.
 */
export function resolveNextPrayer(
  todaySchedule: DailyPrayerSchedule,
  tomorrowSchedule: DailyPrayerSchedule | null,
  nowMs: number
): NextPrayerInfo | null {
  for (const prayer of todaySchedule.prayers) {
    if (prayer.timestampMs > nowMs) {
      return {
        prayer,
        isTomorrow: false,
        remainingMs: prayer.timestampMs - nowMs,
      };
    }
  }

  const tomorrowFajr = tomorrowSchedule?.prayers[0];
  if (tomorrowFajr && tomorrowFajr.timestampMs > nowMs) {
    return {
      prayer: tomorrowFajr,
      isTomorrow: true,
      remainingMs: tomorrowFajr.timestampMs - nowMs,
    };
  }

  return null;
}

/**
 * Formats a positive millisecond duration into a calm live countdown string.
 */
export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${String(seconds).padStart(2, '0')}s remaining`;
  }

  if (minutes > 0) {
    return `${minutes}m ${String(seconds).padStart(2, '0')}s remaining`;
  }

  return `${seconds}s remaining`;
}

