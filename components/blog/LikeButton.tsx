"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

const VISITOR_KEY = "jd_visitor_id";

/**
 * Whether this device has already liked this post.
 *
 * useSyncExternalStore rather than an effect: localStorage is browser-only, so
 * this renders unliked on the server and settles on the stored value during
 * hydration, instead of flashing through a second render.
 */
function useStoredLike(slug: string): [boolean, (liked: boolean) => void] {
  const key = `jd_liked_${slug}`;

  const subscribe = useCallback((onChange: () => void) => {
    // Fires when another tab likes the same post.
    window.addEventListener("storage", onChange);
    return () => window.removeEventListener("storage", onChange);
  }, []);

  const stored = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) === "1",
    () => false
  );

  // This tab's own writes do not raise a storage event, so they are tracked here.
  const [local, setLocal] = useState<boolean | null>(null);

  const set = useCallback(
    (liked: boolean) => {
      localStorage.setItem(key, liked ? "1" : "0");
      setLocal(liked);
    },
    [key]
  );

  return [local ?? stored, set];
}

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
  const [liked, setLiked] = useStoredLike(slug);
  const [busy, setBusy] = useState(false);

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
