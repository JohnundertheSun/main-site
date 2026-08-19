import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";

const COOKIE_NAME = "admin_auth";
const STATUSES = new Set(["pending", "published", "trash"]);

/**
 * Moderation actions. The proxy already gates /admin pages, but an API route
 * is not covered by that matcher, so the session cookie is checked here too —
 * otherwise anyone who guessed the path could publish comments.
 */
async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { id, status } = (payload ?? {}) as Record<string, unknown>;
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ ok: false, error: "Missing comment id." }, { status: 400 });
  }
  if (typeof status !== "string" || !STATUSES.has(status)) {
    return NextResponse.json({ ok: false, error: "Unsupported status." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("essay_comments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
