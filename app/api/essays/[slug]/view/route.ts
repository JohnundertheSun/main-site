import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssay } from "@/lib/essays";
import { blogDatabaseConfigured } from "@/lib/blog/engagement";

/**
 * View beacon, fired once per article per browser session. It answers "which
 * essays are people actually reading", which is the number that tells Jayburtt
 * what to write next. Nothing about the reader is stored — only the count.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!getEssay(slug) || !blogDatabaseConfigured()) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = getSupabaseServerClient();
    await supabase.rpc("increment_essay_stat", { slug, column_name: "views", delta: 1 });
  } catch (error) {
    // A missed view must never surface to the reader.
    console.error("view beacon", error);
  }

  return NextResponse.json({ ok: true });
}
