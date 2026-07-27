import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = { title: "Insights — Jayburtt Dijkhoff" };

const CATEGORIES = [
  { label: "All", bg: "var(--color-ink)", color: "white" },
  { label: "Health", bg: "#ece0cb", color: "#5a4a30" },
  { label: "Law", bg: "#dde7e3", color: "#1a6b5c" },
  { label: "Reflection", bg: "#f2ded2", color: "#a1462a" },
];

const ARTICLES = [
  { tag: "Health", tagBg: "#ece0cb", tagColor: "#5a4a30", title: "Low Risk Is Never Zero Risk: What Aruba Must Know About Hantavirus" },
  { tag: "Health", tagBg: "#ece0cb", tagColor: "#5a4a30", title: "Extreme Heat Is Coming: How to Prepare Before It Arrives" },
  { tag: "Reflection", tagBg: "#f2ded2", tagColor: "#a1462a", title: "The Elephant Was Never Pink. It Was Always White." },
  { tag: "Law", tagBg: "#dde7e3", tagColor: "#1a6b5c", title: "What AruBIG Recognition Actually Requires" },
  { tag: "Law", tagBg: "#dde7e3", tagColor: "#1a6b5c", title: "Governance Across the Kingdom: Where Dutch and Caribbean Rules Meet" },
  { tag: "Reflection", tagBg: "#f2ded2", tagColor: "#a1462a", title: "Reading Your Rights: A Plain-Language Primer" },
];

export default function InsightsPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "80px 24px 40px", maxWidth: 760, marginInline: "auto" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          The Blog
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 5vw, 46px)",
            lineHeight: 1.12,
            fontWeight: 700,
            margin: "0 0 20px",
          }}
        >
          Ideas that help you take back control.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)" }}>
          Straight talk on healthcare, law, and human rights, written so you can act on it, not
          just read it.
        </p>
      </section>

      <section
        className="container"
        style={{ padding: "20px 24px 40px", display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {CATEGORIES.map((c) => (
          <span
            key={c.label}
            style={{
              padding: "7px 16px",
              background: c.bg,
              color: c.color,
              borderRadius: 16,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {c.label}
          </span>
        ))}
      </section>

      <section
        className="container grid-3"
        style={{ padding: "0 24px 90px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}
      >
        {ARTICLES.map((post) => (
          <article
            key={post.title}
            className="card-hover"
            style={{ background: "var(--color-offwhite)", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 32px #00000012" }}
          >
            <div className="article-thumb" style={{ width: "100%", height: 190 }}>
              Article image
            </div>
            <div style={{ padding: 26 }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  background: post.tagBg,
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  color: post.tagColor,
                  marginBottom: 12,
                }}
              >
                {post.tag}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
                {post.title}
              </h3>
              <a href="#" className="text-link" style={{ fontSize: 13.5 }}>
                Read More →
              </a>
            </div>
          </article>
        ))}
      </section>

      <section style={{ background: "var(--color-ink)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 30px" }}>
          Follow the Journey
        </h2>
        <NewsletterForm />
      </section>

      <Footer />
    </div>
  );
}
