# VisualCV

An interactive resume dashboard built with Next.js, React, and Tailwind CSS. Presents professional experience, skill visualizations, certifications, and contact information in a clean, responsive single-page layout with dark/light mode support.

## Preview

**3-column dashboard** — Skills & charts | Experience timeline | AI assistant (coming soon) & contact

## Tech Stack

- **Next.js 14** (App Router) with **React 18** and **TypeScript**
- **Tailwind CSS 3** with CSS variable theming and dark mode
- **shadcn/ui** component primitives (Radix UI + class-variance-authority)
- **recharts** for data visualization
- **lucide-react** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/usaqlain01/visualcv.git
cd visualcv
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router (layout, page, global styles)
├── components/
│   ├── ui/                 # Reusable UI primitives (button, card, badge, etc.)
│   ├── dashboard.tsx       # Main dashboard layout
│   ├── experience-card.tsx # Work experience display
│   ├── skill-bar.tsx       # Animated skill progress bars
│   ├── chat-bubble.tsx     # AI chat message bubbles
│   └── theme-provider.tsx  # Dark/light mode context
├── data/
│   └── resume-data.ts      # All resume content (single source of truth)
└── lib/
    └── utils.ts            # Utility functions
```

## Features

- **Interactive Experience Timeline** — Browse career history with detailed role highlights
- **Skill Visualizations** — Animated progress bars and pie chart for skill distribution
- **Dark/Light Mode** — Toggle between themes with smooth transitions
- **Resume Download** — One-click PDF resume download
- **GitHub Activity** — Contribution graph display
- **Responsive Design** — 3-column grid that adapts to all screen sizes
- **AI Assistant** — Chat interface (coming soon)

## Customization

All resume content is centralized in `src/data/resume-data.ts`. Edit this single file to update:

- Personal info and contact details
- Work experiences and highlights
- Skills and proficiency levels
- Skill distribution chart data
- Education, certifications, and courses
- GitHub statistics

## License

This project is private and not licensed for redistribution.
