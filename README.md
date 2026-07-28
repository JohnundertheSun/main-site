# Jayburtt Dijkhoff — Homepage

Personal site for Jayburtt Dijkhoff, PhD — speaker, author, and healthcare/law systems
advisor for the ABC islands and the Netherlands. Built with Next.js (App Router) and TypeScript,
implemented from the "Jayburtt Dijkhoff Homepage" Claude Design handoff.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — homepage (hero, speaking, method, offerings, books, arts, consulting, insights, mission, newsletter)
- `app/{speaking,books,arts,consulting,board-advisory,insights}/page.tsx` — landing pages linked from the nav
- `app/about/page.tsx`, `app/contact/page.tsx` — bio and contact/booking form
- `app/yabinan-di-poder/page.tsx` — online program landing page with a real enrollment form
- `app/admin/signups/page.tsx` — password-protected overview of program signups
- `components/` — shared Header, Footer, and section building blocks
- `public/images/` — book cover and portrait photography from the design handoff

## Program signups (Yabinan di Poder)

The `/yabinan-di-poder` enrollment form and the `/admin/signups` overview need three
environment variables, set in the hosting platform's dashboard (e.g. Vercel → Project →
Settings → Environment Variables), not committed to the repo:

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Your Supabase project URL (Project Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | The **service role** key (same page). Server-only — never exposed to the browser. |
| `ADMIN_PASSWORD` | Password gating `/admin/*`. Pick your own; nothing here needs to match Supabase. |

**One-time setup:**
1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, run `supabase/schema.sql` from this repo to create the
   `program_signups` table.
3. Copy the Project URL and `service_role` key from Project Settings → API.
4. Add all three env vars above to the hosting platform, then redeploy.

**How it works right now:** there is no real checkout yet. Visitors fill out the enrollment
form on `/yabinan-di-poder`, which is saved to the `program_signups` table. Sign in at
`/admin/login` with `ADMIN_PASSWORD` to see everyone who signed up, then follow up manually
with a Wix Payment Link to collect payment. This is intentionally a holding pattern — see
the "real tool" note in project history for what comes next.
