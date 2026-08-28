# Fatih Al Jabar H.M. — Portfolio

Personal portfolio site built with Next.js. Projects, achievements, career history, education, and skills all live in a database and are managed through a self-service admin dashboard — no redeploy needed to update content.

## Live

- Website: [fatihaljabar.com](https://fatihaljabar.com)

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS, shadcn/ui (`new-york` style), Framer Motion |
| Backend | Next.js Server Actions — no separate REST API layer |
| Database | PostgreSQL via Supabase, Prisma ORM |
| Auth | Supabase Auth, email allowlist enforced server-side |
| Storage | Supabase Storage, service-role uploads, JPEG/PNG only |
| Validation | Zod, enforced on both client and server |
| i18n & theme | next-intl (English/Indonesian), next-themes (dark default) |
| Testing | Vitest (unit), Playwright (E2E) |
| Lint & format | Biome |
| Hosting | Hostinger, auto-deployed from `main` |

## Architecture

Reads go through Server Components straight to Prisma; writes go through Server Actions. There's no REST API layer — nothing outside this app consumes one, so adding one would only add indirection.

Every admin Server Action checks the session itself, on the first line, independent of `src/proxy.ts`'s middleware redirect — middleware alone doesn't protect a Server Action called directly.

## Features

**Public site**
- Bilingual (EN/ID) with locale-prefixed routing and instant language switching (no page reload, scroll position preserved)
- Dark/light theme, dark by default, no flash of the wrong theme on load
- Projects and achievements with filtering, backed by the database — content updates go live without a redeploy
- Contact form with server-side validation and per-IP rate limiting
- Skeleton loading UI on every route and every image
- SEO: per-page metadata, OG images, `sitemap.xml`, `robots.txt`, `hreflang`
- Fully responsive: mobile, tablet, desktop, portrait and landscape

**Admin dashboard**
- Full CRUD for Projects, Achievements, Career, Education, and Skills
- Messages inbox for the contact form
- Image uploads to Supabase Storage via an authenticated Server Action
- Access restricted to an explicit email allowlist, not just "any authenticated user"

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
ADMIN_EMAILS=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SITE_NAME=
```

`ADMIN_EMAILS` is a comma-separated allowlist of the email addresses permitted to sign in to `/admin`.

### Scripts

```bash
npm run dev          # start dev server
npm run build         # production build
npm run start         # run production build
npm run lint          # Biome check
npm run lint:fix      # Biome check --write
npm run format         # Biome format --write
npx tsc --noEmit      # typecheck
npm run test          # unit tests (Vitest)
npm run test:e2e      # end-to-end tests (Playwright)
npm run db:migrate    # run Prisma migrations
npm run db:studio     # inspect the database
npm run db:seed       # seed sample data (destructive)
```

## License

MIT — see [LICENSE](LICENSE). Free to use, modify, and build on, as long as the original copyright notice is kept.
