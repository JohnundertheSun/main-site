import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Arts — Jayburtt Dijkhoff" };

const VERSES = [
  "On dignity, on distance, on the space between what a system promises and what it delivers.",
  "Written between clinics and courtrooms, for anyone who has ever felt unheard by the systems meant to protect them.",
];

export default function ArtsPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section
        className="container grid-2"
        style={{
          padding: "80px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr",
          gap: 56,
          alignItems: "center",
          maxWidth: 1284,
          marginInline: "auto",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 18 }}>
            Beyond the Systems
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5vw, 48px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 22px",
            }}
          >
            Poetry, music, and other reflections.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 460 }}>
            The same questions that drive Jayburtt&apos;s professional work, dignity, systems, what
            it means to be human inside them, find a different voice here.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: "-16px 16px 16px -16px",
              border: "2px solid #c65a3540",
              borderRadius: 24,
              zIndex: 0,
            }}
          />
          <Image
            src="/images/portrait-arts.png"
            alt="Jayburtt Dijkhoff"
            width={1024}
            height={1024}
            style={{
              width: "100%",
              height: 440,
              objectFit: "cover",
              borderRadius: 24,
              position: "relative",
              zIndex: 1,
              boxShadow: "0 24px 48px #00000022",
            }}
          />
        </div>
      </section>

      {/* POETRY */}
      <section style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div className="container">
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16, textAlign: "center" }}>
            Poetry
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white", textAlign: "center", margin: "0 0 48px" }}>
            Selected Verses
          </h2>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {VERSES.map((verse) => (
              <div key={verse} style={{ background: "#2a251a", borderRadius: 20, padding: 36 }}>
                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, lineHeight: 1.8, color: "#e8e3d6", margin: "0 0 18px" }}>
                  {verse}
                </p>
                <div style={{ fontSize: 13, color: "#a8a49a" }}>From an upcoming collection</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MUSIC TEASER */}
      <section style={{ padding: "90px 24px" }}>
        <div
          className="container grid-2"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}
        >
          <div
            className="article-thumb"
            style={{ width: "100%", height: 360, borderRadius: 24, boxShadow: "0 20px 44px #00000018" }}
          >
            Photo: music / studio
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
              Coming Soon
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, margin: "0 0 18px" }}>
              Music is next.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", margin: "0 0 26px", maxWidth: 440 }}>
              Jayburtt is developing original music that carries the same voice as his poetry into
              sound. Follow along to be first to hear it.
            </p>
            <Link
              href="/insights"
              className="btn"
              style={{ padding: "14px 30px", background: "var(--color-teal)", color: "white", fontSize: 15, boxShadow: "0 8px 18px #2f8f7e40" }}
            >
              Follow the Journey
            </Link>
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section style={{ background: "var(--color-cream)", padding: "0 24px 100px" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "var(--color-offwhite)",
            borderRadius: 24,
            padding: 44,
            textAlign: "center",
            boxShadow: "0 16px 36px #00000012",
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--color-faint)", marginBottom: 10 }}>
            A note from Jayburtt
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, lineHeight: 1.7 }}>
            The systems I study by day are made of people. The poetry is how I remember that, and
            how I hope you will too.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
