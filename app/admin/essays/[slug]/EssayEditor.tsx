"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export type ExistingAttachment = {
  id: string;
  label: string;
  publicUrl: string;
};

export default function EssayEditor({
  slug,
  initialBody,
  hasOverride,
  attachments,
}: {
  slug: string;
  initialBody: string;
  /** True when an admin edit is already in force over the committed file. */
  hasOverride: boolean;
  attachments: ExistingAttachment[];
}) {
  const router = useRouter();
  const [body, setBody] = useState(initialBody);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  async function save() {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, body }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setMessage(json.error || "Could not save.");
        setStatus("error");
        return;
      }
      setStatus("saved");
      router.refresh();
    } catch {
      setMessage("Could not save.");
      setStatus("error");
    }
  }

  async function revert() {
    if (!confirm("Discard your edits and go back to the published version?")) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, reset: true }),
      });
      const json = await res.json();
      if (json.ok) {
        setBody(json.body ?? "");
        setStatus("saved");
        router.refresh();
      } else {
        setMessage(json.error || "Could not revert.");
        setStatus("error");
      }
    } catch {
      setMessage("Could not revert.");
      setStatus("error");
    }
  }

  /** Inserts a markdown link at the cursor, so an upload lands where you were typing. */
  function insertAtCursor(text: string) {
    const el = textarea.current;
    if (!el) {
      setBody((b) => `${b}\n\n${text}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    setBody((b) => b.slice(0, start) + text + b.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + text.length;
    });
  }

  async function upload(file: File, label: string) {
    setUploading(true);
    setMessage("");
    try {
      const data = new FormData();
      data.set("slug", slug);
      data.set("file", file);
      if (label) data.set("label", label);
      const res = await fetch("/api/admin/attachments", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setMessage(json.error || "Upload failed.");
        setStatus("error");
        return;
      }
      // The file is listed under the article automatically. Dropping a link in
      // the text as well means it can also be cited at the point it is discussed.
      insertAtCursor(`[📄 ${json.label}](${json.url})`);
      router.refresh();
    } catch {
      setMessage("Upload failed.");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  }

  async function removeAttachment(id: string) {
    if (!confirm("Remove this document? Any link to it stops working.")) return;
    await fetch("/api/admin/attachments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  const button = {
    padding: "11px 22px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    border: "1px solid var(--color-cream-line)",
    background: "white",
  } as const;

  return (
    <div style={{ display: "grid", gap: 26 }}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <label htmlFor="essay-body" style={{ fontSize: 13, fontWeight: 600 }}>
            Article text (Markdown)
          </label>
          <span style={{ fontSize: 12.5, color: "var(--color-faint)" }}>
            {hasOverride
              ? "Edited here — this version is live, not the one in the repository."
              : "Showing the published version."}
          </span>
        </div>
        <textarea
          id="essay-body"
          ref={textarea}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setStatus("idle");
          }}
          rows={26}
          spellCheck={false}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 18,
            borderRadius: 12,
            border: "1px solid var(--color-cream-line)",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            resize: "vertical",
          }}
        />
        <p style={{ fontSize: 12.5, color: "var(--color-faint)", margin: "8px 0 0", lineHeight: 1.6 }}>
          <strong>##</strong> starts a heading, <strong>**bold**</strong>, <strong>_italic_</strong>,{" "}
          <strong>&gt;</strong> for a pull quote, <strong>-</strong> for a list.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          style={{
            ...button,
            background: "var(--color-teal)",
            color: "white",
            borderColor: "transparent",
          }}
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {hasOverride && (
          <button type="button" onClick={revert} style={button}>
            Revert to published version
          </button>
        )}
        {status === "saved" && (
          <span style={{ fontSize: 13.5, color: "var(--color-teal)", fontWeight: 600 }}>
            Saved. The article is updated.
          </span>
        )}
        {status === "error" && (
          <span style={{ fontSize: 13.5, color: "var(--color-accent-dark)" }}>{message}</span>
        )}
      </div>

      {/* PDF ATTACHMENTS */}
      <div
        style={{
          borderTop: "1px solid var(--color-cream-line)",
          paddingTop: 24,
        }}
      >
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, margin: "0 0 6px" }}>
          Documents
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--color-muted)", margin: "0 0 18px", lineHeight: 1.6 }}>
          Attach the petition, letter or ruling a post is about. Each one is listed under the
          article, and a link is dropped into your text where the cursor was.
        </p>

        {attachments.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 10 }}>
            {attachments.map((file) => (
              <li
                key={file.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid var(--color-cream-line)",
                  background: "var(--color-offwhite)",
                }}
              >
                <a
                  href={file.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)" }}
                >
                  📄 {file.label}
                </a>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => insertAtCursor(`[📄 ${file.label}](${file.publicUrl})`)}
                    style={{ ...button, padding: "7px 14px", fontSize: 13 }}
                  >
                    Insert link
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAttachment(file.id)}
                    style={{
                      ...button,
                      padding: "7px 14px",
                      fontSize: 13,
                      color: "var(--color-accent-dark)",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const file = data.get("file");
            if (!(file instanceof File) || !file.size) {
              setMessage("Choose a PDF first.");
              setStatus("error");
              return;
            }
            await upload(file, String(data.get("label") ?? ""));
            form.reset();
          }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}
        >
          <div style={{ flex: "1 1 240px" }}>
            <label htmlFor="attachment-label" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              What is it? <span style={{ color: "var(--color-faint)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="attachment-label"
              name="label"
              type="text"
              placeholder="Peticion na Parlamento, 5 augustus 2026"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 15px",
                borderRadius: 10,
                border: "1px solid var(--color-cream-line)",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ flex: "1 1 240px" }}>
            <label htmlFor="attachment-file" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              PDF
            </label>
            <input
              id="attachment-file"
              name="file"
              type="file"
              accept="application/pdf"
              style={{ fontSize: 14, fontFamily: "inherit" }}
            />
          </div>
          <button type="submit" disabled={uploading} style={button}>
            {uploading ? "Uploading…" : "Upload PDF"}
          </button>
        </form>
      </div>
    </div>
  );
}
