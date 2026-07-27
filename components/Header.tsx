"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/speaking", label: "Speaking" },
  { href: "/books", label: "Books" },
  { href: "/arts", label: "Arts" },
  { href: "/consulting", label: "Consulting" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        borderBottom: "1px solid var(--color-cream-line)",
        position: "sticky",
        top: 0,
        background: "#f5ecdcf5",
        backdropFilter: "blur(8px)",
        zIndex: 10,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--color-ink)",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        Jayburtt Dijkhoff
      </Link>

      <nav className="main-nav" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                fontSize: 13.5,
                fontWeight: active ? 600 : 500,
                color: active ? "var(--color-accent)" : "var(--color-ink)",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link
          href="/contact"
          className="btn btn-primary header-cta"
          style={{ padding: "13px 28px", fontSize: 14, whiteSpace: "nowrap" }}
        >
          Book Jayburtt
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="hamburger"
          onClick={() => setOpen((v) => !v)}
          style={{
            flexDirection: "column",
            justifyContent: "center",
            gap: 5,
            width: 32,
            height: 32,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
        </button>
      </div>

      {open && (
        <nav
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--color-cream)",
            borderBottom: "1px solid var(--color-cream-line)",
            display: "flex",
            flexDirection: "column",
            padding: "12px 24px 20px",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--color-ink)",
                padding: "10px 0",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
