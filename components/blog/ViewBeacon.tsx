"use client";

import { useEffect } from "react";

/**
 * Records one view per article per browser session. sessionStorage rather than
 * localStorage: a reader coming back tomorrow is a genuine second read, but a
 * reader tapping back and forth within one visit is not.
 */
export default function ViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `jd_viewed_${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch(`/api/essays/${encodeURIComponent(slug)}/view`, { method: "POST" }).catch(() => {
      // A missed count is not worth telling the reader about.
    });
  }, [slug]);

  return null;
}
