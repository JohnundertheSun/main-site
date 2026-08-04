import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Books & Ideas — Jayburtt Dijkhoff",
  description:
    "Books, essays and reflections on rights, systems and what it means to be human inside them — written in clear language, for everyone.",
};

const ARTICLES = [
  {
    tag: "Health",
    tagBg: "#ece0cb",
    tagColor: "#5a4a30",
    title: "Low Risk Is Never Zero Risk: What Aruba Must Know About Hantavirus",
  },
  {
    tag: "Health",
    tagBg: "#ece0cb",
    tagColor: "#5a4a30",
    title: "Extreme Heat Is Coming: How to Prepare Before It Arrives",
  },
  {
    tag: "Reflection",
    tagBg: "#f2ded2",
    tagColor: "#a1462a",
    title: "The Elephant Was Never Pink. It Was Always White.",
  },
  {
    tag: "Law",
    tagBg: "#dde7e3",
    tagColor: "#1a6b5c",
    title: "What AruBIG Recognition Actually Requires",
  },
  {
    tag: "Law",
    tagBg: "#dde7e3",
    tagColor: "#1a6b5c",
    title: "Governance Across the Kingdom: Where Dutch and Caribbean Rules Meet",
  },
  {
    tag: "Reflection",
    tagBg: "#f2ded2",
    tagColor: "#a1462a",
    title: "Reading Your Rights: A Plain-Language Primer",
  },
];

export default function BooksAndIdeasPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "90px 24px 50px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Books &amp; Ideas
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
            Written to be understood.
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--color-muted)" }}>
            Books, essays and reflections on rights, systems, and what it means to be human
            inside them — in clear language, for everyone.
          </p>
        </div>
      </section>

      {/* THE BOOK */}
      <section className="reveal" style={{ padding: "40px 24px 100px" }}>
        <div
          className="container grid-2"
          style={{
            maxWidth: 1040,
            display: "grid",
            gridTemplateColumns: "0.5fr 1fr",
            gap: 56,
            alignItems: "start",
            background: "var(--color-offwhite)",
            borderRadius: 28,
            padding: 48,
            boxShadow: "0 20px 50px #00000012",
          }}
        >
          <div className="img-zoom" style={{ borderRadius: 14 }}>
            <Image
              src="/images/book-cover.webp"
              alt="Derechonan di Pashent book cover"
              width={640}
              height={1024}
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 14, boxShadow: "0 20px 40px #00000022" }}
            />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, margin: "0 0 10px" }}>
              Derechonan di Pashent
            </h2>
            <div style={{ fontSize: 14, color: "var(--color-faint)", marginBottom: 22 }}>
              by Dr. Jayburtt J. Dijkhoff
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3a352c", margin: "0 0 18px" }}>
              A clear-language guide to patient rights in Aruba, written so every reader — not
              just legal or medical professionals — can command their place in the healthcare
              system.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3a352c", margin: "0 0 30px" }}>
              Drawing on real cases and lived experience, the book walks through the rights every
              patient holds, how to exercise them, and where to turn when a system falls short.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600 }}>$20.00</div>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ padding: "14px 30px", fontSize: 15, boxShadow: "0 8px 18px #c65a3540" }}
              >
                Order a Copy
              </Link>
            </div>
            <div style={{ fontSize: 13, color: "var(--color-faint)" }}>
              Available in Papiamento, with English translation notes.
            </div>
          </div>
        </div>
      </section>

      {/* NEXT BOOK */}
      <section className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d9f3ec", marginBottom: 16 }}>
            Coming Next
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            A collection of poetry and reflection.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e3f5f0", margin: "0 0 24px" }}>
            A second book is in progress — more personal and more artistic, exploring systems,
            dignity, and what it means to be human within them.
          </p>
          <Link href="/contact" style={{ fontSize: 14.5, fontWeight: 600, color: "white", textDecoration: "underline" }}>
            Get notified when it&apos;s out →
          </Link>
        </div>
      </section>

      {/* ESSAYS */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container" style={{ marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Essays &amp; Reflections
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: 0 }}>
            Health. Law. Reflection.
          </h2>
        </div>
        <div
          className="container grid-3 reveal reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}
        >
          {ARTICLES.map((post) => (
            <article
              key={post.title}
              className="card-hover"
              style={{ background: "var(--color-offwhite)", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 32px #00000012" }}
            >
              <div className="article-thumb" style={{ width: "100%", height: 180 }}>
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
