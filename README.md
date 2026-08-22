# Fatih Al Jabar H.M. — Portfolio

Personal portfolio site built with Next.js — projects, achievements, and contact, all backed by a live database and manageable from an admin dashboard.

## Live

- Website: [fatihaljabar.com](https://fatihaljabar.com)

## Tech Stack

**Framework:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict)
**Styling:** Tailwind CSS · shadcn/ui · Framer Motion
**Data:** Prisma ORM · PostgreSQL (Supabase) · Supabase Storage
**i18n & theme:** next-intl (English/Indonesian) · next-themes (dark mode default)
**Tooling:** Biome (lint & format)
**Hosting:** Hostinger, auto-deployed from `main`

## Features

- Bilingual (EN/ID) with locale-prefixed routing
- Dark/light theme
- Dynamic projects and achievements, managed through an admin dashboard
- Contact form backed by a database
- Fully responsive across mobile, tablet, and desktop, portrait and landscape

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` (if present) or set the following:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SITE_NAME=
```

### Scripts

```bash
npm run dev          # start dev server
npm run build        # production build
npm run start        # run production build
npm run lint          # Biome check
npm run lint:fix      # Biome check --write
npm run format         # Biome format --write
npx tsc --noEmit      # typecheck
npm run db:studio    # inspect the database
npm run db:seed      # seed sample data (destructive)
```

## License

Personal project — all rights reserved.
