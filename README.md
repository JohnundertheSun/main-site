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
- `app/{speaking,books,arts,consulting,insights}/page.tsx` — placeholder landing pages linked from the nav
- `app/about/page.tsx`, `app/contact/page.tsx` — bio and contact/booking form
- `components/` — shared Header, Footer, and section building blocks
- `public/images/` — book cover and portrait photography from the design handoff
