# Where the site stands

Working notes for whoever picks this up next — a human or an AI agent. Read
this before starting, and update it when you finish something.

For push rules see [COLLABORATION.md](COLLABORATION.md). For how the site is
put together see [README.md](README.md).

Last updated: 19 August 2026.

---

## The two things that matter right now

1. **The blog had to work properly.** Done and live.
2. **Yabinan di Poder had to be launchable.** Done, but the pay link needs one
   manual click to confirm — see "Needs your eyes" below.

---

## What is live

**The essay archive is complete.** All 17 posts carry their full text. Fourteen
of them previously showed only an excerpt and a "being migrated" notice. The
bodies were pulled from the Wix Blog API and converted from ricos JSON to
markdown in `content/essays/`, keeping headings, bold, italic, links, lists,
blockquotes, images and galleries.

Two posts (`the-elephant-was-never-pink-hospitals-fusion-aruba` and
`mi-pareha-ta-controlami-y-mi-whatsapp-kico-mi-por-haci`) came back over the
API's response ceiling. Their tails were recovered separately and reattached,
and both were read end to end against the live Wix post. If you re-run any
sync, do not let it silently overwrite these two with a truncated version.

**There is a real blog section**, not a list inside Books & Ideas:

- `/blog` — everything newest first, latest post given room at the top
- `/blog/category/<slug>` and `/blog/tag/<slug>` — archives, same slugs as Wix
- Related reading at the end of each article
- `BlogPosting` structured data, and the archives are in the sitemap

The old `/blog → /books-and-ideas` redirect was removed. Left in place it
shadowed the entire new section. Books & Ideas keeps the book.

**Comments, likes and view counts** work the way they did on Wix. Comments
arrive `pending` and appear only once approved at `/admin/comments` — these
posts name institutions and discuss live disputes, so nothing publishes
unread. A hidden honeypot field absorbs bots without putting a captcha in
front of a real reader. `/admin/blog` ranks posts by what people actually
read.

**Yabinan di Poder can take money.** A Wix pay link exists, and both the
confirmation screen and the confirmation email lead with it, so a buyer can
finish immediately instead of waiting for a manual follow-up.

---

## Needs your eyes

**Test the pay link once:** <https://www.jayburttdijkhoff.com/_paylink/AaAYh9zO>

It should forward to Wix and bring up CX Pay for AWG 50. This could not be
verified from the build environment, which cannot reach either host. Please
click it before promoting the course.

Why the redirect exists: the domain now resolves to Vercel, but checkout still
runs on Wix because that is where CX Pay is connected. The rule in
`next.config.ts` forwards `/_paylink/*` to the Wix-hosted address of the same
site. It is marked temporary on purpose and comes out when checkout moves here.

---

## Still to build

### 1. Admin essay editor and PDF uploads — mostly done

Jayburtt's work revolves around documents (petitions, letters, rulings), so
posts need PDFs attached, and a correction should not require a deploy.

Already committed and working:

- `essay_overrides` and `essay_attachments` tables
- `POST /api/admin/essays` — saves an edit as an override row, or reverts it
- `POST/DELETE /api/admin/attachments` — uploads a PDF to Supabase Storage
  (bucket `essay-attachments`, created on first upload), records it, deletes it
- `app/admin/essays/[slug]/EssayEditor.tsx` — the editor UI: markdown textarea,
  save, revert, PDF upload, insert-link-at-cursor
- Article pages already render attached PDFs in a "Documents" block

**What is missing: the page that renders the editor.** Create
`app/admin/essays/page.tsx` (a list of posts) and
`app/admin/essays/[slug]/page.tsx`, which should load the essay, call
`resolveEssayBody(slug)` and `listAttachments(slug)` from
`lib/blog/engagement.ts`, and pass them into `EssayEditor`. Follow the layout
of `app/admin/comments/page.tsx`. Then link it from the other admin headers.

An override row wins over the markdown file on disk. The file stays the
default, so reverting is a delete rather than a rewrite.

### 2. Wix sync script for future posts

Right now a new post written in the Wix editor has to be migrated by hand.
Build `scripts/sync-wix-blog.mjs` that pulls published posts and regenerates
the markdown plus the catalogue entries.

A working ricos-to-markdown converter was written during the migration but
lived in a scratch directory and is gone with the container. It is
straightforward to rebuild: walk `richContent.nodes`, handle `PARAGRAPH`,
`HEADING`, `BULLETED_LIST`, `ORDERED_LIST`, `BLOCKQUOTE`, `DIVIDER`, `IMAGE`,
`GALLERY`, `FILE`, `VIDEO`, and render `TEXT` nodes with their `decorations`
(`BOLD`, `ITALIC`, `LINK`).

Two traps worth knowing before you start:

- **Responses are capped.** Query one post at a time; a whole-blog query with
  `RICH_CONTENT` gets truncated. Even single posts can overflow — the fallback
  is a brace-scanner that salvages complete top-level nodes and stops at the
  first incomplete one, then fills the tail from the `CONTENT_TEXT` fieldset.
- **Slugs must not change.** The Wix slugs are already shared on Facebook and
  `/post/<slug>` redirects onto them.

Authentication: the script needs a Wix API key
(<https://manage.wix.com/account/api-keys>) in `WIX_API_KEY`, plus the site id
below. Document it in the README and `.env.example` when you build it.

### 3. Move essay cover images off Wix

`lib/essay-images.json` is still `{}`, so every cover image still loads from
`static.wixstatic.com`. The archive depends on that Wix account continuing to
exist. `scripts/migrate-essay-images.mjs` already exists and does this — it
just has not been run. Run it before the Wix account is closed.

---

## Reference

| Thing | Value |
| --- | --- |
| Wix site id | `89cc9ca3-992c-4043-a601-9f122920e0f0` |
| Wix fallback host (still serves the site) | `optimizeyourvibe.wixsite.com/site` |
| Supabase project | `jtubwqcrqvlpbscsoraz` ("Jayburtt Dijkhoff") |
| Pay link id | `235d2632-f313-4906-9e71-a7fb907ec8b1`, AWG 50 |
| Pay link path | `/_paylink/AaAYh9zO` |

The blog engagement migration
(`supabase/migrations/20260819090000_create_blog_engagement.sql`) **has been
applied** to the Supabase project above. All five tables and the
`increment_essay_stat` function are in place.

Everything that touches the database degrades to empty when Supabase is
unreachable. Keep it that way: an article is a static file that does not need
the database, and a pending migration must never take one down.

### Wix taxonomy ids

Needed to map a synced post onto the categories and tags in `lib/essays.ts`.

Categories:

| Wix id | slug |
| --- | --- |
| `35991131-917f-4421-9566-cb057ca078ce` | healthcare-patients-rights |
| `646ff13d-b6c3-4d2e-b659-954a35678995` | autonomy-and-governance |
| `b1aac073-8e96-45bb-a404-fdefb6e80322` | aruba-society |
| `375e1744-46d0-4396-b918-ef03f62170a2` | power-leadership |
| `521a4108-8ad8-4e7a-af39-a8f4b98c4aac` | entre-luz-y-sombra |
| `b03adcdb-3c94-4b5a-adc5-ca445d23fcd0` | opinion-reflection |

Tags:

| Wix id | slug |
| --- | --- |
| `38f8e0e1-b3a3-47dc-bc00-1618ca62bd04` | papiamento |
| `0b6fc592-843f-45a5-a53f-fd4d19ec494d` | governance |
| `1e62d220-9a44-462a-8243-74e68f779fa7` | patients-rights |
| `1e3ab3b4-3171-4779-835e-a15dab2ac9a0` | aruba |
| `b3641950-5387-407c-9dd7-cc79d7501b1f` | healthcare |
| `e05a6d7f-e279-4129-ba9c-d88f133e99b4` | autonomy |
| `32514ab1-941d-4b76-b40e-2b6f0257f186` | english |
| `d032e562-d409-4c41-a91f-e6a53b347fb4` | leadership |
