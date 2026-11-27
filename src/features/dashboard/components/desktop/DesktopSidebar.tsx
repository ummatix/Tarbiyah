import { type ReactNode } from 'react';
import { Compass, Home, Sparkles, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../theme/ThemeContext';

interface NavItem {
  id: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  to: string;
  implemented: boolean;
}

// Custom Mosque / Dome icon matching the PNG
function MosqueIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke={active ? 'currentColor' : 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v2" />
      <path d="M12 5c-3 1.5-5 4-5 7v7h10v-7c0-3-2-5.5-5-7z" />
      <path d="M4 19h16" />
      <path d="M9 19v-4a3 3 0 0 1 6 0v4" />
      <path d="M4 12v7" />
      <path d="M20 12v7" />
    </svg>
  );
}

// Custom Open Book logo icon matching the PNG
function TarbiyahBookLogo({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-colors duration-200 ${
        isDark
          ? 'bg-gradient-to-br from-[#EACB83] to-[#B59449] text-[#17130A] shadow-[0_6px_16px_rgba(234,203,131,0.25)]'
          : 'bg-gradient-to-br from-[#7656E8] to-[#5E3BD8] text-white shadow-[0_6px_16px_rgba(118,86,232,0.32)]'
      }`}
    >
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
        <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
      </svg>
    </div>
  );
}

export function DesktopSidebar() {
  const location = useLocation();
  const { isDark } = useTheme();

  const NAV_ITEMS: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active) => (
        <Home
          className={`h-5 w-5 shrink-0 ${
            active
              ? isDark
                ? 'text-[#17130A]'
                : 'text-white'
              : 'text-[#4A4678] dark:text-on-surface-variant'
          }`}
        />
      ),
      to: '/app',
      implemented: true,
    },
    {
      id: 'journey',
      label: 'My Journey',
      icon: (active) => (
        <Compass
          className={`h-5 w-5 shrink-0 ${
            active
              ? isDark
                ? 'text-[#17130A]'
                : 'text-white'
              : 'text-[#4A4678] dark:text-on-surface-variant'
          }`}
        />
      ),
      to: '/app#journey',
      implemented: false,
    },
    {
      id: 'prayer',
      label: 'Prayer & Remembrance',
      icon: (active) => <MosqueIcon active={active} />,
      to: '/app#prayer',
      implemented: false,
    },
    {
      id: 'ask',
      label: 'Ask & Learn',
      icon: (active) => (
        <Sparkles
          className={`h-5 w-5 shrink-0 ${
            active
              ? isDark
                ? 'text-[#17130A]'
                : 'text-white'
              : 'text-[#4A4678] dark:text-on-surface-variant'
          }`}
        />
      ),
      to: '/app#ask',
      implemented: false,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (active) => (
        <User
          className={`h-5 w-5 shrink-0 ${
            active
              ? isDark
                ? 'text-[#17130A]'
                : 'text-white'
              : 'text-[#4A4678] dark:text-on-surface-variant'
          }`}
        />
      ),
      to: '/app#profile',
      implemented: false,
    },
  ];

  return (
    <aside
      aria-label="Desktop navigation"
      className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-[#ECE8FB] bg-white px-5 py-7 transition-colors duration-200 dark:border-outline-variant/60 dark:bg-surface-container-low"
    >
      <div>
        {/* Brand Header */}
        <div className="mb-9 flex items-center gap-3 px-1">
          <TarbiyahBookLogo isDark={isDark} />
          <div className="flex flex-col">
            <span className="font-heading text-[20px] font-extrabold tracking-tight text-[#29245C] dark:text-on-surface">
              TARBIYAH
            </span>
            <span className="text-[10px] font-bold tracking-[0.16em] text-[#7656E8] dark:text-primary">
              ELEVATE &amp; RECTIFY
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav aria-label="Main menu" className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === 'home' && location.pathname === '/app';

            if (isActive) {
              return (
                <Link
                  aria-current="page"
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 font-heading text-[15px] font-semibold transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-[#EACB83] to-[#D7B463] text-[#17130A] shadow-[0_8px_20px_rgba(234,203,131,0.22)]'
                      : 'bg-[#7656E8] text-white shadow-[0_8px_20px_rgba(118,86,232,0.30)]'
                  }`}
                  key={item.id}
                  style={
                    !isDark
                      ? {
                          background: 'linear-gradient(135deg, #7656E8 0%, #6845E4 100%)',
                        }
                      : undefined
                  }
                  to={item.to}
                >
                  {item.icon(true)}
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3 text-left font-heading text-[15px] font-medium text-[#4A4678] transition-colors hover:bg-[#F5F2FF] hover:text-[#29245C] dark:text-on-surface-variant dark:hover:bg-surface-container dark:hover:text-on-surface"
                key={item.id}
                type="button"
              >
                <span className="transition-transform group-hover:scale-105">
                  {item.icon(false)}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Daily Taqwa status indicator */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#ECE8FB] bg-[#F5F2FF] px-4 py-3.5 transition-colors duration-200 dark:border-outline-variant/60 dark:bg-surface-container-lowest">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-[#35C9BE] shadow-[0_0_8px_rgba(53,201,190,0.6)]"
            />
            <span className="font-heading text-[13px] font-semibold text-[#29245C] dark:text-on-surface">
              Daily Taqwa
            </span>
          </div>
          <span className="rounded-full bg-white px-3 py-1 font-heading text-[11px] font-bold text-[#7656E8] shadow-sm dark:bg-surface-container-high dark:text-primary">
            On Track
          </span>
        </div>
      </div>
    </aside>
  );
}
