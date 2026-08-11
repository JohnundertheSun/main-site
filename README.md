# Jayburtt Dijkhoff — Ideas That Move People and Systems

Site for Dr. Jayburtt Dijkhoff — educator, author, speaker and performer. Built with
Next.js (App Router) and TypeScript.

The business model the site is organised around: **teaching at scale, training in depth,
art in public, and consulting only by invitation.** That maps to three primary pillars —
Learn (`/courses`), Train Your Organization (`/in-house-training`), and Experience
(`/performances`) — with advisory deliberately de-emphasised at `/advisory`.

## Read this first

More than one person can push to this repository, and every push to `main` deploys
straight to the live site. **[COLLABORATION.md](COLLABORATION.md) is the agreement that
stops the two of us overwriting each other.** Read it once before your first push.

The short version: claim before you work, release when you are done.

```bash
bash scripts/claim.sh "what you are about to do"
# ... edit, commit, push ...
bash scripts/release.sh
```

## Development

First time on a new machine:

```bash
bash scripts/setup.sh
```

That installs dependencies, turns on the push protection described in
COLLABORATION.md, and creates `.env.local` from [`.env.example`](.env.example).

After that:

```bash
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

Alongside the row in the database, each submission sends two emails through Resend: a
notification to Jayburtt, and a confirmation to the person who filled in the form. Every
send is recorded in the `email_log` table, so "I never got a confirmation" is answerable.

These environment variables are set in the hosting platform's dashboard (Vercel →
Project → Settings → Environment Variables), never committed to the repo. See
[`.env.example`](.env.example) for the same list in copy-paste form.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | yes | Your Supabase project URL, e.g. `https://<project-ref>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | The **secret** key (`sb_secret_…`, or a legacy `service_role` JWT) from Project Settings → API Keys. Server-only — never exposed to the browser, and never the `sb_publishable_…` key, which RLS will reject. |
| `ADMIN_PASSWORD` | yes | Password gating `/admin/*`. Pick your own; unrelated to Supabase. |
| `RESEND_API_KEY` | no | From resend.com → API Keys. **Leave it unset and no email is sent — forms still save normally.** That is deliberate, so local and preview environments do not email real people. |
| `EMAIL_FROM` | no | Sender address. Must be on a domain verified in Resend. Defaults to `Jayburtt Dijkhoff <hello@updates.jayburttdijkhoff.com>`. |
| `EMAIL_TO_ADMIN` | no | Where signup notifications land. Comma-separated for more than one. No notification is sent if unset. |
| `EMAIL_REPLY_TO` | no | Where a visitor's reply goes. Defaults to the first `EMAIL_TO_ADMIN`. |

### 1. Create the tables

Either paste the migrations in `supabase/migrations/` into the Supabase SQL Editor in
filename order and run them, or apply them with the CLI from your own machine:

```bash
supabase login
supabase link --project-ref jtubwqcrqvlpbscsoraz
supabase db push                                 # applies supabase/migrations/*
```

Migrations are written to be idempotent, so re-running them is safe.

### 2. Set the environment variables

Add the variables above in Vercel → Project → Settings → Environment Variables, then
redeploy so the new values are picked up.

**How it works right now:** there is no real checkout yet. Visitors fill out the enrollment
forms across the site, which are saved to the `program_signups` table. Sign in at
`/admin/login` with `ADMIN_PASSWORD` to see everyone who signed up, then follow up manually
with a Wix Payment Link to collect payment. This is intentionally a holding pattern — see
the "real tool" note in project history for what comes next.
