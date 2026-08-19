"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";

/**
 * Share buttons for an article.
 *
 * WhatsApp comes first deliberately: on Aruba it is where these pieces
 * actually travel, ahead of Facebook and well ahead of X.
 *
 * The canonical URL is shared rather than whatever sits in the address bar,
 * which keeps tracking parameters out of a shared link. SITE_URL already
 * follows preview deployments.
 */
export default function ShareRow({ title, path }: { title: string; path: string }) {
  const url = `${SITE_URL}${path}`;
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      background: "#25D366",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      background: "#1877F2",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      background: "#111111",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      background: "#0A66C2",
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", marginRight: 2 }}>
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 15px",
            borderRadius: 999,
            background: link.background,
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          {link.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        style={{
          padding: "8px 15px",
          borderRadius: 999,
          background: "transparent",
          border: "1px solid var(--color-cream-line)",
          color: "var(--color-ink)",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
