# Jayburtt Dijkhoff — Ideas That Move People and Systems

Site for Dr. Jayburtt Dijkhoff — educator, author, speaker and performer. Built with
Next.js (App Router) and TypeScript.

The business model the site is organised around: **teaching at scale, training in depth,
art in public, and consulting only by invitation.** That maps to three primary pillars —
Learn (`/courses`), Train Your Organization (`/in-house-training`), and Experience
(`/performances`) — with advisory deliberately de-emphasised at `/advisory`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — homepage, built around the three pillars
- `app/courses/page.tsx` — course catalogue, grouped by language (NL / EN / PAP)
- `app/courses/[slug]/page.tsx` — **reusable course page template**
- `app/in-house-training/page.tsx` — formats, process and enquiry
- `app/performances/page.tsx` — poetry, music, storytelling, cabaret + speaking formats
- `app/books-and-ideas/page.tsx` — the book plus essays and reflections
- `app/about/page.tsx`, `app/contact/page.tsx` — personal bio and enquiry form
- `app/advisory/page.tsx` — selective advisory, by invitation (not in the main nav)
- `app/admin/signups/page.tsx` — password-protected overview of all signups and enquiries
- `lib/courses.ts` — **the course catalogue data**
- `components/` — shared Header, Footer, forms and section building blocks

### Adding a course

Courses are data, not pages. Add an object to `COURSES` in `lib/courses.ts` and both the
catalogue card and a full course page at `/courses/<slug>` appear automatically — no new
files. Courses with `status: "coming-soon"` render as "In development" with a notify form
instead of a buy path, so nothing looks purchasable before it is.

Old URLs (`/speaking`, `/arts`, `/books`, `/insights`, `/consulting`, `/board-advisory`,
`/yabinan-di-poder`) permanently redirect to their new homes — see `next.config.ts`.

## Signups, enquiries and the admin overview

Every form on the site — course enrolment, the course-agenda / founding-cohort list, and the
contact form — writes to the same `program_signups` table and appears in `/admin/signups`.
The `program` column distinguishes them (`contact`, `course-agenda`, or a course slug).

This needs three environment variables, set in the hosting platform's dashboard (Vercel →
Project → Settings → Environment Variables), not committed to the repo:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Your Supabase project URL, e.g. `https://<project-ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | The **secret** key (`sb_secret_…`, or a legacy `service_role` JWT) from Project Settings → API Keys. Server-only — never exposed to the browser, and never the `sb_publishable_…` key, which RLS will reject. |
| `ADMIN_PASSWORD` | Password gating `/admin/*`. Pick your own; unrelated to Supabase. |

### 1. Create the table

Either paste `supabase/migrations/20260728000000_create_program_signups.sql` into the
Supabase SQL Editor and run it, or apply it with the CLI from your own machine:

```bash
supabase login
supabase init                                    # skip if config.toml already exists
supabase link --project-ref <project-ref>
supabase db push                                 # applies supabase/migrations/*
```

### 2. Set the environment variables

Add all three variables above in Vercel → Project → Settings → Environment Variables,
then redeploy so the new values are picked up.

**How it works right now:** there is no real checkout yet. Visitors fill out the enrollment
forms across the site, which are saved to the `program_signups` table. Sign in at
`/admin/login` with `ADMIN_PASSWORD` to see everyone who signed up, then follow up manually
with a Wix Payment Link to collect payment. This is intentionally a holding pattern — see
the "real tool" note in project history for what comes next.
