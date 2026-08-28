# Fatih Al Jabar H.M. Portfolio

A personal portfolio site that doubles as proof of the skills it lists. Every project, achievement, career entry, education entry, and skill shown here lives in Postgres and is edited through a self-service admin dashboard, not hardcoded in the source. Change something in the dashboard and it is live on the public site on the next request, with no redeploy in between.

## Live

Website: [fatihaljabar.com](https://fatihaljabar.com)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Security](#security)
- [Deployment](#deployment)
- [License](#license)

## Overview

This is not a static resume with a coat of paint. It is a bilingual (English and Indonesian) Next.js application with its own backend, its own database, and its own admin dashboard, built to stay current without a single line of code touched after launch.

The frontend and backend are both Next.js. There is no separate API server and no REST layer: pages read data directly through Server Components, and the admin dashboard writes data through Server Actions. Nothing outside this application ever consumes an API from it, so adding one would only add a layer with no purpose.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS, shadcn/ui (`new-york` style), Framer Motion |
| Backend | Next.js Server Actions, no separate REST API layer |
| Database | PostgreSQL via Supabase, Prisma ORM |
| Auth | Supabase Auth, session checked against an email allowlist on every admin request |
| Storage | Supabase Storage, service-role uploads, JPEG and PNG only |
| Validation | Zod, enforced on both client and server |
| i18n and theme | next-intl (English and Indonesian), next-themes (dark by default) |
| Testing | Vitest for unit tests, Playwright for end to end |
| Lint and format | Biome |
| Hosting | Hostinger, auto-deployed from `main` |

## Architecture

Reads go through Server Components straight to Prisma. Writes go through Server Actions guarded by an authorization check. There is no REST API layer between them, and none is planned, since a layer with no consumer outside this app only adds indirection.

Every admin Server Action checks the session for itself, on the first line, before it touches any data. This is deliberate and not redundant with the middleware: `src/proxy.ts` redirects an unauthenticated visitor away from `/admin/*` for the user experience, but a Server Action can be invoked directly, bypassing page navigation entirely, so middleware alone is not a security boundary. The protected admin layout adds a third check of its own, so a future middleware edit or framework regression still leaves the data behind an authorization check.

Authorization itself is an explicit email allowlist, not "any account that can sign in." The Supabase anon key ships to the client by design, which means anyone able to create a Supabase account on the project could otherwise reach the admin dashboard. `ADMIN_EMAILS` closes that gap at the code level.

Development and production run on two entirely separate Supabase projects. A leaked development credential, or an accidental local database reset, can never reach real visitor data, because there is no shared database for it to reach.

Pages driven by the database use time-based revalidation, and every admin write calls `revalidatePath()` for the routes it affects. A change saved in the dashboard is visible on the public site on the very next request, not on the next deploy.

## Features

### Public site

- Bilingual (English and Indonesian) with locale-prefixed routing, hreflang tags, and instant language switching with no full page reload and no lost scroll position
- Dark and light theme, dark by default, with no flash of the wrong theme on first paint
- Projects and achievements with filtering, all backed by the database
- Contact form with Zod validation on both client and server, plus per-IP rate limiting
- A Love button that lets visitors mark their appreciation, no account required
- Skeleton loading UI on every route and every image, replacing spinner-based loading states
- SEO handled per page: unique metadata and OG images per route per locale, `sitemap.xml`, `robots.txt`, and hreflang tags
- Fully responsive across mobile, tablet, and desktop, in both portrait and landscape

### Admin dashboard

- Full CRUD for Projects, Achievements, Career history, Education, and Skills
- A Messages inbox for everything submitted through the contact form
- Image uploads that go straight to Supabase Storage through an authenticated Server Action, using a service-role client the browser never sees
- Access restricted to an explicit email allowlist, checked independently at three separate points: the middleware, the protected layout, and every Server Action itself

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/        Home, About, Achievements, Projects, Contact
│   │   ├── admin/
│   │   │   ├── (protected)/ CRUD screens, guarded by session checks
│   │   │   └── login/
│   │   └── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/                  shadcn primitives
│   ├── layout/               sidebar, floating nav, main layout
│   └── components/           shared building blocks
├── lib/
│   ├── actions/              Server Actions ('use server')
│   ├── auth/                 Supabase clients and the admin allowlist
│   ├── validations/           Zod schemas
│   └── i18n/
├── messages/{en,id}.json
└── proxy.ts                  locale detection and admin route protection
```

## Getting Started

Requirements: Node.js 20 or newer, and a Supabase project (or access to one).

```bash
npm install
cp .env.example .env.local   # then fill in the values, see below
npx prisma migrate deploy
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string used by Prisma |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key, safe to ship to the client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used for Storage uploads, never exposed to the client |
| `ADMIN_EMAILS` | Comma-separated allowlist of the email addresses permitted to sign in to `/admin` |
| `NEXT_PUBLIC_APP_URL` | The site's own public URL, used for metadata and sitemap generation |
| `NEXT_PUBLIC_SITE_NAME` | Display name used in metadata |

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Biome check |
| `npm run lint:fix` | Biome check with autofix |
| `npm run format` | Biome format, write mode |
| `npx tsc --noEmit` | Typecheck without emitting output |
| `npm run test` | Unit tests, Vitest |
| `npm run test:e2e` | End to end tests, Playwright |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio to inspect the database |
| `npm run db:seed` | Seed sample data. Destructive, overwrites existing rows |

## Testing

Unit tests cover the logic where a bug would matter most: input validation, admin authorization, and rate limiting. They run with Vitest and live next to the code they test as `*.test.ts` files. End to end coverage runs on Playwright and exercises the full admin flow, from login through creating a record to seeing it appear on the public site.

## Security

- Every admin Server Action checks the caller's session against an email allowlist before touching any data, independent of the middleware.
- Image uploads are validated server-side for file type and size, renamed to a generated filename, and written through a service-role client that never reaches the browser.
- Contact form submissions and Love toggles are rate-limited per IP address, derived from the trusted hop of the reverse proxy rather than a client-suppliable header.
- Development and production use separate Supabase projects with separate credentials.
- Baseline security response headers are set on every response: a Content-Security-Policy restricting framing, `X-Frame-Options`, `X-Content-Type-Options: nosniff`, and a `Referrer-Policy`.

## Deployment

Hosted on Hostinger, building and deploying automatically from `main`. The build runs `next build --webpack` rather than the Turbopack default, since Turbopack's production output was found to ship legacy browser polyfills to every visitor instead of gating them behind `<script nomodule>` the way Webpack does.

`main` and `develop` are the only long-lived branches. Feature work happens on short-lived `feat/*`, `fix/*`, or `chore/*` branches, merged into `develop` through a pull request, then periodically synced into `main`.

## License

MIT. See [LICENSE](LICENSE). Free to use, modify, and build on, as long as the original copyright notice is kept.
