"use client";

import { useEffect, useState } from "react";

const VISITOR_KEY = "jd_visitor_id";

/** A stable random id for this browser, used so one device counts once. */
function visitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export default function LikeButton({
  slug,
  initialLikes,
}: {
  slug: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`jd_liked_${slug}`) === "1");
  }, [slug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const next = !liked;
    // Move the number immediately; the server response corrects it if needed.
    setLiked(next);
    setLikes((n) => Math.max(0, n + (next ? 1 : -1)));
    try {
      const res = await fetch(`/api/essays/${encodeURIComponent(slug)}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorId(), liked: next }),
      });
      const json = await res.json();
      if (json.ok && typeof json.likes === "number") setLikes(json.likes);
      localStorage.setItem(`jd_liked_${slug}`, next ? "1" : "0");
    } catch {
      // Roll back to what the reader saw before the click.
      setLiked(!next);
      setLikes((n) => Math.max(0, n + (next ? -1 : 1)));
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Remove your like" : "Like this article"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 999,
        border: `1px solid ${liked ? "var(--color-accent-dark)" : "var(--color-cream-line)"}`,
        background: liked ? "var(--color-accent-dark)" : "transparent",
        color: liked ? "white" : "var(--color-ink)",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 160ms ease, color 160ms ease, border-color 160ms ease",
      }}
    >
      <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
      {likes > 0 ? likes : "Like"}
    </button>
  );
}
