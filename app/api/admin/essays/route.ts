import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssay, getEssayBody } from "@/lib/essays";
import { isAdminRequest } from "@/lib/blog/admin";

const MAX_TITLE = 300;
const MAX_EXCERPT = 1000;
const MAX_BODY = 200_000;

/**
 * Saves an admin edit of a post.
 *
 * The edit is stored as an override row rather than written back to the
 * markdown file: the site runs on Vercel, where the filesystem is read-only at
 * runtime, and a correction should not need a deploy. The file in the
 * repository stays the default, so reverting an edit is a delete, not a
 * rewrite.
 */
export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { slug, title, excerpt, body, reset } = (payload ?? {}) as Record<string, unknown>;

  if (typeof slug !== "string" || !getEssay(slug)) {
    return NextResponse.json({ ok: false, error: "Unknown post." }, { status: 404 });
  }

  try {
    const supabase = getSupabaseServerClient();

    // Reverting drops the override so the committed markdown takes over again.
    if (reset === true) {
      const { error } = await supabase.from("essay_overrides").delete().eq("essay_slug", slug);
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, reverted: true, body: getEssayBody(slug) ?? "" });
    }

    if (typeof body !== "string" || body.length > MAX_BODY) {
      return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
    }
    if (typeof title === "string" && title.length > MAX_TITLE) {
      return NextResponse.json({ ok: false, error: "Title is too long." }, { status: 400 });
    }
    if (typeof excerpt === "string" && excerpt.length > MAX_EXCERPT) {
      return NextResponse.json({ ok: false, error: "Excerpt is too long." }, { status: 400 });
    }

    const { error } = await supabase.from("essay_overrides").upsert(
      {
        essay_slug: slug,
        title: typeof title === "string" && title.trim() ? title.trim() : null,
        excerpt: typeof excerpt === "string" && excerpt.trim() ? excerpt.trim() : null,
        body,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "essay_slug" }
    );
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
