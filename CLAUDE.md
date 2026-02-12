# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VisualCV is a personal interactive resume/portfolio dashboard. It displays professional experience, skill visualizations, certifications, and contact information as a single-page app. All content is static — there are no API calls or database connections. Resume data is centralized in one file.

## Commands

```bash
npm run dev       # Start Next.js dev server (http://localhost:3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint with next/core-web-vitals
```

No test framework is configured.

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts (DM Sans, JetBrains Mono), metadata, ThemeProvider wrapper
│   ├── page.tsx            # Home route — renders <Dashboard />
│   └── globals.css         # Tailwind directives, CSS variable themes (light/dark), custom utilities
├── components/
│   ├── ui/                 # shadcn/ui primitives (badge, button, card, separator, switch)
│   ├── dashboard.tsx       # Main page component — 3-column grid layout with all sections
│   ├── experience-card.tsx # Renders a single Experience with highlights list
│   ├── skill-bar.tsx       # Animated progress bar with color tiers (emerald/teal/sky/violet)
│   ├── chat-bubble.tsx     # Bot/user message bubble (AI chat is currently disabled)
│   └── theme-provider.tsx  # React Context for dark/light mode toggle
├── data/
│   └── resume-data.ts      # Single source of truth: all content + Experience interface
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)

public/
├── images/                 # Profile photo, GitHub contributions graph
└── resume.pdf              # Downloadable resume
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3, CSS variables (HSL), `darkMode: "class"` |
| UI primitives | shadcn/ui (Radix UI + class-variance-authority) |
| Charts | recharts (PieChart for skill distribution) |
| Icons | lucide-react |
| Fonts | DM Sans (`font-sans`), JetBrains Mono (`font-mono`) via next/font/google |
| Animation | tailwindcss-animate + custom CSS keyframes in globals.css |

## Key Conventions

- **Path alias**: `@/*` resolves to `./src/*` (tsconfig paths).
- **Client components**: Only `dashboard.tsx`, `skill-bar.tsx`, and `theme-provider.tsx` use `"use client"`. Everything else is a server component or pure presentational.
- **No external state management**: Local `useState`/`useEffect` only. Theme state is in React Context (`ThemeProvider`).
- **Data changes**: To update resume content (experiences, skills, certifications, courses, contact info), edit only `src/data/resume-data.ts`. The `Experience` interface is also defined there.
- **shadcn/ui components** live in `src/components/ui/` and use `cn()` from `src/lib/utils.ts` for class merging. They follow the CVA (class-variance-authority) variant pattern.
- **Theme colors**: Defined as HSL CSS variables in `globals.css` (`:root` for light, `.dark` for dark). Referenced in `tailwind.config.ts` as `hsl(var(--...))`.
- **Accent color**: Emerald (`emerald-500`) is the primary accent throughout — glow effects, badges, progress bars, active states, and interactive highlights.

## Component Patterns

- **Dashboard** (`src/components/dashboard.tsx`): The monolithic page component. Renders a sticky header, a 3-column responsive grid (skills | experience | chat+contact), and a footer. All section logic lives here. Uses `experiences[0]` for "Current Position" and `experiences.slice(1)` for the selectable career history.
- **ExperienceCard**: Stateless, receives an `Experience` prop. Server-compatible (no `"use client"`).
- **SkillBar**: Client component with staggered animation via `setTimeout` + `delay` prop. Bar color is tiered by level: >=90 emerald, >=80 teal, >=70 sky, else violet.
- **ThemeProvider**: Custom context (not next-themes). Defaults to dark. Toggles by adding/removing `.dark` class on `<html>`.
- **ChatBubble**: Static display only. The AI chat input is currently `disabled` — hardcoded messages are rendered as a preview.

## Custom CSS Utilities (globals.css)

- `.glow-card` — Emerald box-shadow glow on featured cards
- `.bg-grid` — Subtle dot-grid background pattern for the page
- `.fade-up` + `.delay-1`/`.delay-2`/`.delay-3` — Staggered entrance animations for columns
- `.custom-scroll` — Thin WebKit scrollbar styling
