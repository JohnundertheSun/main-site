import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer
        style={{
          padding: "60px 72px 36px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 44,
          background: "var(--color-cream)",
        }}
        className="grid-4"
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--color-ink)",
              marginBottom: 14,
            }}
          >
            Jayburtt Dijkhoff
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-faint)", maxWidth: 280 }}>
            Educator, author, speaker and performer. Teaching at scale, training in depth, art in
            public.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", marginBottom: 16 }}>
            Explore
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <Link href="/courses" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              Courses
            </Link>
            <Link href="/in-house-training" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              In-House Training
            </Link>
            <Link href="/performances" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              Performances &amp; Speaking
            </Link>
            <Link href="/books-and-ideas" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              Books &amp; Ideas
            </Link>
            <Link href="/about" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              About
            </Link>
            <Link href="/advisory" className="text-link" style={{ fontSize: 14.5, color: "var(--color-muted)" }}>
              Advisory (by invitation)
            </Link>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", marginBottom: 16 }}>
            Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5, color: "var(--color-muted)" }}>
            <div>+297 566 7805</div>
            <div>info@jayburttdijkhoff.com</div>
            <div>Oranjestad, Aruba</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", marginBottom: 16 }}>
            Follow
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <a href="#" className="text-link">
              LinkedIn
            </a>
            <a href="#" className="text-link">
              Instagram
            </a>
            <a href="#" className="text-link">
              Facebook
            </a>
          </div>
        </div>
      </footer>
      <div
        style={{
          borderTop: "1px solid var(--color-cream-line)",
          padding: "22px 72px",
          textAlign: "center",
          fontSize: 12.5,
          color: "var(--color-faint)",
          background: "var(--color-cream)",
        }}
      >
        © 2026 Jayburtt Dijkhoff · Privacy Policy · Cookie Policy
      </div>
    </>
  );
}
