# Working on this site without breaking it

Two people can push to this repository. Every push to `main` deploys straight to the
live site. That means a careless push does not just create a messy commit, it changes
what visitors see within about a minute.

This document is the agreement that keeps that safe. It is short on purpose. Read it
once, then follow the three commands at the bottom.

---

## The one rule

**Only one person changes the site at a time.**

Not "we try to avoid overlapping". One at a time, always, enforced by the repository
itself. The person who is currently allowed to push is called the **holder**.

Everything below exists to answer two questions: who is the holder right now, and how
does the baton get handed over.

---

## Why this matters here specifically

Git does not merge two people's work for you when they touch the same thing. If both
of us change the homepage and both push, one of these happens:

1. The second push is rejected, and the natural next move is `git push --force`, which
   silently deletes the first person's work.
2. Git merges the two versions badly, the build breaks, and Vercel deploys a site that
   fails to load.
3. The build succeeds but the page is now a mix of two different intentions, and nobody
   notices until a visitor does.

All three are recoverable, and all three are avoidable. The cost of avoiding them is
about ten seconds per session.

---

## How the baton works

There is a file in this repository called [`ACTIVE-WORK.md`](ACTIVE-WORK.md). It contains
one meaningful line:

```
HOLDER: none
```

When you start work, you put your name there and push that change. When you finish, you
set it back to `none` and push again. That is the whole system.

It works because pushing is atomic. If both of us try to claim the baton at the same
second, Git accepts exactly one of the two pushes and rejects the other. The rejected
person gets a clear message instead of a broken site. There is no window where both of
us believe we are the holder.

A `pre-push` hook checks the file before every push and refuses to push if you are not
the holder, so this is not a rule you have to remember. It is a rule the repository
enforces.

---

## First-time setup

Run this once, in the project folder, after cloning:

```bash
bash scripts/setup.sh
```

It installs dependencies, turns on the pre-push hook, and asks for a short handle
(for example `nevin` or `jayburtt`) so the repository can tell the two of you apart.

---

## The three commands

### 1. Before you touch anything

```bash
bash scripts/claim.sh "what you are about to do"
```

This pulls the latest code, checks nobody else holds the baton, writes your name into
`ACTIVE-WORK.md`, and pushes.

If somebody else holds it, the command tells you who, and how long they have had it.
Message them. Do not work around it.

### 2. Work normally

Edit, commit, and push as often as you like. The hook lets you through because you are
the holder. Push small and often rather than one large push at the end, so that if
something does go wrong there is less to unpick.

### 3. When you are done

```bash
bash scripts/release.sh
```

This sets the holder back to `none` and pushes. The baton is now free for the other
person.

**Release the baton even if you did not finish.** Holding it overnight blocks the other
person completely. If your work is half-done, either push it behind a branch, or leave
it uncommitted locally and release.

---

## If something goes wrong

### "Somebody else holds the baton and they are asleep"

The baton is a convention, not a password. Anyone can take it. If the holder is clearly
gone (`ACTIVE-WORK.md` shows they claimed it eight hours ago) then message them, wait
for a reply if you can, and if you genuinely cannot wait, claim it anyway with:

```bash
bash scripts/claim.sh "taking over, previous holder unreachable" --force
```

Then tell them, so they pull before they carry on.

### "My push was rejected"

Somebody pushed while you were working. Do this, never `--force`:

```bash
git pull --rebase
```

Then read what changed, make sure your work still makes sense on top of theirs, and
push again. If the rebase reports a conflict and you are not confident, stop and ask.
A conflict resolved wrongly is worse than a delayed change.

### "The live site is broken right now"

Do not try to fix forward under pressure. Roll back first, diagnose second:

1. Open the Vercel dashboard for this project.
2. Find the last deployment that was working.
3. Use **Promote to Production** on that deployment.

The site is healthy again within a minute. Now you can take your time finding the actual
problem locally.

---

## Before you push, every time

Run the site locally and look at it. This catches the large majority of problems:

```bash
npm run dev
```

For anything beyond a copy change, also confirm it actually builds. Vercel runs this
exact command, so if it fails here it will fail there:

```bash
npm run build
```

---

## What each of us owns

Keeping to these boundaries means most sessions do not compete for the baton at all.

| Area | Files | Usually |
| --- | --- | --- |
| Words on existing pages | `app/**/page.tsx` | Either |
| Essays and articles | `content/essays/`, `lib/essays.ts` | Jayburtt |
| Course catalogue | `lib/courses.ts` | Jayburtt |
| Layout, components, styling | `components/`, `app/globals.css` | Nevin |
| Forms, database, email | `app/api/`, `lib/email/`, `lib/supabase/`, `supabase/` | Nevin |
| Redirects and config | `next.config.ts`, `package.json` | Nevin |

Adding a course or an essay is deliberately data-only. See the "Adding a course" section
in [`README.md`](README.md). No new files, no layout work, low risk.

---

## Things that are never okay

- `git push --force` to `main`. It deletes other people's commits. There is no situation
  on this project that requires it.
- Committing secrets. API keys, the Supabase service role key, and the admin password
  live in Vercel's environment variables, never in a file in this repository.
- Editing files directly on github.com. It commits straight to `main` and bypasses both
  the baton and the hook.
- Pushing something you have not seen running locally.
