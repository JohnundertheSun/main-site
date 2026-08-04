import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Performances & Speaking — Jayburtt Dijkhoff",
  description:
    "Artistic performances, lectures, poetry, music, storytelling and cabaret concepts that bring ideas and human experience to life — plus keynotes and lecture-performances for conferences and events.",
};

const WORK = [
  {
    title: "Poetry",
    body: "Written between clinics and courtrooms, for anyone who has ever felt unheard by the systems meant to protect them.",
    color: "var(--color-accent)",
  },
  {
    title: "Music",
    body: "Original work that carries the same voice as the poetry into sound.",
    color: "var(--color-teal)",
  },
  {
    title: "Storytelling",
    body: "True stories from inside institutions, told so an audience feels what a case file cannot convey.",
    color: "var(--color-navy)",
  },
  {
    title: "Cabaret",
    body: "Sharp, funny, uncomfortable — using humour to say the things a formal setting will not allow.",
    color: "var(--color-accent)",
  },
];

const TALKS = [
  {
    n: "01",
    color: "var(--color-accent)",
    title: "Lecture-Performance",
    body: "A hybrid form: the rigour of a lecture with the staging, rhythm and emotional truth of a performance.",
  },
  {
    n: "02",
    color: "var(--color-teal)",
    title: "Keynotes",
    body: "High-energy talks for conferences and large audiences, on rights, systems and human dignity.",
  },
  {
    n: "03",
    color: "var(--color-navy)",
    title: "Public Lectures",
    body: "Accessible sessions for a general audience, in Papiamento, Dutch or English.",
  },
];

export default function PerformancesPage() {
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
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Experience
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 50px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 22px",
              letterSpacing: "-0.02em",
            }}
          >
            Ideas and human experience, brought to life.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 470, margin: "0 0 30px" }}>
            Artistic performances, lectures, poetry, music and storytelling. The same questions
            that drive the teaching, carried in a different voice — and put in front of an
            audience.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            Book a Performance
          </Link>
        </div>
        <div className="img-zoom" style={{ borderRadius: 24 }}>
          <Image
            src="/images/portrait-arts.png"
            alt="Jayburtt Dijkhoff"
            width={1024}
            height={1024}
            style={{ width: "100%", height: 440, objectFit: "cover", borderRadius: 24, boxShadow: "0 24px 48px #00000022" }}
          />
        </div>
      </section>

      {/* THE ARTISTIC WORK */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              The Work
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white" }}>
              Four forms, one voice.
            </h2>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {WORK.map((w) => (
              <SpotlightCard key={w.title} className="talk-card" style={{ background: "#2a251a", borderRadius: 20, padding: 30 }}>
                <div style={{ width: 34, height: 3, borderRadius: 3, background: w.color, marginBottom: 18 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "white", margin: "0 0 10px" }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#a8a49a" }}>{w.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED VERSE */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "90px 24px" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "var(--color-offwhite)",
            borderRadius: 24,
            padding: 48,
            textAlign: "center",
            boxShadow: "0 16px 36px #00000012",
          }}
        >
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--color-faint)", marginBottom: 14 }}>
            A note from Jayburtt
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 21, lineHeight: 1.7, margin: 0 }}>
            The systems I study by day are made of people. The poetry is how I remember that, and
            how I hope you will too.
          </p>
        </div>
      </section>

      {/* SPEAKING FORMATS */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Speaking
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              For stages, conferences and public audiences.
            </h2>
          </div>
          <div
            className="grid-3 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {TALKS.map((t) => (
              <div
                key={t.n}
                className="offering-card"
                style={{ background: "var(--color-offwhite)", borderRadius: 20, padding: 32, boxShadow: "0 12px 28px #00000010" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: t.color, marginBottom: 12 }}>
                  {t.n}
                </div>
                <h3 style={{ fontSize: 17.5, fontWeight: 600, margin: "0 0 10px" }}>{t.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--color-muted)" }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="reveal" style={{ padding: "20px 24px 90px", textAlign: "center" }}>
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
      <section className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            Bring the work to your stage.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#e3f5f0", margin: "0 0 30px" }}>
            Festivals, conferences, cultural venues, institutions and public events — across the
            ABC islands, the Netherlands, and beyond.
          </p>
          <Link
            href="/contact"
            className="btn btn-white"
            style={{ padding: "16px 34px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
          >
            Enquire About Booking
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
