# TARBIYAH — Islamic Learning & Personal Growth Platform

Frontend web application for the **Tarbiyah Islamic Learning & Personal Growth Platform**, built with React, TypeScript, Vite, Tailwind CSS, React Router, and Supabase Authentication.

UI and UX specifications are documented in [AUTH_DESIGN_REFERENCE.md](./AUTH_DESIGN_REFERENCE.md) and [ONBOARDING_DESIGN_REFERENCE.md](./ONBOARDING_DESIGN_REFERENCE.md).

---

## Current Features

- **Authentication UI (`/login`, `/register`):** Responsive desktop split layout and mobile-first forms with Tarbiyah design tokens and local companion artwork (`Abdul Bari & Ansharah`).
- **Email Authentication (Supabase Auth):** Email/password registration (collecting full name in user metadata and handling email verification), login, persistent session management, expiry notices, and logout.
- **Google OAuth:** Sign-in with Google routed through Supabase Auth (`redirectTo: /app`) and shared post-authentication routing.
- **Password Recovery (`/forgot-password`, `/reset-password`):** Reset email delivery, recovery session detection, password strength/confirmation validation, and expired/invalid link handling.
- **Personalisation Onboarding (`/onboarding`, `/onboarding/profile`):**
  - 5-step Personalisation Quiz with required Step 1 personal foundations, skippable Steps 2–4, Step 5 starting point selection, and preserved quiz state while navigating steps.
  - Neutral Personalised Learner Profile displaying user-selected preferences alongside a static `Noor-ul-Bidayah` pathway preview and Suggested Lesson 1 (`Pure Intention (Niyyah)`).
- **Protected Routing & Onboarding Gate:** Central post-authentication destination resolver routing un-onboarded users (email signup, email login, and Google OAuth) to `/onboarding`, persisting completion locally via `localStorage` (`tarbiyah_onboarding_completed`), and allowing completed users onto `/app`.

---

## Technology Stack

- **Framework:** React 19 + TypeScript 5.8 (strict mode)
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Routing:** React Router 7
- **Backend Auth SDK:** Supabase JS (`@supabase/supabase-js`)
- **Icons:** Lucide React

---

## Installation

1. Clone the repository and enter the project directory:

```bash
git clone <your-repository-url>
cd Tarbiya
```

2. Install dependencies:

```bash
npm install
```

---

## Environment Variable Setup

Create a `.env.local` file in the project root by copying `.env.example`:

```bash
cp .env.example .env.local
```

Configure the public Supabase client variables in `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

> **Security Note:** Never commit `.env.local`, service-role keys, or OAuth client secrets to version control. `.env`, `.env.local`, `.env.*.local`, and `.env.*` (except `.env.example`) are excluded in `.gitignore`.

---

## Development Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run typecheck` | Run TypeScript type checks (`tsc --noEmit`) |
| `npm run build` | Run full TypeScript project build (`tsc -b`) and generate production assets in `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Current Development Status

- **Completed Milestones (F1 – F5.1):**
  - Foundation, Tailwind Tarbiyah design system, and responsive Auth UI
  - Supabase client configuration & live Auth endpoint connectivity verification
  - Real Supabase Email Authentication, Password Recovery, and Google OAuth integration
  - 5-step Onboarding Quiz & Personalised Learner Profile frontend
  - Authentication-to-onboarding flow connection using temporary `localStorage` completion tracking
- **Planned Next Steps:**
  - Finalized Supabase database schema, migrations, and persistent learner profile storage
  - Full `/app` learning dashboard modules and personalized curriculum progression
