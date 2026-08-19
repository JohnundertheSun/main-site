"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommentActions({
  id,
  status,
}: {
  id: string;
  status: "pending" | "published" | "trash";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(next: "pending" | "published" | "trash") {
    setBusy(true);
    try {
      await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const button = {
    padding: "7px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: busy ? "wait" : "pointer",
    fontFamily: "inherit",
    border: "1px solid var(--color-cream-line)",
    background: "white",
  } as const;

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {status !== "published" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => setStatus("published")}
          style={{ ...button, background: "var(--color-teal)", color: "white", borderColor: "transparent" }}
        >
          Publish
        </button>
      )}
      {status !== "pending" && (
        <button type="button" disabled={busy} onClick={() => setStatus("pending")} style={button}>
          Unpublish
        </button>
      )}
      {status !== "trash" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => setStatus("trash")}
          style={{ ...button, color: "var(--color-accent-dark)" }}
        >
          Trash
        </button>
      )}
    </div>
  );
}
