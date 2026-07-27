import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Speaking — Jayburtt Dijkhoff" };

const TALKS = [
  {
    n: "01",
    color: "var(--color-accent)",
    title: "The Human Side of Healthcare Systems",
    body: "Why the best quality systems start with dignity, not just compliance, and how to build them.",
  },
  {
    n: "02",
    color: "var(--color-teal)",
    title: "Navigating Recognition Across the Kingdom",
    body: "A practical map for practitioners and institutions working between the ABC islands and the Netherlands.",
  },
  {
    n: "03",
    color: "var(--color-navy)",
    title: "Patient Rights, Reimagined",
    body: "Lessons from Derechonan di Pashent on making rights understandable to everyone.",
  },
];

const FORMATS = [
  { title: "Keynotes", body: "High-energy talks for conferences and large audiences." },
  { title: "Master Classes", body: "Hands-on, deep-dive sessions for teams that need to apply what they learn." },
  { title: "Online Workshops", body: "Fully remote sessions for teams across the Kingdom." },
];

export default function SpeakingPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section
        className="container grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.9fr",
          gap: 56,
          padding: "80px 24px",
          alignItems: "center",
          maxWidth: 1284,
          marginInline: "auto",
        }}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Speaking
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 50px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 22px",
            }}
          >
            Talks that turn complexity into clarity.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 460, margin: "0 0 30px" }}>
            Jayburtt brings doctoral rigor, lived experience, and a storyteller&apos;s instinct to
            keynotes, master classes, and workshops on healthcare, law, and human dignity.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            Check Availability
          </Link>
        </div>
        <Image
          src="/images/portrait-speaking.png"
          alt="Jayburtt Dijkhoff"
          width={640}
          height={688}
          style={{ width: "100%", height: 440, objectFit: "cover", borderRadius: 24, boxShadow: "0 24px 48px #00000022" }}
        />
      </section>

      {/* SIGNATURE TALKS */}
      <section style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 30,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            margin: "0 0 50px",
          }}
        >
          Signature Talks &amp; Master Classes
        </h2>
        <div className="container grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {TALKS.map((talk) => (
            <div key={talk.n} style={{ background: "#2a251a", borderRadius: 20, padding: 28 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: talk.color, marginBottom: 12 }}>
                {talk.n}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{talk.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a8a49a" }}>{talk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMATS */}
      <section style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Formats
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              However your audience learns best.
            </h2>
          </div>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {FORMATS.map((f) => (
              <div
                key={f.title}
                style={{
                  background: "var(--color-offwhite)",
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: "0 12px 28px #00000010",
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-muted)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ padding: "60px 24px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.6, color: "#e0d6c4", marginBottom: 10 }}>
            &ldquo;
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, lineHeight: 1.5, margin: "0 0 16px" }}>
            A rare speaker who makes governance feel personal.
          </p>
          <div style={{ fontSize: 14, color: "var(--color-faint)" }}>Event organizer, healthcare conference</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 20px" }}>
          Bring Jayburtt to your event.
        </h2>
        <Link
          href="/contact"
          className="btn btn-white"
          style={{ padding: "16px 34px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
        >
          Request Speaking Info
        </Link>
      </section>

      <Footer />
    </div>
  );
}
