<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Two people work on this repository

This site has more than one collaborator, and both of them use AI coding agents.
Every push to `main` deploys to the live site immediately.

**Before pushing anything to `main`, read [COLLABORATION.md](COLLABORATION.md) and
follow it.** In particular:

- The repository uses a baton in [`ACTIVE-WORK.md`](ACTIVE-WORK.md). Only the named
  holder may push to `main`. Claim it with `bash scripts/claim.sh "reason"` and hand it
  back with `bash scripts/release.sh`.
- A `pre-push` hook in `.githooks/` enforces this. If a push is blocked, read the
  message and do what it says. Never work around the hook, and never disable it.
- **Never `git push --force` to `main`.** It deletes the other collaborator's commits.
  If a push is rejected, the fix is `git pull --rebase`, then re-check the work.
- Never commit secrets. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` and
  `ADMIN_PASSWORD` live in Vercel's environment variables. `.env.local` is gitignored;
  `.env.example` documents the names only.
- Run `npm run build` before pushing anything beyond a copy change. Vercel runs the
  same command, so a failure here is a broken deployment there.

Commits on this project are authored under a shared identity so that deploys keep
working. Collaborators are told apart by the `collab.who` git config value, not by
commit email.
