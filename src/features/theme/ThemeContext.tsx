import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const THEME_STORAGE_KEY = 'tarbiyah_theme';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeMode {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function persistTheme(theme: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore storage write failures in restricted environments
  }
}

function applyThemeToDocument(theme: ThemeMode): void {
  const root = document.documentElement;
  const isDark = theme === 'dark';

  root.classList.toggle('dark', isDark);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.style.backgroundColor = isDark ? '#0D101A' : '#FCF8FF';

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', isDark ? '#0D101A' : '#FCF8FF');
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => readStoredTheme());

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null) {
        setThemeState('light');
        return;
      }
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }
      setThemeState(event.newValue === 'dark' ? 'dark' : 'light');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    persistTheme(nextTheme);
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }
  return ctx;
}

