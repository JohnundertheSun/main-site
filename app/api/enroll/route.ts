import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getCourse } from "@/lib/courses";
import { notifyNewSignup } from "@/lib/email/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_PHONE = 60;
const MAX_NOTES = 5000;
const MAX_ORGANIZATION = 300;
const MAX_REASON = 200;
const MAX_SOURCE_PATH = 300;

/** Human-readable name for a program slug, used in email subjects and bodies. */
function programLabel(program: string): string {
  if (program === "contact") return "Contact enquiry";
  if (program === "course-agenda") return "Course agenda signup";
  return getCourse(program)?.title ?? program;
}

/**
 * True when Supabase rejected the write because a column does not exist.
 *
 * PostgREST reports an unknown column as PGRST204; Postgres itself uses 42703.
 * The message check is a belt-and-braces fallback for older versions that
 * return neither code.
 */
function isMissingColumnError(error: { code?: string; message?: string }): boolean {
  if (error.code === "PGRST204" || error.code === "42703") return true;
  const message = error.message?.toLowerCase() ?? "";
  return message.includes("column") && (message.includes("does not exist") || message.includes("schema cache"));
}

/** Trims a string field, or returns null when absent or blank. */
function optionalText(value: unknown, max: number): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") return undefined; // signals invalid
  if (value.length > max) return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { program, name, email, phone, notes, organization, reason, sourcePath } = (body ??
    {}) as Record<string, unknown>;

  if (typeof program !== "string" || !program.trim()) {
    return NextResponse.json({ ok: false, error: "Missing program." }, { status: 400 });
  }
  if (typeof name !== "string" || !name.trim() || name.trim().length > MAX_NAME) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.trim().length > MAX_EMAIL) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const cleanPhone = optionalText(phone, MAX_PHONE);
  if (cleanPhone === undefined) {
    return NextResponse.json({ ok: false, error: "Invalid phone number." }, { status: 400 });
  }

  const cleanNotes = optionalText(notes, MAX_NOTES);
  if (cleanNotes === undefined) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  const cleanOrganization = optionalText(organization, MAX_ORGANIZATION);
  if (cleanOrganization === undefined) {
    return NextResponse.json({ ok: false, error: "Invalid organization." }, { status: 400 });
  }

  const cleanReason = optionalText(reason, MAX_REASON);
  if (cleanReason === undefined) {
    return NextResponse.json({ ok: false, error: "Invalid reason." }, { status: 400 });
  }

  const cleanSourcePath = optionalText(sourcePath, MAX_SOURCE_PATH);
  if (cleanSourcePath === undefined) {
    return NextResponse.json({ ok: false, error: "Invalid source path." }, { status: 400 });
  }

  const record = {
    program: program.trim(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: cleanPhone,
    notes: cleanNotes,
    organization: cleanOrganization,
    reason: cleanReason,
    source_path: cleanSourcePath,
  };

  try {
    const supabase = getSupabaseServerClient();

    let { data, error } = await supabase
      .from("program_signups")
      .insert(record)
      .select("id")
      .single();

    // The columns added in 20260811120000 may not exist yet if the code has
    // deployed but the migration has not been applied. Rather than losing the
    // submission, fall back to the columns that have always been there and let
    // the extras ride along in notes. Once the migration runs, this never
    // triggers again.
    if (error && isMissingColumnError(error)) {
      console.warn(
        "program_signups is missing the newer columns; falling back. " +
          "Apply supabase/migrations/20260811120000_extend_signups_and_email_log.sql."
      );

      const legacyNotes = [
        record.reason ? `Reason: ${record.reason}` : null,
        record.organization ? `Organization: ${record.organization}` : null,
        record.source_path ? `From page: ${record.source_path}` : null,
        record.notes ? `\n${record.notes}` : null,
      ]
        .filter((line) => line !== null)
        .join("\n");

      ({ data, error } = await supabase
        .from("program_signups")
        .insert({
          program: record.program,
          name: record.name,
          email: record.email,
          phone: record.phone,
          notes: legacyNotes || null,
        })
        .select("id")
        .single());
    }

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // The signup is saved at this point. Email is a side effect that must not
    // be able to fail the request — notifyNewSignup swallows its own errors and
    // records them in email_log.
    await notifyNewSignup(data?.id ?? null, {
      program: record.program,
      programLabel: programLabel(record.program),
      name: record.name,
      email: record.email,
      phone: record.phone,
      organization: record.organization,
      reason: record.reason,
      notes: record.notes,
      sourcePath: record.source_path,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enroll route error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
