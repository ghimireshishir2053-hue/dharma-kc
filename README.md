# Dharma K.C. — MP Portal

Official portal for **Hon. Dharma Raj K.C.**, Member of Parliament, Lamjung-1, House of Representatives, Nepal.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS + CSS variables for design tokens
- `next/font` for Noto Sans/Serif Devanagari, Space Grotesk, JetBrains Mono, Fraunces
- Client-side NE/EN language toggle with `localStorage` persistence
- Local typed content modules under `content/` (ported from the design handoff)

## Getting started

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:3000.

## Project layout

```
app/            Next.js App Router pages, layout, API routes
components/     Section components (Hero, ProjectTracker, LamjungMap, ...)
content/       Typed NE/EN data (mp, priorities, projects, municipalities, ...)
lib/            i18n provider, shared types
public/         Static assets (MP portrait, icons)
```

## Editing copy

Bilingual strings live in `lib/i18n.tsx` (`STR`) and content modules under `content/`.
Update the `.ne` / `.en` / `...Ne` / `...En` fields and the site picks them up via the language toggle.

Placeholders left for the client to fill in:

- `content/callForExperts.ts` → `deadlineValue` and `ctaHref`
