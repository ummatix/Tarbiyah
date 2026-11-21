# TARBIYAH — Authentication Design Reference (Phase 1)

**Source Stitch Project:** `Remix of Tarbiyah Islamic Learning Platform`  
**Project Resource Name:** `projects/12834088147830533626`  
**Stitch URL:** https://stitch.google.com/projects/12834088147830533626  
**Phase 1 Scope:** Login & Registration Pages (Desktop, Tablet, Mobile)

---

## 1. Stitch Project & Screen Inventory

### Project Metadata (`get_project`)
* **Title:** `Remix of Tarbiyah Islamic Learning Platform`
* **Visibility:** `PRIVATE` (`OWNER`, `origin: REMIX`)
* **Project Type:** `TEXT_TO_UI_PRO`
* **Design Mode:** `LIGHT` · `roundness: ROUND_EIGHT` · `customColor: #7656e8`
* **Fonts:** Headline: `MANROPE` · Body: `INTER` · Label: `INTER`
* **Total Screens (`list_screens`):** 19 screens (+ 1 `DESIGN_SYSTEM_INSTANCE` asset)

### Phase 1 Target Screen IDs

| Role in Phase 1 | Stitch Screen Title | Screen ID | Resource Name | Device | Frame Size (`W×H`) |
| --- | --- | --- | --- | --- | --- |
| **Desktop Login** *(default)* & **Desktop Registration** *(tab state)* | `01 — Login & Registration (Desktop)` | `598d9539a0b24c689ce8ad7cedb86a96` | `projects/12834088147830533626/screens/598d9539a0b24c689ce8ad7cedb86a96` | `DESKTOP` | `2560 × 2148` |
| **Mobile Login** *(default)* & **Mobile Registration** *(tab state)* | `01 — Login & Registration (Mobile)` | `665ac3c2b5fe4da2915c0e97acc8b04c` | `projects/12834088147830533626/screens/665ac3c2b5fe4da2915c0e97acc8b04c` | `MOBILE` | `780 × 1768` |
| **Duplicate of Desktop Login** | `TARBIYAH - Spiritual Learning & Deen App` | `8c58b614963b4a449fa4dfc45429e4da` | `projects/12834088147830533626/screens/8c58b614963b4a449fa4dfc45429e4da` | `DESKTOP` | `1280 × 1024` |

> **Important Finding:** Both Login and Registration live on the **same Stitch screen** (`01 — Login & Registration`) for each form factor, switched client-side via `switchAuthMode(...)`. Screen `8c58b614963b4a449fa4dfc45429e4da` has HTML byte-for-byte identical (`24,753` chars) to `598d9539a0b24c689ce8ad7cedb86a96` and has no screenshot.

<details>
<summary>All 19 Screens in Stitch Project 12834088147830533626 (for reference)</summary>

| Screen Title | Screen ID | Device | Dimensions |
| --- | --- | --- | --- |
| `01 — Login & Registration (Mobile)` | `665ac3c2b5fe4da2915c0e97acc8b04c` | `MOBILE` | `780 × 1768` |
| `01 — Login & Registration (Desktop)` | `598d9539a0b24c689ce8ad7cedb86a96` | `DESKTOP` | `2560 × 2148` |
| `TARBIYAH - Spiritual Learning & Deen App` | `8c58b614963b4a449fa4dfc45429e4da` | `DESKTOP` | `1280 × 1024` |
| `02 — Personalisation Quiz (Mobile)` | `1bdb2a7455f646dea464cd3be4294923` | `MOBILE` | `780 × 1768` |
| `02 — Personalisation Quiz (Desktop)` | `e07279d41a1b40d7916e33fd3b98ca1f` | `DESKTOP` | `2560 × 2640` |
| `03 — Personalised Learner Profile (Mobile)` | `57ee58b11149431ca6c9950a98437ea7` | `MOBILE` | `780 × 2710` |
| `03 — Personalised Learner Profile (Desktop)` | `7f493fc6d0dc49eabd1b84a9124a6300` | `DESKTOP` | `2560 × 4434` |
| `04 — Main Dashboard (Mobile)` | `5a2439afbb7442fdbd0a9ecfaf4d6157` | `MOBILE` | `780 × 4752` |
| `04 — Main Dashboard (Desktop)` | `0fd9dc9d92d84b29a2077dc80c1305af` | `DESKTOP` | `2560 × 3726` |
| `05 — My Islamic Journey (Mobile)` | `3aa97c0ff74e4aea9b49a68cc3e2f1e2` | `MOBILE` | `780 × 4406` |
| `05 — My Islamic Journey (Desktop)` | `7461b10a511a44b78383481f0976ead1` | `DESKTOP` | `2560 × 9786` |
| `06 — Prayer & Remembrance (Mobile)` | `0b4283a93cf141ec9b112c61d74baf58` | `MOBILE` | `780 × 4108` |
| `06 — Prayer & Remembrance (Desktop)` | `eea7917d099e4d659d46fa85129ffc9c` | `DESKTOP` | `2560 × 6498` |
| `07 — Islamic Calendar & Sacred Days (Mobile)` | `e9615d7b34db437e8deb739bc07fe690` | `MOBILE` | `780 × 4148` |
| `07 — Islamic Calendar & Sacred Days (Desktop)` | `597968779b1b48e99eb5af4ce5c5be96` | `DESKTOP` | `2560 × 4606` |
| `08 — Ask & Learn (Mobile)` | `6b8c1bbab0be40149e55f2400aac3db0` | `MOBILE` | `780 × 4810` |
| `08 — Ask & Learn (Desktop)` | `9ad37bf12ae94a88bf25741719324b70` | `DESKTOP` | `2560 × 5120` |
| `09 — Profile & Settings (Mobile)` | `ca4750ef0aed4986b5133b543dab1f18` | `MOBILE` | `780 × 3912` |
| `09 — Profile & Settings (Desktop)` | `04812a81a5204e8792458d3f3c8ff173` | `DESKTOP` | `2560 × 3268` |

</details>

---

## 2. Design Tokens (`Tarbiyah Learning System`)

### Color Palette (`designTheme.namedColors` & Tailwind Config)

| Token | Hex | Usage in Auth Screens |
| --- | --- | --- |
| `surface` / `background` / `surface-bright` | `#fcf8ff` | Root page background, fixed header (`bg-surface/80 backdrop-blur-xl`) |
| `surface-container-lowest` | `#ffffff` | Main auth card/sheet, Google OAuth button, mobile inputs, trust badge cards |
| `surface-container-low` | `#f6f2ff` | Desktop input backgrounds, mobile Google button, desktop footer, hero arch tint |
| `surface-container` | `#efebff` | Mobile segmented tab track, mobile hero banner top gradient, desktop footnote divider |
| `surface-container-high` | `#eae6f9` | Desktop divider hairline, `+25k` avatar badge, hover fills |
| `surface-container-highest` | `#e4e0f3` | Mobile companion cameo fallback background |
| `surface-variant` | `#e4e0f3` | Mobile separator line |
| `surface-dim` | `#dbd8eb` | Dimmed surface token |
| `primary` | `#5d3ace` | Primary CTA gradient start, links (`Forgot password?`, `Terms`), active text |
| `on-primary` | `#ffffff` | Text & icons on primary buttons/avatars |
| `primary-container` | `#7656e8` | Primary CTA gradient end, mobile active tab pill, focus ring |
| `on-primary-container` | `#faf4ff` | Text inside `primary-container` |
| `primary-fixed` | `#e7deff` | Mobile `"Bismillah & Welcome"` badge background, desktop ambient glow |
| `on-primary-fixed` | `#1e0060` | Text inside `primary-fixed` |
| `secondary` | `#005cbd` | Desktop gradient headline accent (`from-primary to-secondary`), trust avatar `Z` |
| `secondary-fixed` | `#d7e2ff` | Desktop bottom-right ambient blur orb |
| `tertiary` | `#00635d` | `"Self-Rectification & Faith"` eyebrow, mobile verified icon, `"For personalized learning"` hint |
| `tertiary-fixed` | `#70f8ec` | Mobile companion cameo sparkle badge (`auto_awesome`) |
| `on-tertiary-fixed` | `#00201e` | Icon inside `tertiary-fixed` badge |
| `on-surface` / `on-background` | `#1b1a28` | Primary headings, labels, input text |
| `on-surface-variant` | `#484554` | Subtitles, inactive tab labels, footer text, secondary labels |
| `outline` | `#797586` | Mobile input placeholder, desktop divider/legal text |
| `outline-variant` | `#cac4d7` | Desktop input placeholder, mobile inset border (`rgba(202, 196, 215, 0.6)`) |
| `error` / `error-container` | `#ba1a1a` / `#ffdad6` | Validation & error states (`on-error: #ffffff`, `on-error-container: #93000a`) |

* **Desktop Left Panel Custom Gradient:** `bg-gradient-to-b from-[#F5F2FF] to-[#EDE8FE]`

### Typography (`Manrope` & `Inter`)

Google Fonts loaded in HTML:
* `Manrope` (weights `600`, `700`, `800` on mobile; `100..900` on desktop)
* `Inter` (weights `400`, `500`, `600` on mobile; `100..900` on desktop)
* `Material Symbols Outlined` (`opsz 20..48`, `wght 100..700`, `FILL 0..1`)

| Token | Font Family | Size | Line Height | Weight |
| --- | --- | --- | --- | --- |
| `display-lg` | `Manrope` | `48px` | `56px` | `800` |
| `display-lg-mobile` | `Manrope` | `36px` | `44px` | `800` |
| `headline-lg` | `Manrope` | `32px` | `40px` | `700` |
| `headline-lg-mobile` | `Manrope` | `26px` | `34px` | `700` |
| `headline-md` | `Manrope` | `24px` | `32px` | `600` |
| `headline-sm` | `Manrope` | `20px` | `28px` | `600` |
| `title-md` | `Manrope` | `18px` | `24px` | `600` |
| `body-lg` | `Inter` | `16px` | `26px` | `400` |
| `body-md` | `Inter` | `14px` | `22px` | `400` |
| `body-sm` | `Inter` | `12px` | `18px` | `400` |
| `label-lg` | `Inter` | `14px` | `20px` | `600` |
| `label-md` | `Inter` | `12px` | `16px` | `600` |
| `label-sm` | `Inter` | `11px` | `14px` | `500` |

### Spacing & Border Radius Tokens

* **Spacing (`tailwind.config`):** `space-xs: 0.25rem` (`4px`), `space-sm: 0.5rem` (`8px`), `space-md: 1rem` (`16px`), `space-lg: 1.5rem` (`24px`), `space-xl: 2rem` (`32px`), `gutter-mobile: 1rem`, `gutter: 1.5rem`, `margin-mobile: 1.25rem`, `margin: 2rem`.
* **Border Radius (`tailwind.config`):** `DEFAULT: 0.25rem` (`4px`), `lg: 0.5rem` (`8px`), `xl: 0.75rem` (`12px`), `full: 9999px` (plus explicit `rounded-2xl` `16px`, `rounded-3xl` `24px`, `rounded-[2rem]` `32px`, `rounded-t-[14rem]`).

### Shadows & Borders
* **Desktop Header:** `shadow-[0_1px_8px_rgba(41,36,92,0.04)]` with `bg-surface/80 backdrop-blur-xl`
* **Desktop Split Card:** `shadow-2xl` (`rounded-[2rem]`)
* **Desktop Active Tab Pill:** `shadow-[0_2px_10px_rgba(41,36,92,0.08)]`
* **Desktop CTA:** `shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35`
* **Mobile Auth Sheet Card:** `rounded-3xl p-5 shadow-xl`
* **Mobile Input Inset Ring:** `box-shadow: inset 0 0 0 1.5px rgba(202, 196, 215, 0.6);`
* **Mobile CTA Glow:** `box-shadow: 0 8px 24px rgba(118, 86, 232, 0.35);`

---

## 3. Image Assets & Visual Notes

| Asset | Used In | Source URL in Stitch HTML | Implementation Note |
| --- | --- | --- | --- |
| **TARBIYAH Brand Logo** | Desktop header, Desktop left badge, Mobile header | `https://lh3.googleusercontent.com/aida/ALJJyrB2qFcDOemNDNUIe6DiTJGuzSV048M7RvEsRb9bUOsyZuszRY9ePDsqq8rwi5Ntl8rqTPVktJ2J_XQeU3sM5UFAc3t8iK1icOrmyHGTNO2TXLXVqbyAz2kBmgTGfWDnpP8urra1d-gJlw_SPJM92P3pMoAm4e6AieGFICYkZ5LP_HaqwQ8M3ZmCuBZdB6ZPP8i4xvxiIye2XZcw--UUNkGMGnVSdoGK_4lo_GGLoMWc3g` | **Broken in both Stitch screenshots** (renders alt text icon). Replace with a local SVG/PNG brand logo in `src/assets/`. |
| **Desktop Companion Illustration** | Desktop left column (`aspect-[4/3]`, `max-w-[380px]`) | `https://lh3.googleusercontent.com/aida-public/AB6AXuAIlk-pXDZUeS4YtZ_kg2YnwT7EtzVOHHrqSPO-8goKrOziifxsLl3D-_6iG7QhlmZlgRrK-V82RA-9PAc73pqRZkyrdv-xvu6yQqisozMZDpzBdKDGCDxahe4mi25BC5tT4MkTzM8oIhtPtyDkXmhJSgY7Rnpb5aZA8Nd5MYXb8kzV_v0_h1ax-tyDkH2r2cvJL4snGTs2DjeEBM-CXBLZ2vV3c2elHlC72WrrI3Vf` | Contains an embedded UI mockup reading *"Welcome to Anara"* on the right half of the image. Replace or crop to clean Tarbiyah companion art before shipping. |
| **Mobile Companion Cameo** | Mobile hero banner (`80×80px` / `w-20 h-20`) | `https://lh3.googleusercontent.com/aida-public/AB6AXuDIodVwXJx7yNP7x97rQQWjQZxwTeLhE9qC2EF7iAC3FRZ_zKU8XVQNdWK7sp4x3kmPBXNjsudzAlLs57MkPEHE16pZVN6nGj8VXjaJWGtuyF7Ey8K1YrJqxFhf7XSAsggHXYbUons-VSTAy-qFqFhEEev7lEGcfeOor0SZpAp1vp5LJeamEqsT8WvznOMuk47uZFqsjGdM1xmP0CdLovEMEZ3_ytpJP4aBHekaCM3k` | Renders cleanly in mobile screenshot; store locally for reliability. |
| **Google "G" Icon** | Both Desktop & Mobile OAuth buttons | Inline `<svg viewBox="0 0 24 24">` | 4-color official Google G paths (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`). |
| **Islamic Geometry Watermark** | Desktop full-bg & Mobile hero corner | Inline `<svg>` | Desktop: `800×800` concentric circles + rotated squares at `opacity-[0.035]`. Mobile: `100×100` 8-point star + circle at `opacity-20`. |

---

## 4. Login Desktop Specifications (`598d9539a0b24c689ce8ad7cedb86a96`)

* **Canvas / Viewport:** `2560 × 2148` (`web_standard` shell), `min-h-screen flex flex-col justify-between bg-surface`.
* **Top Navigation Bar (`<header>`):**
  * Fixed `top-0 w-full h-16 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(41,36,92,0.04)]`, horizontal padding `px-margin-mobile lg:px-margin`.
  * **Left:** Logo (`h-8 w-auto`) + `"TARBIYAH"` (`font-title-md text-title-md font-bold tracking-tight`).
  * **Right `<nav>` (`gap-space-lg`):**
    * `"Sign In"` (`aria-current="page"`, active pill `bg-surface-container text-primary font-label-md rounded-full`)
    * `"Create Account"` (`font-label-lg text-on-surface-variant`)
    * `"Help"` (`font-label-lg text-on-surface-variant`)
    * Language indicator: `language` icon (`18px`) + `"EN"` (`font-label-sm`)
    * Profile avatar circle: `w-8 h-8 rounded-full bg-primary` with `person` icon (`text-on-primary text-[18px]`).
* **Main Stage (`<main class="w-full flex-1 pt-16 bg-surface">`):**
  * Centered wrapper `min-h-[calc(100vh-4rem)] flex items-center justify-center p-space-md lg:p-space-xl overflow-hidden`.
  * Two ambient blurred background orbs (`bg-primary-fixed/30` top-left, `bg-secondary-fixed/40` bottom-right) + `opacity-[0.035]` geometric SVG watermark.
  * **Split Container:** `max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] overflow-hidden shadow-2xl bg-surface-container-lowest`.
* **Left Column (`lg:col-span-6`, `p-8 sm:p-12 lg:p-14`, `bg-gradient-to-b from-[#F5F2FF] to-[#EDE8FE]`):**
  * Decorative Islamic arch silhouette (`rounded-t-[14rem] border-t-2 border-x-2 border-primary-fixed/60 bg-surface-container-low/70`).
  * **Brand Header:** `44×44px` (`w-11 h-11`) white rounded-xl logo box + `"TARBIYAH"` + green dot (`bg-tertiary`) + `"SELF-RECTIFICATION & FAITH"`.
  * **Headline (`h1`):** `"Your Deen. Your Journey. Your Growth."` (`font-headline-lg`, `"Your Journey."` in gradient `from-primary to-secondary`).
  * **Subtext:** `"Begin your personalised path of Islamic knowledge, daily reflection, and mindful spiritual growth alongside companions who understand you."`
  * **Companion Card:** `max-w-[340px] sm:max-w-[380px] aspect-[4/3] rounded-2xl` image frame with floating frosted bottom caption bar: heart icon (`favorite`, filled) + `"Meet Bari & Ansharah"` + `"Study Guides"`.
  * **Trust Metric Banner:** Avatar stack (`A` primary, `Z` secondary, `M` tertiary, `+25k` `surface-container-high`) + `"Join 25,000+ young Muslims"` / `"Cultivating character and deen at their own pace."`
* **Right Column (`lg:col-span-6`, `p-8 sm:p-12 lg:p-14 bg-surface-container-lowest`, inner `max-w-md mx-auto`):**
  * **Segmented Switcher:** `p-1.5 bg-surface-container-low rounded-full shadow-inner` with `"Log In"` (active white pill, `text-primary font-bold`) and `"Create Account"`.
  * **Heading (`#auth-heading`):** `"Welcome back"` (`font-headline-md font-bold`).
  * **Subheading (`#auth-subheading`):** `"Enter your credentials to continue your growth journey."`
  * **Google OAuth Button:** Full width, `py-3 px-4 rounded-xl bg-surface-container-lowest shadow-sm`, `"Continue with Google"`.
  * **Divider:** `"OR CONTINUE WITH EMAIL"` (`uppercase tracking-wider text-outline font-label-sm`).
  * **Form Fields (Login Mode):**
    * `Email Address` (`#email-input`, `type="email"`, `required`, `alternate_email` icon, placeholder `you@domain.com`, `bg-surface-container-low rounded-xl py-3 pl-11 pr-4`, focus `bg-surface-container-lowest ring-2 ring-primary/40`).
    * `Password` (`#password-input`, `type="password"`, `required`, `lock` icon, placeholder `••••••••••••`, eye visibility toggle `#pwd-toggle-icon`) with `"Forgot Password?"` (`#forgot-password-link`) aligned right on label row.
    * Checkbox (`#remember-checkbox`): `"Remember my device for 30 days"`.
  * **Primary CTA (`#submit-cta-btn`):** `rounded-full py-3.5 px-6 bg-gradient-to-r from-primary to-primary-container text-on-primary font-title-md font-bold`, label `"Sign In to TARBIYAH"` + `arrow_forward`.
  * **Bottom Switch Prompt (`#toggle-prompt`):** `"Don't have an account? Create Account"`.
  * **Legal Note:** `"By continuing, you agree to TARBIYAH's Terms of Service and Privacy Policy."`
* **Footer (`<footer>`):** `bg-surface-container-low py-space-md` — left `"© 2025 TARBIYAH. Cultivating Mind, Character & Faith."`, right links: `"Privacy Policy"`, `"Terms of Service"`, `"Support"`.

---

## 5. Login Mobile Specifications (`665ac3c2b5fe4da2915c0e97acc8b04c`)

* **Canvas / Viewport:** `780 × 1768` (`mobile_blank` shell, designed for mobile width `~390px` at 2x), `min-h-screen flex flex-col bg-surface`.
* **Top Bar (`<header>`):**
  * Fixed `top-0 w-full h-16 z-50 bg-surface/80 backdrop-blur-xl pt-safe px-margin-mobile`.
  * **Left:** Logo (`h-8`) + `"TARBIYAH"`.
  * **Right:** `44×44px` touch-target Help icon button (`help_outline`). *(No profile icon or nav links on mobile.)*
* **Main Content (`<main class="flex-1 flex flex-col px-margin-mobile pt-16 pb-safe bg-surface">`):**
  * **Top Companions Greeting Hero Banner:**
    * `rounded-3xl bg-gradient-to-b from-surface-container to-surface-container-low p-4 mb-4 shadow-sm overflow-hidden` with `opacity-20` geometric SVG in bottom-right.
    * Left `80×80px` (`w-20 h-20 rounded-2xl`) companion cameo with `24×24px` (`w-6 h-6`) `tertiary-fixed` sparkle badge (`auto_awesome`) at `-bottom-1 -right-1`.
    * Right copy: pill badge `"Bismillah & Welcome"` (pulsing primary dot), `h2#greeting-title` `"Welcome back!"`, `p#greeting-subtitle` `"Ready to continue your journey?"`.
  * **Main Authentication Sheet Card:** `rounded-3xl bg-surface-container-lowest p-5 shadow-xl`.
    * **Segmented Switcher:** `bg-surface-container p-1 rounded-2xl` — active `"Log In"` uses `bg-primary-container text-on-primary-container shadow-md rounded-xl`.
    * **Google OAuth Button:** `h-12 rounded-xl bg-surface-container-low hover:bg-surface-container`, `"Continue with Google"`.
    * **Divider:** `"or with email"` (`text-body-sm text-on-surface-variant`).
    * **Form Fields (Login Mode):**
      * `Email Address` (`#input-email`, `h-12 rounded-xl`, `mail` icon, placeholder `name@example.com`, inset border `1.5px rgba(202,196,215,0.6)`).
      * `Password` (`#input-password`, `h-12 rounded-xl`, `lock` icon, placeholder `Enter your password`, `44×44px` visibility toggle button).
      * **Utilities Row (`#row-utilities`):** Left checked `"Remember me"` checkbox + Right `"Forgot password?"` link (`text-primary font-label-md`).
    * **Primary CTA (`#btn-submit`):** `h-[50px] rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline-sm`, `"Continue to TARBIYAH"` + `arrow_forward`.
    * **Bottom Switch Prompt (`#mode-switch-prompt`):** `"New to TARBIYAH? Create an account"`.
  * **Social Proof Note:** `verified` (`text-tertiary`) + `"Over 45,000 students growing in faith & knowledge together."`
* **Footer (`<footer>`):** `mt-auto py-space-lg text-center` — `"By continuing, you agree to the Terms of Service & Privacy Policy"`.

---

## 6. Registration Desktop Specifications (Tab Mode in `598d9539a0b24c689ce8ad7cedb86a96`)

Activated via `switchAuthMode('signup')` when clicking `"Create Account"` tab, bottom `"Create Account"` prompt, or (intended) top nav `"Create Account"` link:

* **Layout & Left Column:** Remains identical to Desktop Login (split 2-column card, companions showcase, `25,000+` trust banner).
* **Segmented Switcher:** `"Create Account"` becomes active white pill (`bg-surface-container-lowest text-primary font-bold shadow-[0_2px_10px_rgba(41,36,92,0.08)]`); `"Log In"` becomes muted (`text-on-surface-variant font-medium`).
* **Heading & Subheading:**
  * `#auth-heading` -> `"Begin your path"`
  * `#auth-subheading` -> `"Create an account to embark on tailored spiritual growth."`
* **Form Field Changes:**
  * **Revealed (`#fullname-field-group`):** `Full Name` (`#fullname-input`, `type="text"`, `badge` icon, placeholder `"e.g. Zaid Haris"`).
  * **Kept:** `Email Address` (`#email-input`), `Password` (`#password-input`).
  * **Hidden:** `#forgot-password-link` (`Forgot Password?`) is hidden.
  * **Revealed (`#confirm-password-group`):** `Confirm Password` (`#confirm-password-input`, `type="password"`, `lock_reset` icon, placeholder `"••••••••••••"`, visibility toggle `#confirm-pwd-toggle-icon`).
  * **Checkbox (`#checkbox-label`):** Changes from `"Remember my device for 30 days"` to `"I agree to receive reflective study insights and reminders"`.
* **Primary CTA (`#cta-btn-text`):** Changes to `"Create Account"` + `arrow_forward`.
* **Bottom Switch Prompt (`#toggle-prompt`):** Changes to `"Already have an account? Log In"`.

---

## 7. Registration Mobile Specifications (Tab Mode in `665ac3c2b5fe4da2915c0e97acc8b04c`)

Activated via `switchAuthMode('register')` when clicking `"Create Account"` tab or bottom `"Create an account"` prompt:

* **Top Hero Banner Changes:**
  * `#greeting-title` -> `"Join TARBIYAH"`
  * `#greeting-subtitle` -> `"Begin your personal path of growth."`
* **Segmented Switcher:** `#tab-register` (`"Create Account"`) receives `bg-primary-container text-on-primary-container shadow-md`; `#tab-login` (`"Log In"`) becomes muted.
* **Form Field Changes:**
  * **Revealed (`#field-fullname`):** `Full Name` with right-aligned teal hint `"For personalized learning"` (`text-tertiary font-label-sm`), `badge` icon, placeholder `"e.g. Zayd Ibrahim"`.
  * **Kept:** `Email Address` (`#input-email`), `Password` (`#input-password`).
  * **Revealed (`#field-confirm-password`):** `Confirm Password` (`#input-confirm-password`, `check_circle` icon, placeholder `"Re-enter your password"`, `44×44px` visibility toggle).
  * **Hidden (`#row-utilities`):** Entire row (`Remember me` + `Forgot password?`) is hidden.
* **Primary CTA (`#btn-submit-label`):** Changes to `"Create Free Account"` + `arrow_forward`.
* **Bottom Switch Prompt (`#mode-switch-prompt`):** Changes to `"Already have an account? Log in here"`.

---

## 8. Shared Components to Build

1. **`AuthHeader`:** Fixed frosted top bar (`h-16 bg-surface/80 backdrop-blur-xl`); shows logo + `TARBIYAH`, right help link on mobile/tablet, and navigation links (`Sign In`, `Create Account`, `Help`, `EN` locale) on desktop.
2. **`AuthModeTabs`:** Segmented 2-option switcher (`Log In` / `Create Account`) adapting between `rounded-xl` primary-filled active pill on mobile and `rounded-full` white elevated active pill on desktop.
3. **`GoogleAuthButton`:** Reusable OAuth button with 4-color inline Google SVG and `"Continue with Google"` label.
4. **`AuthTextField` & `PasswordField`:** Standardized input with leading Material icon, focus ring, and `44×44px` password visibility toggle (`visibility` / `visibility_off`).
5. **`PrimaryGradientButton`:** Electric purple gradient CTA (`from-primary to-primary-container`) with glow shadow and trailing `arrow_forward` icon + loading state.
6. **`CompanionWelcomePanel`:** Desktop split-left showcase (`TARBIYAH` badge, headline, companion illustration, trust metric) vs. Mobile compact greeting card.
7. **`AuthFooter`:** Legal agreement links (`Terms of Service`, `Privacy Policy`, `Support`).

---

## 9. Responsive Layout Differences (Mobile / Tablet / Desktop)

| Aspect | Mobile (`< 640px` / `sm`) | Tablet (`640px – 1023px`, `sm`–`md`) | Desktop (`≥ 1024px`, `lg+`) |
| --- | --- | --- | --- |
| **Page Layout** | Single-column stacked (`px-margin-mobile`), compact hero card above white auth sheet | Centered single-column container (`max-w-md`–`max-w-lg`) with desktop background glows; optional compact hero banner above card | 12-column split card (`max-w-6xl lg:grid-cols-12 rounded-[2rem] shadow-2xl`): 6-col brand story + 6-col auth form |
| **Header** | Logo + `TARBIYAH` + Help icon (`44×44px`) | Logo + `TARBIYAH` + Help icon / compact nav | Logo + `TARBIYAH` + `Sign In`, `Create Account`, `Help`, `EN`, avatar |
| **Tab Switcher Style** | `rounded-2xl` track, active tab `bg-primary-container text-white rounded-xl` | Either style; align consistently across breakpoints | `rounded-full` track, active tab `bg-surface-container-lowest text-primary rounded-full shadow` |
| **Input Styling** | `h-12 bg-white` with `1.5px` inset border (`#cac4d799`) | `h-12` consistent input styling | `py-3 bg-surface-container-low`, turns white + ring on focus |
| **CTA Shape** | `rounded-xl h-[50px]` | `rounded-full` or `rounded-xl` (`48px–50px` height) | `rounded-full py-3.5` |
| **Full Name Hint** | Shows `"For personalized learning"` (`text-tertiary`) | Optional hint | Label only (`"Full Name"`) |
| **Signup Checkbox** | Hidden (`#row-utilities` hidden) | Recommended: explicit consent/newsletter checkbox | Shows `"I agree to receive reflective study insights and reminders"` |
| **Social Proof Copy** | `"Over 45,000 students growing in faith & knowledge together."` | Reconcile to one consistent figure | `"Join 25,000+ young Muslims"` |

---

## 10. Navigation Between Login & Registration (and Gaps to Address)

### In Stitch Prototype
* **Primary Switching:** Segmented tab buttons (`Log In` / `Create Account`) and bottom text-link button (`Create an account` / `Log in here` on mobile; `Create Account` / `Log In` on desktop) run `switchAuthMode(...)` in-place.
* **Desktop Header Nav Links:** `<a data-path="sign-in">` and `<a data-path="register">` are present in the `<header>` (`href="#"`), intended to map directly to Login and Registration views.

### Recommended Phase 1 Routing & Gaps to Resolve
1. **Dedicated Routes + Synchronized Tabs:** Map `/login` (Login view) and `/register` (Registration view) so both direct URLs, header nav links, segmented tabs, and bottom prompts navigate cleanly between the two states without dead `href="#"` links.
2. **Missing Forgot Password Flow:** Both Mobile and Desktop Login screens contain a `Forgot password?` / `Forgot Password?` link (`href="#"`), but **no Forgot Password screen exists in Stitch**. Plan a `/forgot-password` view matching the exact Tarbiyah auth card design when implementing Phase 1 auth.
3. **Copy & Asset Alignment:** Standardize the community count (`25,000+` vs `45,000`), fix the broken `TARBIYAH` logo `<img>` URL, and replace the desktop companion image showing *"Welcome to Anara"*.

