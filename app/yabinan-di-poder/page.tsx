import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Yabinan di Poder — Jayburtt Dijkhoff",
  description:
    "Yabinan di Poder (Keys of Power): a self-paced online program teaching Aruban citizens how to understand their rights and get real movement on their case, from Jayburtt Dijkhoff, PhD.",
};

const LEARN = [
  {
    title: "Assume your position",
    body: "Concrete, practical steps to get real movement on your case, right away, not someday.",
  },
  {
    title: "Know your rights",
    body: "As a citizen, understand exactly what you can and can't be asked to accept, and where the line actually is.",
  },
  {
    title: "Read the power dynamics",
    body: "See clearly how government, healthcare, and institutional systems actually make decisions, so you stop guessing.",
  },
  {
    title: "Get the maximum benefit",
    body: "Turn what you know into results: heard requests, resolved cases, and a system that finally responds.",
  },
];

export default function YabinanDiPoderPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "90px 24px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Online Program · Self-Paced
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 60px)",
              lineHeight: 1.1,
              fontWeight: 700,
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}
          >
            🔑 Yabinan di Poder
          </h1>
          <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, color: "var(--color-muted)", marginBottom: 26 }}>
            Keys of Power
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)", maxWidth: 580, margin: "0 auto 38px" }}>
            Concrete, practical steps to know your rights as a citizen, and to get real movement
            on your case, from Jayburtt Dijkhoff, PhD.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
              Enroll Now — AWG 50
            </Link>
            <span style={{ fontSize: 13.5, color: "var(--color-faint)" }}>One-time payment · Lifetime access</span>
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "70px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)" }}>
            Originally taught live across Aruba as an in-person masterclass and an online
            workshop, <strong>Yabinan di Poder</strong> is now available as a self-paced online
            program, pre-recorded, so you can learn it whenever it works for you.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What You&apos;ll Learn
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              Saca e maximo probecho di bo derecho.
            </h2>
            <p style={{ fontSize: 15, color: "var(--color-faint)", marginTop: 10 }}>
              Get the maximum benefit from your rights.
            </p>
          </div>
          <div className="grid-4 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {LEARN.map((l) => (
              <div key={l.title} className="method-card" style={{ background: "var(--color-cream)", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 10px" }}>{l.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR + FORMAT */}
      <section className="reveal" style={{ background: "var(--color-navy)", padding: "90px 24px" }}>
        <div className="container grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 16 }}>
              Who It&apos;s For
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
              Anyone facing a system with more power than they have.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#c3d2e4" }}>
              Government offices, healthcare institutions, insurance, employers: if you&apos;ve
              ever felt unheard by a system that was supposed to serve you, this program gives you
              a concrete way to get heard and get results.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 16 }}>
              Format
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
              Fully online, entirely at your own pace.
            </h2>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Pre-recorded video modules", "Watch on any device, anytime", "Taught in Papiamento", "Lifetime access after purchase"].map((item) => (
                <li key={item} style={{ fontSize: 15, color: "#c3d2e4" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div
          className="container grid-2"
          style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "0.6fr 1fr", gap: 48, alignItems: "center" }}
        >
          <div className="img-zoom" style={{ borderRadius: 24 }}>
            <Image
              src="/images/portrait-speaking.png"
              alt="Jayburtt Dijkhoff"
              width={640}
              height={688}
              style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 24, boxShadow: "0 24px 48px #00000022" }}
            />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Your Instructor
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, margin: "0 0 14px" }}>
              Jayburtt Dijkhoff, PhD
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--color-muted)" }}>
              A speaker, author, and quality-systems expert who spent years inside healthcare and
              government, Jayburtt built Yabinan di Poder from the same lived experience behind{" "}
              <em>Derechonan di Pashent</em>: knowing exactly how these systems work, from the
              inside.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING / ENROLL */}
      <section className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 14px" }}>
            Get your keys of power.
          </h2>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 700, color: "white", margin: "0 0 6px" }}>
            AWG 50
          </div>
          <p style={{ fontSize: 14.5, color: "#e3f5f0", marginBottom: 30 }}>One-time payment · Lifetime access</p>
          <Link
            href="/contact"
            className="btn btn-white"
            style={{ padding: "16px 34px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
          >
            Enroll Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
