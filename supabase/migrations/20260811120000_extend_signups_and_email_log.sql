-- Brings the database up to what the site actually collects and sends.
--
-- Safe to run on a project where 20260728000000 has already been applied, and
-- safe to run on an empty project (it recreates the base table first). Every
-- statement is idempotent, so running it twice changes nothing.

-- ---------------------------------------------------------------------------
-- 1. Base table (no-op if 20260728000000 already ran)
-- ---------------------------------------------------------------------------

create table if not exists program_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  program text not null,
  name text not null,
  email text not null,
  phone text,
  status text not null default 'new',
  notes text
);

-- ---------------------------------------------------------------------------
-- 2. Columns the forms collect but had nowhere to go
--
-- The contact form was packing "Reason:" and "Organization:" into the free-text
-- notes field, which made them impossible to filter or count. They get real
-- columns now; notes goes back to being just the visitor's message.
-- ---------------------------------------------------------------------------

alter table program_signups add column if not exists organization text;
alter table program_signups add column if not exists reason text;
alter table program_signups add column if not exists locale text;

-- Which page the form was submitted from, e.g. /courses/yabinan-di-poder.
-- Tells you what is actually converting.
alter table program_signups add column if not exists source_path text;

-- Set by the app whenever a row is touched (see the trigger below).
alter table program_signups add column if not exists updated_at timestamptz not null default now();

-- Follow-up workflow: free-text internal note and who is handling it.
alter table program_signups add column if not exists admin_notes text;
alter table program_signups add column if not exists handled_by text;

-- ---------------------------------------------------------------------------
-- 3. Constrain status to the actual workflow
--
-- Dropped and recreated so re-running picks up any change to the allowed list.
-- Existing rows outside the list are normalised to 'new' first, so adding the
-- constraint can never fail on live data.
-- ---------------------------------------------------------------------------

update program_signups
   set status = 'new'
 where status is null
    or status not in ('new', 'contacted', 'paid', 'enrolled', 'closed');

alter table program_signups drop constraint if exists program_signups_status_check;
alter table program_signups add constraint program_signups_status_check
  check (status in ('new', 'contacted', 'paid', 'enrolled', 'closed'));

-- ---------------------------------------------------------------------------
-- 4. Keep updated_at honest
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists program_signups_set_updated_at on program_signups;
create trigger program_signups_set_updated_at
  before update on program_signups
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. Indexes
-- ---------------------------------------------------------------------------

create index if not exists program_signups_program_idx    on program_signups (program);
create index if not exists program_signups_created_at_idx on program_signups (created_at desc);
create index if not exists program_signups_status_idx     on program_signups (status);
create index if not exists program_signups_email_idx      on program_signups (lower(email));

-- ---------------------------------------------------------------------------
-- 6. Email log
--
-- Every message the site hands to Resend is recorded here: what was sent, to
-- whom, and whether Resend accepted it. When someone says "I never got a
-- confirmation", this is the table that answers it. It also lets the send path
-- stay fire-and-forget — a failed email is recorded rather than thrown away,
-- and never costs the visitor their form submission.
-- ---------------------------------------------------------------------------

create table if not exists email_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Which signup triggered this. Null is allowed so a send can still be logged
  -- if the row it belongs to is later deleted.
  signup_id uuid references program_signups (id) on delete set null,

  -- 'admin_notification' | 'visitor_confirmation'
  kind text not null,

  recipient text not null,
  subject text not null,

  -- 'sent' | 'failed'
  status text not null,

  -- Resend's message id on success; its error message on failure.
  provider_message_id text,
  error text
);

alter table email_log drop constraint if exists email_log_status_check;
alter table email_log add constraint email_log_status_check
  check (status in ('sent', 'failed'));

create index if not exists email_log_signup_id_idx  on email_log (signup_id);
create index if not exists email_log_created_at_idx on email_log (created_at desc);
create index if not exists email_log_status_idx     on email_log (status);

-- ---------------------------------------------------------------------------
-- 7. Row Level Security
--
-- Both tables are reached only by the Next.js server using the service role
-- key, which bypasses RLS. RLS is on with no policies defined, so an anon or
-- publishable key gets nothing — the tables are unreachable from the browser.
-- ---------------------------------------------------------------------------

alter table program_signups enable row level security;
alter table email_log       enable row level security;
