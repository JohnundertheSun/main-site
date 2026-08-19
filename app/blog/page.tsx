import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EssayCard from "@/components/blog/EssayCard";
import {
  ESSAYS,
  activeCategories,
  activeTags,
  essaysInCategory,
} from "@/lib/essays";

export const metadata: Metadata = {
  title: "Blog — Jayburtt Dijkhoff",
  description:
    "Essays on patient rights, governance and power in Aruba — in Papiamento and English, written in clear language for everyone.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const essays = [...ESSAYS].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = essays;
  const categories = activeCategories();
  const tags = activeTags();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "84px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Blog
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5.5vw, 52px)",
              lineHeight: 1.12,
              fontWeight: 700,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Ideas that move people and systems.
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--color-muted)" }}>
            Essays on patient rights, governance and power in Aruba — in Papiamento and English,
            written so anyone can use them.
          </p>
        </div>
      </section>

      {/* CATEGORY NAV */}
      <nav
        aria-label="Categories"
        style={{ padding: "0 24px 40px", display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 900,
          }}
        >
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "var(--color-ink)",
              color: "white",
              fontSize: 13.5,
              fontWeight: 600,
            }}
          >
            All posts ({ESSAYS.length})
          </span>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid var(--color-cream-line)",
                background: "var(--color-offwhite)",
                color: "var(--color-ink)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {category.label} ({essaysInCategory(category.slug).length})
            </Link>
          ))}
        </div>
      </nav>

      {/* LEAD POST */}
      {lead && (
        <section className="reveal" style={{ padding: "0 24px 50px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <EssayCard essay={lead} />
          </div>
        </section>
      )}

      {/* THE ARCHIVE */}
      <section className="reveal" style={{ padding: "0 24px 70px" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 26,
          }}
        >
          {rest.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
        </div>
      </section>

      {/* TAGS */}
      {tags.length > 0 && (
        <section style={{ padding: "0 24px 90px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                margin: "0 0 18px",
              }}
            >
              Browse by topic
            </h2>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center" }}>
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  style={{
                    padding: "7px 15px",
                    borderRadius: 999,
                    background: "var(--color-cream)",
                    color: "var(--color-muted)",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  #{tag.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
