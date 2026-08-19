import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssay } from "@/lib/essays";
import { blogDatabaseConfigured, getEssayStats } from "@/lib/blog/engagement";

const MAX_VISITOR_ID = 64;

/**
 * Likes are keyed on a random visitor id the browser generates and keeps in
 * localStorage. It identifies a device so the same reader cannot inflate the
 * count, and it is not tied to any personal data.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!getEssay(slug)) {
    return NextResponse.json({ ok: false, error: "Unknown post." }, { status: 404 });
  }
  if (!blogDatabaseConfigured()) {
    return NextResponse.json({ ok: true, likes: 0, liked: false });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { visitorId, liked } = (payload ?? {}) as Record<string, unknown>;
  if (typeof visitorId !== "string" || !visitorId.trim() || visitorId.length > MAX_VISITOR_ID) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const wantsLike = liked !== false;

  try {
    const supabase = getSupabaseServerClient();

    if (wantsLike) {
      // The primary key makes a repeat like a no-op rather than an error, so
      // the counter only moves when the row is genuinely new.
      const { data, error } = await supabase
        .from("essay_likes")
        .upsert(
          { essay_slug: slug, visitor_id: visitorId },
          { onConflict: "essay_slug,visitor_id", ignoreDuplicates: true }
        )
        .select("visitor_id");
      if (error) throw error;
      if (data && data.length > 0) {
        await supabase.rpc("increment_essay_stat", {
          slug,
          column_name: "likes",
          delta: 1,
        });
      }
    } else {
      const { data, error } = await supabase
        .from("essay_likes")
        .delete()
        .eq("essay_slug", slug)
        .eq("visitor_id", visitorId)
        .select("visitor_id");
      if (error) throw error;
      if (data && data.length > 0) {
        await supabase.rpc("increment_essay_stat", {
          slug,
          column_name: "likes",
          delta: -1,
        });
      }
    }

    const stats = await getEssayStats(slug);
    return NextResponse.json({ ok: true, likes: stats.likes, liked: wantsLike });
  } catch (error) {
    console.error("like", error);
    return NextResponse.json({ ok: false, error: "Could not register that." }, { status: 500 });
  }
}
