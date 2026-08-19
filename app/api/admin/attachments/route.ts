import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { getEssay } from "@/lib/essays";
import { ATTACHMENTS_BUCKET, isAdminRequest } from "@/lib/blog/admin";

// Petitions and court letters run long, but a blog attachment has no business
// being larger than this.
const MAX_BYTES = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf"]);

/** Strips a filename down to something safe to use as a storage key. */
function safeName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").slice(0, 80);
  const cleaned = base
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return cleaned || "document";
}

/** Uploads a PDF and records it against a post. */
export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });
  }

  const slug = form.get("slug");
  const file = form.get("file");
  const labelField = form.get("label");

  if (typeof slug !== "string" || !getEssay(slug)) {
    return NextResponse.json({ ok: false, error: "Unknown post." }, { status: 404 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Choose a PDF to upload." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ ok: false, error: "Only PDF files are supported." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "That file is larger than 25 MB." }, { status: 400 });
  }

  const label =
    typeof labelField === "string" && labelField.trim()
      ? labelField.trim().slice(0, 200)
      : file.name.replace(/\.[^.]+$/, "").slice(0, 200);

  // A timestamp keeps re-uploads of the same filename from overwriting each
  // other, so an older link in a published post keeps resolving.
  const path = `${slug}/${Date.now()}-${safeName(file.name)}.pdf`;

  try {
    const supabase = getSupabaseServerClient();

    const { error: bucketError } = await supabase.storage.createBucket(ATTACHMENTS_BUCKET, {
      public: true,
      allowedMimeTypes: ["application/pdf"],
      fileSizeLimit: MAX_BYTES,
    });
    // "already exists" is the expected case after the first upload.
    if (bucketError && !/exist/i.test(bucketError.message)) {
      return NextResponse.json({ ok: false, error: bucketError.message }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(ATTACHMENTS_BUCKET)
      .upload(path, bytes, { contentType: "application/pdf", upsert: false });
    if (uploadError) {
      return NextResponse.json({ ok: false, error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(ATTACHMENTS_BUCKET).getPublicUrl(path);

    const { error: rowError } = await supabase.from("essay_attachments").insert({
      essay_slug: slug,
      label,
      storage_path: path,
      public_url: publicUrl,
      size_bytes: file.size,
      content_type: "application/pdf",
    });
    if (rowError) {
      // Do not leave an orphan file behind if the record could not be written.
      await supabase.storage.from(ATTACHMENTS_BUCKET).remove([path]);
      return NextResponse.json({ ok: false, error: rowError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: publicUrl, label });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Upload failed." },
      { status: 500 }
    );
  }
}

/** Removes an attachment, file and record together. */
export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { id } = (payload ?? {}) as Record<string, unknown>;
  if (typeof id !== "string" || !id) {
    return NextResponse.json({ ok: false, error: "Missing attachment id." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("essay_attachments")
      .select("storage_path")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ ok: false, error: "Attachment not found." }, { status: 404 });
    }

    await supabase.storage.from(ATTACHMENTS_BUCKET).remove([String(data.storage_path)]);
    const { error: deleteError } = await supabase.from("essay_attachments").delete().eq("id", id);
    if (deleteError) {
      return NextResponse.json({ ok: false, error: deleteError.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
