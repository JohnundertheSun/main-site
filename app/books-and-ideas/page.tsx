import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ESSAYS, essayImageUrl } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Books & Ideas — Jayburtt Dijkhoff",
  description:
    "Books, essays and reflections on rights, systems and what it means to be human inside them — written in clear language, for everyone.",
};

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
          {ESSAYS.map((post) => {
            const cover = essayImageUrl(post.image);
            return (
              <Link
                key={post.slug}
                href={`/essays/${post.slug}`}
                className="card-hover"
                style={{
                  background: "var(--color-offwhite)",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 14px 32px #00000012",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover}
                    alt=""
                    style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div className="article-thumb" style={{ width: "100%", height: 180 }} />
                )}
                <div style={{ padding: 26, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background: post.language === "EN" ? "#dde5f0" : "#f2e0d2",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 600,
                        color: post.language === "EN" ? "#17325a" : "#a1462a",
                      }}
                    >
                      {post.language === "EN" ? "English" : "Papiamento"}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--color-faint)" }}>{post.minutes} min</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)", margin: "0 0 16px", flexGrow: 1 }}>
                    {post.excerpt.length > 130 ? post.excerpt.slice(0, 130).trimEnd() + "…" : post.excerpt}
                  </p>
                  <span className="text-link" style={{ fontSize: 13.5 }}>
                    Read More →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
