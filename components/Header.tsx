"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/in-house-training", label: "In-House Training" },
  { href: "/performances", label: "Performances" },
  { href: "/blog", label: "Blog" },
  { href: "/books-and-ideas", label: "Books & Ideas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
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
        onClick={() => setOpen(false)}
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

      <nav className="main-nav" style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${active ? " is-active" : ""}`}
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

      {/* NOTE: an EN/NL toggle belongs here, but only once Dutch translations
          actually exist. A switch that does not switch reads as a broken site,
          so it is deliberately omitted rather than faked. */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="btn btn-primary header-cta"
          style={{ padding: "13px 28px", fontSize: 14, whiteSpace: "nowrap" }}
        >
          Book Jayburtt
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className={`hamburger${open ? " is-open" : ""}`}
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
          <span className="hamburger-line" style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
          <span className="hamburger-line" style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
          <span className="hamburger-line" style={{ display: "block", width: 22, height: 2, background: "var(--color-ink)" }} />
        </button>
      </div>

      <nav className={`mobile-nav${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
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
        </div>
      </nav>
    </header>
  );
}
