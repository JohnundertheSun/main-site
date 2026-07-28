-- Program enrollment interest (pre-checkout signups).
-- Payment is handled manually via Wix Payment Links for now; this table
-- just captures who's interested so there's something to work from.
create table if not exists program_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  program text not null,
  name text not null,
  email text not null,
  phone text,
  status text not null default 'new', -- new -> contacted -> paid -> enrolled
  notes text
);

create index if not exists program_signups_program_idx on program_signups (program);
create index if not exists program_signups_created_at_idx on program_signups (created_at desc);

-- Row Level Security: all access goes through the Next.js server using the
-- service role key, which bypasses RLS. No anon/public policies are defined,
-- so the table is unreachable from the browser or any anon key.
alter table program_signups enable row level security;
