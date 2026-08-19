import "server-only";
import { createHash } from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssayBody } from "@/lib/essays";

/**
 * Reader-facing blog data: comments, like and view counts, admin edits and PDF
 * attachments.
 *
 * Every function here degrades to an empty/neutral result when Supabase is not
 * configured or its migration has not been run yet. That is deliberate: a
 * missing table must never take an article page down, because the article
 * itself is a static file that does not need the database at all.
 */

export type Comment = {
  id: string;
  createdAt: string;
  essaySlug: string;
  authorName: string;
  body: string;
  status: "pending" | "published" | "trash";
};

export type Attachment = {
  id: string;
  label: string;
  publicUrl: string;
  sizeBytes: number | null;
};

export type EssayStats = {
  views: number;
  likes: number;
};

function isMissingTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  if (error.code === "42P01" || error.code === "PGRST205") return true;
  const message = error.message?.toLowerCase() ?? "";
  return message.includes("does not exist") || message.includes("schema cache");
}

/** True when the database is reachable; false disables every feature quietly. */
export function blogDatabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export async function listPublishedComments(slug: string): Promise<Comment[]> {
  if (!blogDatabaseConfigured()) return [];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_comments")
      .select("id, created_at, essay_slug, author_name, body, status")
      .eq("essay_slug", slug)
      .eq("status", "published")
      .order("created_at", { ascending: true });
    if (error) {
      if (!isMissingTable(error)) console.error("listPublishedComments", error);
      return [];
    }
    return (data ?? []).map(rowToComment);
  } catch (error) {
    console.error("listPublishedComments", error);
    return [];
  }
}

export async function listCommentsForModeration(
  status: "pending" | "published" | "trash"
): Promise<Comment[]> {
  if (!blogDatabaseConfigured()) return [];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_comments")
      .select("id, created_at, essay_slug, author_name, body, status")
      .eq("status", status)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      if (!isMissingTable(error)) console.error("listCommentsForModeration", error);
      return [];
    }
    return (data ?? []).map(rowToComment);
  } catch (error) {
    console.error("listCommentsForModeration", error);
    return [];
  }
}

export async function countCommentsByStatus(): Promise<Record<string, number>> {
  if (!blogDatabaseConfigured()) return {};
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("essay_comments").select("status");
    if (error) return {};
    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
      const status = (row as { status: string }).status;
      counts[status] = (counts[status] ?? 0) + 1;
    }
    return counts;
  } catch {
    return {};
  }
}

function rowToComment(row: Record<string, unknown>): Comment {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    essaySlug: String(row.essay_slug),
    authorName: String(row.author_name),
    body: String(row.body),
    status: row.status as Comment["status"],
  };
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export async function getEssayStats(slug: string): Promise<EssayStats> {
  if (!blogDatabaseConfigured()) return { views: 0, likes: 0 };
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_stats")
      .select("views, likes")
      .eq("essay_slug", slug)
      .maybeSingle();
    if (error || !data) return { views: 0, likes: 0 };
    return { views: Number(data.views ?? 0), likes: Number(data.likes ?? 0) };
  } catch {
    return { views: 0, likes: 0 };
  }
}

export async function getAllEssayStats(): Promise<Record<string, EssayStats>> {
  if (!blogDatabaseConfigured()) return {};
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("essay_stats").select("essay_slug, views, likes");
    if (error) return {};
    const out: Record<string, EssayStats> = {};
    for (const row of data ?? []) {
      out[String(row.essay_slug)] = {
        views: Number(row.views ?? 0),
        likes: Number(row.likes ?? 0),
      };
    }
    return out;
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Overrides and attachments
// ---------------------------------------------------------------------------

export type EssayOverride = {
  title: string | null;
  excerpt: string | null;
  body: string | null;
};

export async function getEssayOverride(slug: string): Promise<EssayOverride | null> {
  if (!blogDatabaseConfigured()) return null;
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_overrides")
      .select("title, excerpt, body")
      .eq("essay_slug", slug)
      .maybeSingle();
    if (error || !data) return null;
    return {
      title: (data.title as string) ?? null,
      excerpt: (data.excerpt as string) ?? null,
      body: (data.body as string) ?? null,
    };
  } catch {
    return null;
  }
}

/**
 * The body to render: an admin edit if one exists, otherwise the markdown file
 * committed to the repository.
 */
export async function resolveEssayBody(slug: string): Promise<string | null> {
  const override = await getEssayOverride(slug);
  if (override?.body && override.body.trim()) return override.body;
  return getEssayBody(slug);
}

export async function listAttachments(slug: string): Promise<Attachment[]> {
  if (!blogDatabaseConfigured()) return [];
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_attachments")
      .select("id, label, public_url, size_bytes")
      .eq("essay_slug", slug)
      .order("created_at", { ascending: true });
    if (error) {
      if (!isMissingTable(error)) console.error("listAttachments", error);
      return [];
    }
    return (data ?? []).map((row) => ({
      id: String(row.id),
      label: String(row.label),
      publicUrl: String(row.public_url),
      sizeBytes: row.size_bytes === null ? null : Number(row.size_bytes),
    }));
  } catch {
    return [];
  }
}
