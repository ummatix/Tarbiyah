# TARBIYAH — Personalisation Onboarding Design Reference (Milestone F5)

**Source Stitch Project:** `Remix of Tarbiyah Islamic Learning Platform`  
**Project Resource Name:** `projects/12834088147830533626`  
**Stitch URL:** https://stitch.google.com/projects/12834088147830533626  
**Scope:** Design Inspection, Documentation, and Frontend Implementation Plan (No code or database changes yet)

---

## 1. Stitch Screen Inventory & Onboarding Sequence

### All 19 Screens in Project `12834088147830533626`
1. `01 — Login & Registration (Desktop)` (`598d9539a0b24c689ce8ad7cedb86a96`, `2560×2148`)
2. `01 — Login & Registration (Mobile)` (`665ac3c2b5fe4da2915c0e97acc8b04c`, `780×1768`)
3. `TARBIYAH - Spiritual Learning & Deen App` (`8c58b614963b4a449fa4dfc45429e4da`, `1280×1024`)
4. **`02 — Personalisation Quiz (Desktop)`** (`e07279d41a1b40d7916e33fd3b98ca1f`, `2560×2640`)
5. **`02 — Personalisation Quiz (Mobile)`** (`1bdb2a7455f646dea464cd3be4294923`, `780×1768`)
6. **`03 — Personalised Learner Profile (Desktop)`** (`7f493fc6d0dc49eabd1b84a9124a6300`, `2560×4434`)
7. **`03 — Personalised Learner Profile (Mobile)`** (`57ee58b11149431ca6c9950a98437ea7`, `780×2710`)
8. `04 — Main Dashboard (Desktop)` (`0fd9dc9d92d84b29a2077dc80c1305af`, `2560×3726`)
9. `04 — Main Dashboard (Mobile)` (`5a2439afbb7442fdbd0a9ecfaf4d6157`, `780×4752`)
10. `05 — My Islamic Journey (Desktop)` (`7461b10a511a44b78383481f0976ead1`, `2560×9786`)
11. `05 — My Islamic Journey (Mobile)` (`3aa97c0ff74e4aea9b49a68cc3e2f1e2`, `780×4406`)
12. `06 — Prayer & Remembrance (Desktop)` (`eea7917d099e4d659d46fa85129ffc9c`, `2560×6498`)
13. `06 — Prayer & Remembrance (Mobile)` (`0b4283a93cf141ec9b112c61d74baf58`, `780×4108`)
14. `07 — Islamic Calendar & Sacred Days (Desktop)` (`597968779b1b48e99eb5af4ce5c5be96`, `2560×4606`)
15. `07 — Islamic Calendar & Sacred Days (Mobile)` (`e9615d7b34db437e8deb739bc07fe690`, `780×4148`)
16. `08 — Ask & Learn (Desktop)` (`9ad37bf12ae94a88bf25741719324b70`, `2560×5120`)
17. `08 — Ask & Learn (Mobile)` (`6b8c1bbab0be40149e55f2400aac3db0`, `780×4810`)
18. `09 — Profile & Settings (Desktop)` (`04812a81a5204e8792458d3f3c8ff173`, `2560×3268`)
19. `09 — Profile & Settings (Mobile)` (`ca4750ef0aed4986b5133b543dab1f18`, `780×3912`)

### Onboarding Screens & Sequence

| Order | Screen Title | Screen ID | Device | Dimensions (`W×H`) | Purpose |
| --- | --- | --- | --- | --- | --- |
| **1a** | `02 — Personalisation Quiz (Desktop)` | `e07279d41a1b40d7916e33fd3b98ca1f` | `DESKTOP` | `2560 × 2640` | 5-step single-page multi-step quiz (`#step-panel-1`..`5`) |
| **1b** | `02 — Personalisation Quiz (Mobile)` | `1bdb2a7455f646dea464cd3be4294923` | `MOBILE` | `780 × 1768` | 5-step single-page multi-step quiz (`#step-pane-1`..`5`) |
| **2a** | `03 — Personalised Learner Profile (Desktop)` | `7f493fc6d0dc49eabd1b84a9124a6300` | `DESKTOP` | `2560 × 4434` | Final onboarding completion & blueprint summary |
| **2b** | `03 — Personalised Learner Profile (Mobile)` | `57ee58b11149431ca6c9950a98437ea7` | `MOBILE` | `780 × 2710` | Final onboarding completion & roadmap summary |

> **Sequence Flow:** Post-Auth (`/register` or first-time `/login`) -> **Onboarding Quiz (Steps 1–5)** -> **Personalised Learner Profile (`03`)** -> **Main Dashboard (`04`)** (or Lesson 1 entry). *(Note: `09 — Profile & Settings` also contains a "Retake Personalisation Quiz" entry point for later milestones.)*

---

## 2. Exact Questions, Options, Input Types & Requirements (`02 — Personalisation Quiz`)

There are **5 sequential steps** and **8 total questions**. There is **no conditional branching** in the Stitch designs (`Step 1 -> Step 2 -> Step 3 -> Step 4 -> Step 5`).

### Step 1 of 5 — Personal Details / Personal Foundations (`20%`)
* **Mobile Heading:** `Tell us about yourself` — *"This helps us personalise your learning pace, reflection times, and greetings."*
* **Desktop Heading:** `Personal Foundations` — *"We use this to tailor your greetings and connect you with peers in your region."*
* **Desktop Stepper Tab Label:** `Details`

#### Q1. Preferred Name
* **Desktop Label:** `What should we call you? *` (Helper: `"Your chosen preferred name across the community."`, Placeholder: `"e.g. Maryam or Brother Bilal"`, Default value in HTML: `"Zayd"`)
* **Mobile Label:** `What should we call you?` (Placeholder: `"e.g. Tariq or Fatima"`, empty by default)
* **Input Type:** Text input (`type="text"`, leading `badge` icon)
* **Required/Optional:** Marked `*` on Desktop; unmarked on Mobile; no JS validation enforces it in Stitch.

#### Q2. Age Group
* **Desktop Label:** `Age group *` (Right hint: `"Curates age-relevant discussions"`)
* **Mobile Label:** `Age Group`
* **Input Type:** Single-select radio chip group (`role="radiogroup"` on Mobile, `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` on Desktop)
* **Exact Answer Options:**
  1. `Under 18` (`data-val="under-18"`)
  2. `18–20` (`data-val="18-20"`)
  3. `21–25` (`data-val="21-25"`) — **Default selected** in both Mobile and Desktop
  4. `26–30` (`data-val="26-30"`)
  5. `Above 30` (`data-val="above-30"`)
  6. `Prefer not to say` (`data-val="prefer-not"`)
* **Required/Optional:** Marked `*` on Desktop; unmarked on Mobile.

#### Q3. Country of Residence
* **Desktop Label:** `Country of residence *` (Helper: `"Calibrates local prayer-aligned module reminders."`)
* **Mobile Label:** `Country of Residence`
* **Input Type:** Dropdown (`<select>`, leading `public` icon, trailing `expand_more`)
* **Exact Answer Options (Discrepancy between Mobile & Desktop):**
  * **Mobile (8 options):** `United States` (`US`), `United Kingdom` (`GB`, **default selected**), `Canada` (`CA`), `Australia` (`AU`), `Pakistan` (`PK`), `India` (`IN`), `Malaysia` (`MY`), `Other / Worldwide` (`OTHER`).
  * **Desktop (8 options):** `United Kingdom` (`UK`, **default selected**), `United States` (`US`), `Canada` (`CA`), `Pakistan` (`PK`), `Malaysia` (`MY`), `Saudi Arabia` (`SA`), `United Arab Emirates` (`AE`), `Other Global Regions` (`OTHER`).
* **Required/Optional:** Marked `*` on Desktop; unmarked on Mobile.

#### Q4. Preferred Learning Language
* **Desktop Label:** `Preferred learning language *`
* **Mobile Label:** `Preferred Language`
* **Input Type:** Single-select radio pills (Mobile `flex-wrap`) / Single-select cards (Desktop `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`)
* **Exact Answer Options:**
  * **Mobile:** `English` (**default selected**), `Urdu`, `Hindi`, `Arabic`, `Other`
  * **Desktop:**
    1. `English` — Subtitle: `Default Curriculum` (**default selected**)
    2. `اردو` — Subtitle: `Urdu Translations`
    3. `العربية` — Subtitle: `Arabic Immersion`
    4. `हिन्दी` — Subtitle: `Hindi Transliteration`
    5. `Other` — Subtitle: `Bilingual glossaries`
* **Required/Optional:** Marked `*` on Desktop; unmarked on Mobile.

---

### Step 2 of 5 — Islamic Background (`40%`)
* **Mobile Heading:** `Your spiritual starting context` — *"Everyone is welcome here. Where do you find yourself today?"*
* **Desktop Heading:** `Where are you on your journey?` — *"There is no judgment here. Every heart has its own starting station in the eyes of Allah."*
* **Desktop Stepper Tab Label:** `Background`
* **Input Type:** Single-select radio card list
* **Required/Optional:** No `*` marker; optional/skippable via `Skip` / `Skip for now`.
* **Exact Answer Options:**
  1. **Option 1 (`not-muslim`, icon: `explore`):**
     * *Mobile:* `Curious about Islam` — `"I'm not Muslim but sincerely interested in discovering Islam's core tenets and ethics."`
     * *Desktop:* `I'm not Muslim, but genuinely curious about Islam` — `"Explore foundational concepts, philosophy, and history without assumptions or prior jargon."`
  2. **Option 2 (`revert`, icon: `spa` [Mobile] / `waving_hand` [Desktop]):**
     * *Mobile:* `New Muslim / Revert` — `"I recently embraced Islam and want gentle, foundational, step-by-step guidance."`
     * *Desktop:* `I'm a new Muslim / Revert` — `"Step-by-step guidance on prayers, practical lifestyle transition, and loving sisterhood/brotherhood."`
  3. **Option 3 (`reconnecting`, icon: `restart_alt` [Mobile] / `menu_book` [Desktop]):**
     * *Mobile:* `Muslim Reconnecting` — `"I grew up Muslim and desire to re-anchor my faith with understanding and intentionality."`
     * *Desktop (**default selected**):* `I'm a Muslim wanting to renew and understand my Deen` — `"Bridge the gap between cultural habits and profound spiritual understanding of why we practice."`
  4. **Option 4 (`practising`, icon: `menu_book` [Mobile] / `psychology_alt` [Desktop]):**
     * *Mobile:* `Seeking Deeper Scholarship` — `"I am actively practising and want deeper thematic Quranic and Hadith immersion."`
     * *Desktop:* `I'm a practising Muslim seeking structured, deeper scholarship` — `"Advanced Fiqh reasoning, Quranic linguistics, and Tazkiyah (purification of the soul)."`

---

### Step 3 of 5 — Learning Goals (`60%`)
* **Mobile Heading:** `Select your growth goals` — *"Pick everything that resonates with your heart right now (multi-select)."*
* **Desktop Heading:** `What areas would you like to enrich?` — *"We will organize these into bite-sized daily modules suited to your priorities."* + badge `Select all that apply`
* **Desktop Stepper Tab Label:** `Goals`
* **Input Type:** Multi-select toggle cards/pills (`grid-cols-1` Mobile, `grid-cols-1 sm:grid-cols-2` Desktop)
* **Required/Optional:** No `*` marker; skippable.
* **Exact Answer Options (8 items):**
  1. `Foundations of Islam` *(Desktop subtitle: `Core creed & principles`)* — **Default selected** (Mobile & Desktop)
  2. `Five Pillars` *(Desktop subtitle: `The core obligations explained`)* — **Default selected on Mobile**
  3. `Iman & Islamic Beliefs` *(Desktop subtitle: `Angels, Destiny, & Hereafter`)* — **Default selected on Desktop**
  4. `Salah Mastery & Khushu` *(Desktop subtitle: `Deep presence in daily prayer`)* — **Default selected** (Mobile & Desktop)
  5. `Qur'an Journey` *(Desktop subtitle: `Recitation & Surah Tafseer`)*
  6. `Dhikr & Daily Duas` *(Mobile)* / `Dhikr & Duas for Daily Life` *(Desktop subtitle: `Morning, evening & protection`)*
  7. `Prophets & History` *(Mobile)* / `Prophets & Seerah History` *(Desktop subtitle: `Stories of resilience and mercy`)*
  8. `Spiritual Consistency` *(Mobile)* / `Consistency in Deen` *(Desktop subtitle: `Beating spiritual burnout`)* — **Default selected on Desktop**

---

### Step 4 of 5 — Daily Learning Commitment (`80%`)
* **Mobile Heading:** `Daily commitment pace` — *"Small, sustainable deeds are most beloved. How much time fits your schedule?"*
* **Desktop Heading:** `Daily Learning Commitment` — *“The most beloved deed to Allah is the most regular and constant, even if it were little.” (Sahih Bukhari)*
* **Desktop Stepper Tab Label:** `Rhythm`
* **Input Type:** Single-select radio cards (`flex-col` Mobile, `grid-cols-1 md:grid-cols-3` Desktop)
* **Required/Optional:** No `*` marker; skippable.
* **Exact Answer Options (3 items):**
  1. **1–2 Hours (`1-2`) — Default selected (Mobile & Desktop):**
     * *Mobile:* `1–2 Hours / day` (`Recommended` badge) — `"Gentle pacing ideal for deep reflection without burnout."` + chips `High Barakah`, `Easy Consistency`.
     * *Desktop:* `1–2 Hours` (`RECOMMENDED FOR BARAKAH`) — `"Ideal for university students and young professionals. Short 15-minute intervals between obligations ensure sustainable habit loops without overload."` + footer `Pacing: Gentle`.
  2. **2–3 Hours (`2-3`):**
     * *Mobile:* `2–3 Hours / day` — `"Accelerated track covering Tafseer, Arabic roots, and Seerah."` + chip `Intensive Growth`.
     * *Desktop:* `2–3 Hours` (`DEDICATED GROWTH`) — `"Balanced between daily lecture watching, active Quran memorization (Hifdh revision), and reflection journaling with community review."` + footer `Pacing: Steady`.
  3. **3–4 Hours (`3-4`):**
     * *Mobile:* `3–4 Hours / day` (`Immersion` badge) — `"Deep scholastic study with comprehensive notes and daily memorisation."` + chip `Student of Knowledge`.
     * *Desktop:* `3–4 Hours` (`INTENSIVE IMMERSION`) — `"Suited for gap year learners, summer retreats, or seminary prep. Deep dives into classical commentaries, Hadith science, and Arabic grammar."` + footer `Pacing: Accelerated`.

---

### Step 5 of 5 — Learning Starting Point (`100%`)
* **Mobile Heading:** `Choose your first module` — *"Where would you feel most inspired to begin your journey?"*
* **Desktop Heading:** `Choose Your Initial Milestone` — *"Which core track would you like Abdul Bari & Ansharah to unlock for you first?"*
* **Desktop Stepper Tab Label:** `Starting Point`
* **Input Type:** Single-select radio cards
* **Required/Optional:** No `*` marker; final step before completion (`Skip` button does not advance past Step 5 in Stitch JS).
* **Exact Answer Options (5 items):**
  1. **`basics` — Default selected (Mobile & Desktop):**
     * *Mobile:* `Islamic Foundations` — `"Belief, purpose, and universal ethics"`
     * *Desktop:* `Start with the absolute basics of Islam` — `"Clear explanations of what Islam is, why it matters, and who the Prophet Muhammad (ﷺ) is."`
  2. **`allah-iman`:**
     * *Mobile:* `Allah & Iman` — `"The 99 Names, Tawhid & heart peace"`
     * *Desktop:* `Understand Allah, Iman and Islamic beliefs` — `"Explore the 99 Names, divine destiny (Qadr), and internalizing conviction against doubts."`
  3. **`salah-meaning`:**
     * *Mobile:* `Salah & Its Meaning` — `"Unlock conversational presence in prayer"`
     * *Desktop:* `Learn Salah and its meaning` — `"Move past rote recitations: word-by-word translation, spiritual posture, and purification rituals."`
  4. **`quran`:**
     * *Mobile:* `Qur'an & Tafseer Intro` — `"Key short Surahs with context and wisdom"`
     * *Desktop:* `Start learning the Qur'an` — `"From Arabic alphabet & Tajweed rules to thematic understanding of the final Juz (30th)."`
  5. **`explore`:**
     * *Mobile:* `Explore All Topics Freely` — `"Browse full curriculum at your own rhythm"`
     * *Desktop:* `Explore different Islamic topics dynamically` — `"A curated mosaic of ethics, finance, psychology, and prophetic stories for free-flowing exploration."`

---

## 3. Final Onboarding Completion Screen (`03 — Personalised Learner Profile`)

* **Mobile (`57ee58b11149431ca6c9950a98437ea7`):**
  * Header: `close` (`X`), `TARBIYAH LEARN`, `help`, `person` avatar.
  * Status pill: `✨ Alhumdulillah • Profile Ready`
  * Companion Vignette Card: Circular companion avatar + heart badge, `"Assalamu Alaikum, Zayd!"`, `"We’ve prepared your personalised, guilt-free learning path. Let’s grow together!"`, Learner Category Ribbon: `FOUNDATION BUILDER` (`Tier 1`) — *"Building rock-solid spiritual foundations with clarity, deep understanding, and sustainable daily consistency."*
  * `Your Preferences` recap card (`Edit` button with `tune` icon): 3-column grid (`Commitment: 1–2 hrs/day`, `Focus: Salah & Deen`, `Language: Eng + Ar`).
  * `Recommended Pathway` (`3 Milestones` badge): `Path 1: Foundations of Deen & Salah Khushu` with 3-node timeline (`1. Bismillah & Pure Intention [12 min, CURRENT START]`, `2. The Pillars of Heartfelt Salah [18 min, STEP 2, locked]`, `3. Daily Adhkar for Calm & Clarity [15 min, STEP 3, locked]`).
  * `Suggested Start` card (`Audio + Reflection`): `Pure Intention (Niyyah)` hosted by `Abdul Bari & Ansharah` with `Start Lesson Now` button.
  * Fixed bottom dock: `Continue to Dashboard` primary pill CTA, `Save and Explore Later` ghost button, and `"100% at your own pace. Never any shame or judgment."`
* **Desktop (`7f493fc6d0dc49eabd1b84a9124a6300`):**
  * Header: `TARBIYAH — Your Deen. Your Journey. Your Growth`, nav links (`Quiz Summary`, `Help`), `person` avatar.
  * Hero Card: `PERSONAL PATHWAY SYNTHESIZED`, `Calibrated to your pace`, `ASSALAMU ALAIKUM, ZAYD`, `"Your Tarbiyah Journey Begins with Clarity & Sakinah."`, 4 Learner Archetype pills (`Explorer`, `Foundation Builder` [active], `Consistency Seeker`, `Deep Learner`), Abdul Bari & Ansharah speech bubble, right-column dual portrait showcase (`Abdul Bari — Theology & Hikmah`, `Ansharah — Habits & Daily Duas`) + `Recommended Rhythm: 15 mins • 4 days / week` (`No-Stress`).
  * `Your Tarbiyah Diagnostic Blueprint` (`Edit Quiz Preferences` link):
    * Left card (`Learning Profile`, `Self-Reported`): Baseline Starting Point, Instruction Language, Target Commitment Pace, `"Answers recorded 5 mins ago"`.
    * Right card (`Selected Focus Pillars`, `5 Goals Active`): selected goal badges + Sahih Bukhari quote.
  * Primary Recommendation Card: `Noor-ul-Bidayah (نور البداية) — The Light of the Beginning` (`Duration: 6 Weeks`, `0% Unlocked 0/3`), 3 phase cards (`Phase 01 • Weeks 1–2: The Heart of Tawheed & Purpose [Ready]`, `Phase 02 • Weeks 3–4: Khushu in Prayer — Step-by-Step [Queued]`, `Phase 03 • Weeks 5–6: Everyday Adhkar & Quran Connection [Queued]`), and `Companion Guidance` banner.
  * First Suggested Lesson Callout: `Module 1: Foundations of Faith • Step 1 of 18 • Audio Reflection included` — `Lesson 1: Bismillah — The Power of Pure Intention (Niyyah)` (`Start First Lesson Now`, `Save for Tonight`).
  * Bottom CTA Banner: `"Ready to explore your personalised sanctuary?"` — `Continue to Main Dashboard` primary button + `Review All Pathways` secondary button.
  * Footer: `© 2025 TARBIYAH. All rights reserved.` + `Privacy Policy`, `Terms of Service`, `Support`.

---

## 4. Navigation Behaviour & Progress Indicators

| Element | Mobile (`02`) | Desktop (`02`) |
| --- | --- | --- |
| **Progress Display** | `Step X of 5` pill + gradient progress bar (`20%`..`100%`) | `Step X of 5 • 20%` + `"Takes less than 2 minutes"` + gradient progress bar + 5 clickable step tabs (`✓` on completed steps) |
| **Companion Bubble** | Compact card with step-specific companion microcopy | Wide mentor bubble with longer step-specific Islamic encouragement quote |
| **Step Back** | Header `arrow_back` + fixed bottom `Back` (disabled on Step 1) | Card bottom `Back` pill (disabled on Step 1) |
| **Skip** | Top-right `Skip` button (`currentStep < 5` advances 1 step) | Card bottom `Skip for now` button (`currentStep < 5` advances 1 step) |
| **Continue / Finish** | Fixed bottom dock `Continue` -> Step 5: `Start My Journey` | Card bottom `Continue to Next Step` -> Step 5: `Complete & Launch Dashboard` |
| **Exit / Help** | Header `close` (`X`) button | Header `Need help?`, `Exit Onboarding` links |

---

## 5. Desktop vs. Mobile Differences & Missing/Ambiguous Information

1. **Broken/Incorrect Image Assets in Stitch `02` & `03`:**
   * In `02 — Personalisation Quiz (Mobile)` and `03 — Personalised Learner Profile (Mobile)`, the circular companion `<img>` renders a miniature screenshot of an entire UI webpage rather than a character portrait.
   * By contrast, `03 — Personalised Learner Profile (Desktop)` has clean separate portraits for Abdul Bari and Ansharah, and `02 — Personalisation Quiz (Desktop)` has a clean combined portrait. Use the clean local companion portraits/assets during implementation.
2. **Icon Bug in Desktop Step 3:**
   * `Five Pillars` uses the `temple_hindu` Material icon in `e07279d41a1b40d7916e33fd3b98ca1f`. Replace with `account_balance` (used on Mobile) or an appropriate Lucide icon.
3. **Validation & Required Ambiguity:**
   * Desktop marks Step 1 fields with `*`, while Mobile does not, and Stitch JS allows skipping Step 1 entirely. Clarify whether Preferred Name/Country/Age/Language should be required before advancing or optionally skippable (`Skip for now` bypassing validation vs. saving defaults).
4. **Country List & Code Discrepancy:**
   * Mobile uses `GB` and includes Australia/India; Desktop uses `UK` and includes Saudi Arabia/UAE. Reconcile into one unified ISO-3166 country list for Phase F5 implementation.
5. **Commitment Wording Discrepancy (`02` vs `03`):**
   * `02` offers `1–2 Hours` / `1–2 Hours / day`, while `03` Desktop shows both `15 mins • 4 days / week` and `1–2 Hours Weekly`. Standardize display mapping cleanly from the chosen option.
6. **Hardcoded Sample Output on `03`:**
   * `03` displays hardcoded data (`Zayd`, `Foundation Builder`, `Noor-ul-Bidayah`) and does not document the deterministic rules mapping quiz selections to Learner Archetype (`Explorer`, `Foundation Builder`, `Consistency Seeker`, `Deep Learner`) or pathway cards.
7. **Exit Onboarding & Dashboard Destination (`04`):**
   * `Exit Onboarding` / `close` (`X`) and `Continue to Dashboard` destinations need defined routes (in F5, before Dashboard F6+ exists, `Continue to Dashboard` can route to `/app` or stay within the previewed `/onboarding/complete` milestone boundary).
8. **Missing `Amiri` Font Import in `02`/`03` HTML:**
   * `03` Desktop renders Arabic script (`نور البداية`), and `index.html` in our project already loads `Amiri`, `Manrope`, and `Inter`.

---

## 6. Design Tokens & Reusable Components

### Design Tokens (Already Configured in Project)
* **Colors:** `surface` (`#fcf8ff`), `surface-container-lowest` (`#ffffff`), `surface-container-low` (`#f6f2ff`), `surface-container` (`#efebff`), `surface-container-high` (`#eae6f9`), `surface-container-highest` (`#e4e0f3`), `primary` (`#5d3ace`), `primary-container` (`#7656e8`), `primary-fixed` (`#e7deff`), `secondary` (`#005cbd`), `secondary-container` (`#468fff`), `tertiary` (`#00635d`), `tertiary-fixed` (`#70f8ec`), `on-surface` (`#1b1a28`), `on-surface-variant` (`#484554`), `outline` (`#797586`), `outline-variant` (`#cac4d7`).
* **Typography:** `Manrope` (headings/titles), `Inter` (body/labels), `Amiri` (Arabic script such as `نور البداية`).

### Reusable Components Inventory
* **Existing in Repo (to reuse):** `PrimaryButton`, `TextInputField`, `ProtectedRoute`, `AuthHeader` pattern (sticky frosted header).
* **New Onboarding Components (for F5 implementation after approval):**
  * `OnboardingShell` — Responsive header (`Back`/`X` on mobile, `Quiz` / `Need help?` / `Exit Onboarding` on desktop), ambient glows, and footer.
  * `QuizProgressHeader` — Linear progress bar, `Step X of 5` + `%` readout, and desktop 5-step clickable stepper tabs.
  * `CompanionMentorBanner` — Step-aware Abdul Bari & Ansharah encouragement bubble using clean local portrait assets.
  * `QuizSingleSelectCard` & `QuizMultiSelectCard` — Accessible `radiogroup` / checkbox-style cards with selected/unselected Tarbiyah token states.
  * `QuizStep1Personal`, `QuizStep2Background`, `QuizStep3Goals`, `QuizStep4Commitment`, `QuizStep5StartingPoint` — Dedicated step subcomponents managed by a single `OnboardingQuizPage` React state machine.
  * `LearnerProfileSummaryPage` (`03`) — Responsive completion blueprint rendering the user's actual quiz selections (no fake hardcoded `"Zayd"` when a name was entered).

---

## 7. Frontend Implementation Plan (Strictly Based on Stitch Designs — Pending Approval)

> **Scope Note:** No database tables, Supabase onboarding persistence, or AI personalisation will be implemented in the initial UI step unless separately approved.

1. **Step 1 — Localize Clean Companion Assets (`src/assets/`):**
   * Extract/save clean Abdul Bari & Ansharah portraits from `02` Desktop / `03` Desktop (avoiding the broken mobile mini-screenshot URLs in `02`/`03` Mobile).
2. **Step 2 — Define Strictly Typed Onboarding Data & State (`src/features/onboarding/types/onboarding.ts`, `data/quizQuestions.ts`):**
   * Encode all 5 steps, exact question copy, options, icons, and unified country/language lists strictly from Stitch `02`.
   * Create a simple deterministic client-side helper to reflect chosen name, goals, language, commitment, and a derived archetype label onto screen `03`.
3. **Step 3 — Build Unified Responsive Onboarding Quiz (`src/pages/OnboardingQuizPage.tsx` at `/onboarding`):**
   * Single responsive React component adapting seamlessly across `375px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, and `1440px` (fixed mobile bottom action bar + desktop card footer controls, natural document scrolling).
   * Supports Back, Skip, clickable desktop step tabs, inline validation for Step 1 (if approved as required), and transition to `/onboarding/profile`.
4. **Step 4 — Build Unified Responsive Learner Profile Completion Screen (`src/pages/LearnerProfilePage.tsx` at `/onboarding/profile`):**
   * Displays personalized greeting, archetype selector/badge, preferences recap with `Edit` action back to `/onboarding`, `Noor-ul-Bidayah` 3-milestone/phase preview, first lesson callout, and `Continue to Dashboard` (`/app`).
5. **Step 5 — Route Wiring & QA:**
   * Register `/onboarding` and `/onboarding/profile` inside `<ProtectedRoute>` in `src/App.tsx` (keeping `/login`, `/register`, `/forgot-password`, `/reset-password`, and `/app` intact).
   * Verify `npm run typecheck`, `npm run build`, and responsive/scroll checks across all 7 viewport widths.

4. **Step 4 — Build Unified Responsive Learner Profile Completion Screen (`src/pages/LearnerProfilePage.tsx` at `/onboarding/profile`):**
   * Displays personalized greeting, archetype selector/badge, preferences recap with `Edit` action back to `/onboarding`, `Noor-ul-Bidayah` 3-milestone/phase preview, first lesson callout, and `Continue to Dashboard` (`/app`).
5. **Step 5 — Route Wiring & QA:**
   * Register `/onboarding` and `/onboarding/profile` inside `<ProtectedRoute>` in `src/App.tsx` (keeping `/login`, `/register`, `/forgot-password`, `/reset-password`, and `/app` intact).
   * Verify `npm run typecheck`, `npm run build`, and responsive/scroll checks across all 7 viewport widths.