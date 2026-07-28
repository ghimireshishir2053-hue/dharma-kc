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

## Krishi Bank — buyer SMS notifications

`/krishi-bank` is backed by a real Postgres database (via Prisma) and Sparrow
SMS: when a farmer submits a listing, every buyer registered with matching
produce interest is texted immediately with the farmer's phone number.
Neither piece is configured out of the box — copy `.env.example` to
`.env.local` and fill in:

- `DATABASE_URL` — any Postgres connection string (Vercel Postgres, Neon,
  Supabase all work). After setting it, run `npx prisma migrate dev --name init`
  once to create the tables (also add the same var to the Vercel project's
  Environment Variables for production).
- `SPARROW_SMS_TOKEN` / `SPARROW_SMS_FROM` — from a [Sparrow SMS](https://sparrowsms.com)
  account (Nepal SMS gateway). Without these set, submissions still save to
  the database — the SMS send is skipped and logged to the server console
  instead of failing.

Matching is by produce type only (exact match, including "Other" matching
"Other" — the free-text product name isn't compared). Notification attempts
are logged in the `Notification` table (`prisma/schema.prisma`) for auditing.

## Project Tracker ("Sectors") — admin-entered only

The homepage's "Sectors" section and the Lamjung map's per-palika project
counts both read live from the same `DATABASE_URL` Postgres database (see
above) via `/api/projects` — there is no placeholder/demo data anymore. The
section shows real zeros until an admin adds a project at `/admin/projects`
(default login `admin` / `admin123`, override via `ADMIN_USERNAME` /
`ADMIN_PASSWORD` env vars — change these before going live). Category,
palika, and status are constrained to the existing fixed lists in
`content/categories.ts` / `content/municipalities.ts`, both in the admin
form's dropdowns and re-validated server-side, so the public tracker can
never receive a value it doesn't know how to render. "Latest update" time
(e.g. "3 days ago") is computed from the real last-edited timestamp, not
typed in by hand.
