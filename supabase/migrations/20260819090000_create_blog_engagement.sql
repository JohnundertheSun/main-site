-- Blog engagement: comments, likes, views, and editable essay content.
--
-- The essays themselves ship as markdown in content/essays/. This migration
-- adds the parts that must change without a deploy: reader comments, the like
-- and view counters, admin edits to a post's body, and PDF attachments.
--
-- Every table is written to be idempotent so it is safe to paste into the SQL
-- editor twice.

-- ---------------------------------------------------------------------------
-- Comments
-- ---------------------------------------------------------------------------
-- Comments arrive as 'pending' and only appear on the site once approved from
-- /admin/comments. That ordering is deliberate: this blog covers named
-- institutions and live legal disputes, so nothing reaches the public page
-- before a human has read it.
create table if not exists essay_comments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  essay_slug text not null,
  author_name text not null,
  author_email text,
  body text not null,
  status text not null default 'pending',
  -- Kept for rate limiting and abuse handling, never rendered publicly.
  ip_hash text,
  constraint essay_comments_status_check
    check (status in ('pending', 'published', 'trash'))
);

create index if not exists essay_comments_slug_status_idx
  on essay_comments (essay_slug, status, created_at desc);
create index if not exists essay_comments_status_idx
  on essay_comments (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Likes and views
-- ---------------------------------------------------------------------------
-- One row per essay, incremented atomically. Counters live in their own table
-- rather than on the comment rows so a view beacon never contends with a
-- comment write.
create table if not exists essay_stats (
  essay_slug text primary key,
  views bigint not null default 0,
  likes bigint not null default 0,
  updated_at timestamptz not null default now()
);

-- Individual like events, so a reader can un-like and so the same visitor
-- cannot inflate the count. visitor_id is a random id generated in the
-- browser; it identifies a device, never a person.
create table if not exists essay_likes (
  essay_slug text not null,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  primary key (essay_slug, visitor_id)
);

create or replace function increment_essay_stat(slug text, column_name text, delta bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- column_name is validated against a fixed allowlist rather than
  -- interpolated blind, so this cannot become an injection point.
  if column_name not in ('views', 'likes') then
    raise exception 'unsupported stat column: %', column_name;
  end if;

  insert into essay_stats (essay_slug) values (slug)
  on conflict (essay_slug) do nothing;

  if column_name = 'views' then
    update essay_stats
       set views = greatest(0, views + delta), updated_at = now()
     where essay_slug = slug;
  else
    update essay_stats
       set likes = greatest(0, likes + delta), updated_at = now()
     where essay_slug = slug;
  end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- Editable essay content and attachments
-- ---------------------------------------------------------------------------
-- An override row wins over the markdown file on disk, so Jayburtt can correct
-- a post from /admin/essays without a deploy. Absent a row, the file is used,
-- which keeps the repository the default source of truth.
create table if not exists essay_overrides (
  essay_slug text primary key,
  title text,
  excerpt text,
  body text,
  updated_at timestamptz not null default now()
);

-- PDFs (petitions, letters, rulings) attached to a post and listed under the
-- article. The file itself lives in Supabase Storage; this row is the record
-- of what it is and where it belongs.
create table if not exists essay_attachments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  essay_slug text not null,
  label text not null,
  storage_path text not null,
  public_url text not null,
  size_bytes bigint,
  content_type text
);

create index if not exists essay_attachments_slug_idx
  on essay_attachments (essay_slug, created_at);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Every read and write goes through the Next.js server using the service role
-- key, which bypasses RLS. No anon policies are defined, so none of these
-- tables are reachable from the browser or with a publishable key.
alter table essay_comments enable row level security;
alter table essay_stats enable row level security;
alter table essay_likes enable row level security;
alter table essay_overrides enable row level security;
alter table essay_attachments enable row level security;
