import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssay } from "@/lib/essays";
import {
  blogDatabaseConfigured,
  hashIp,
  listPublishedComments,
} from "@/lib/blog/engagement";

const MAX_NAME = 80;
const MAX_EMAIL = 320;
const MAX_BODY = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const comments = await listPublishedComments(slug);
  return NextResponse.json({
    ok: true,
    comments: comments.map((c) => ({
      id: c.id,
      author: c.authorName,
      body: c.body,
      createdAt: c.createdAt,
    })),
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!getEssay(slug)) {
    return NextResponse.json({ ok: false, error: "Unknown post." }, { status: 404 });
  }
  if (!blogDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Comments are not available right now." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, body, website } = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: a real person never fills a field the stylesheet hides. Answer
  // as if it worked, so a bot gets no signal about why nothing appeared.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true, status: "pending" });
  }

  if (typeof name !== "string" || !name.trim() || name.trim().length > MAX_NAME) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (typeof body !== "string" || !body.trim()) {
    return NextResponse.json({ ok: false, error: "Please write a comment." }, { status: 400 });
  }
  if (body.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "That comment is too long." }, { status: 400 });
  }

  let cleanEmail: string | null = null;
  if (typeof email === "string" && email.trim()) {
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > MAX_EMAIL) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    cleanEmail = trimmed;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : null;

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("essay_comments").insert({
      essay_slug: slug,
      author_name: name.trim(),
      author_email: cleanEmail,
      body: body.trim(),
      status: "pending",
      ip_hash: hashIp(ip),
    });
    if (error) {
      console.error("comment insert", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your comment. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("comment insert", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your comment. Please try again." },
      { status: 500 }
    );
  }

  // Held for moderation rather than published immediately — see the migration.
  return NextResponse.json({ ok: true, status: "pending" });
}
