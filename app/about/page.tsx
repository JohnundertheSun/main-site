import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Jayburtt Dijkhoff",
  description:
    "Dr. Jayburtt Dijkhoff — educator, author, speaker and performer. Teaching at scale, training in depth, art in public.",
};

const PILLARS = [
  { label: "Teaching at scale", body: "Short courses that reach people wherever they are." },
  { label: "Training in depth", body: "In-house programmes that change how a team works." },
  { label: "Art in public", body: "Poetry, music and performance, on a stage." },
  { label: "Consulting by invitation", body: "Selective, premium, clearly bounded." },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section
        className="container grid-2"
        style={{
          padding: "80px 24px",
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1284,
          marginInline: "auto",
        }}
      >
        <div className="img-zoom" style={{ borderRadius: 24 }}>
          <Image
            src="/images/portrait-speaking.png"
            alt="Dr. Jayburtt Dijkhoff"
            width={640}
            height={688}
            style={{
              width: "100%",
              height: 500,
              objectFit: "contain",
              background: "var(--color-cream)",
              borderRadius: 24,
              boxShadow: "0 24px 48px #00000022",
            }}
          />
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            About
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5vw, 44px)",
              fontWeight: 700,
              margin: "0 0 20px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            I teach what I learned from the inside.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              margin: "0 0 26px",
            }}
          >
            Educator, author, speaker and performer — working on health, law and human rights so
            that people can navigate them with confidence.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["PhD, Health Sciences", "Published Author", "Featured on TV"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 16px",
                  background: "var(--color-offwhite)",
                  borderRadius: 999,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#5a4a30",
                  boxShadow: "0 4px 10px #00000010",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONAL STORY */}
      <section className="reveal" style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 90px" }}>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: "#3a352c", margin: "0 0 24px" }}>
          I spent years inside the systems I now teach about — in government, in healthcare
          regulation, and in the rooms where the rules actually get written. I learned how those
          systems make decisions, where they fail people, and how much of that failure is simply
          a matter of nobody explaining the rules in language a normal person can use.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: "#3a352c", margin: "0 0 24px" }}>
          That is the work now. Not advising institutions from the inside, but teaching people
          directly: short courses they can follow at their own pace, training days that change
          how a team operates, books written so anyone can read them.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: "#3a352c", margin: "0 0 24px" }}>
          And alongside it, the art. Poetry, music, storytelling, cabaret. Not a hobby on the
          side of a serious career — the same questions in a different voice, and the part that
          keeps the rest of it human. The systems I study are made of people. The art is how I
          remember that.
        </p>
        <p style={{ fontSize: 17.5, lineHeight: 1.85, color: "#3a352c", margin: 0 }}>
          The thread running through all of it is the same: when people understand the systems
          around them, they can make better decisions, resolve their issues, and reach their
          goals.
        </p>
      </section>

      {/* THE MODEL */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              How I Work
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: 0 }}>
              Teaching at scale. Training in depth. Art in public.
            </h2>
          </div>
          <div
            className="container grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {PILLARS.map((p) => (
              <div key={p.label} className="credential-card" style={{ background: "#2a251a", borderRadius: 20, padding: 26 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 8 }}>
                  {p.label}
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a8a49a" }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "90px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            The Mission
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 20px", lineHeight: 1.3 }}>
            Stronger systems for the ABC islands.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", margin: 0 }}>
            Part of this work is personal: pushing for accountability, oversight and better
            outcomes across Aruba, Bonaire and Curaçao — so that patients are protected and
            practitioners are supported.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, margin: "0 0 22px" }}>
          Want to work together?
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/courses" className="btn btn-primary" style={{ padding: "15px 30px", fontSize: 15 }}>
            Explore Courses
          </Link>
          <Link href="/contact" className="btn btn-secondary" style={{ padding: "15px 30px", fontSize: 15 }}>
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
