import { useEffect, useState } from 'react';

export const SHOWCASE_SEGMENTS = {
  lead: 'Your Deen. ',
  accent: 'Your Journey.',
  tail: 'Your Growth.',
} as const;

const TOTAL_HEADLINE_CHARS =
  SHOWCASE_SEGMENTS.lead.length + SHOWCASE_SEGMENTS.accent.length + SHOWCASE_SEGMENTS.tail.length;

const PAUSE_AFTER_LEAD_INDEX = SHOWCASE_SEGMENTS.lead.trimEnd().length; // after "Your Deen."
const PAUSE_AFTER_ACCENT_INDEX =
  SHOWCASE_SEGMENTS.lead.length + SHOWCASE_SEGMENTS.accent.length; // after "Your Journey."

const CHAR_INTERVAL_MS = 42;
const PHRASE_PAUSE_MS = 220;
const PARAGRAPH_REVEAL_DELAY_MS = 160;

interface TypewriterSnapshot {
  typedCount: number;
  isHeadlineComplete: boolean;
  isDescriptionVisible: boolean;
  reducedMotion: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Module-scoped controller ensures switching between /login and /register
// continues or preserves completion smoothly instead of restarting from 0.
const listeners = new Set<() => void>();
let timerId: number | null = null;
let started = false;
let state: TypewriterSnapshot = (() => {
  const reduced = prefersReducedMotion();
  return {
    typedCount: reduced ? TOTAL_HEADLINE_CHARS : 0,
    isHeadlineComplete: reduced,
    isDescriptionVisible: reduced,
    reducedMotion: reduced,
  };
})();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

function clearScheduledTick(): void {
  if (timerId !== null) {
    window.clearTimeout(timerId);
    timerId = null;
  }
}

function scheduleNextStep(): void {
  clearScheduledTick();

  if (prefersReducedMotion()) {
    state = {
      typedCount: TOTAL_HEADLINE_CHARS,
      isHeadlineComplete: true,
      isDescriptionVisible: true,
      reducedMotion: true,
    };
    emit();
    return;
  }

  if (state.typedCount < TOTAL_HEADLINE_CHARS) {
    const nextCount = state.typedCount + 1;
    const isPhrasePause =
      nextCount === PAUSE_AFTER_LEAD_INDEX || nextCount === PAUSE_AFTER_ACCENT_INDEX;
    const delay = isPhrasePause ? PHRASE_PAUSE_MS : CHAR_INTERVAL_MS;

    timerId = window.setTimeout(() => {
      const done = nextCount >= TOTAL_HEADLINE_CHARS;
      state = {
        ...state,
        typedCount: nextCount,
        isHeadlineComplete: done,
      };
      emit();
      scheduleNextStep();
    }, delay);
    return;
  }

  if (!state.isDescriptionVisible) {
    timerId = window.setTimeout(() => {
      state = {
        ...state,
        isDescriptionVisible: true,
      };
      emit();
    }, PARAGRAPH_REVEAL_DELAY_MS);
  }
}

function ensureStarted(enabled: boolean): void {
  if (!enabled) return;

  if (prefersReducedMotion()) {
    if (!state.isDescriptionVisible || !state.reducedMotion) {
      state = {
        typedCount: TOTAL_HEADLINE_CHARS,
        isHeadlineComplete: true,
        isDescriptionVisible: true,
        reducedMotion: true,
      };
      emit();
    }
    return;
  }

  if (started) return;
  started = true;
  scheduleNextStep();
}

export function useShowcaseTypewriter(enabled: boolean): TypewriterSnapshot & {
  leadText: string;
  accentText: string;
  tailText: string;
  showLineBreak: boolean;
} {
  const [snapshot, setSnapshot] = useState<TypewriterSnapshot>(() => {
    if (prefersReducedMotion()) {
      return {
        typedCount: TOTAL_HEADLINE_CHARS,
        isHeadlineComplete: true,
        isDescriptionVisible: true,
        reducedMotion: true,
      };
    }
    return state;
  });

  useEffect(() => {
    const sync = () => setSnapshot(state);
    listeners.add(sync);

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotionChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          clearScheduledTick();
          state = {
            typedCount: TOTAL_HEADLINE_CHARS,
            isHeadlineComplete: true,
            isDescriptionVisible: true,
            reducedMotion: true,
          };
          emit();
        }
      };
      mql.addEventListener('change', handleMotionChange);
      ensureStarted(enabled);
      sync();

      return () => {
        listeners.delete(sync);
        mql.removeEventListener('change', handleMotionChange);
      };
    }

    ensureStarted(enabled);
    sync();
    return () => {
      listeners.delete(sync);
    };
  }, [enabled]);

  const count = snapshot.typedCount;
  const leadEnd = SHOWCASE_SEGMENTS.lead.length;
  const accentEnd = leadEnd + SHOWCASE_SEGMENTS.accent.length;

  const leadText = SHOWCASE_SEGMENTS.lead.slice(0, Math.min(count, leadEnd));
  const accentText =
    count > leadEnd
      ? SHOWCASE_SEGMENTS.accent.slice(0, Math.min(count - leadEnd, SHOWCASE_SEGMENTS.accent.length))
      : '';
  const tailText =
    count > accentEnd ? SHOWCASE_SEGMENTS.tail.slice(0, count - accentEnd) : '';

  return {
    ...snapshot,
    leadText,
    accentText,
    tailText,
    showLineBreak: count > accentEnd,
  };
}

