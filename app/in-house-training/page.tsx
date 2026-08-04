import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "In-House Training — Jayburtt Dijkhoff",
  description:
    "In-house courses, workshops and customized learning programs for teams and professional organizations — from a short masterclass to a full training day or a series of sessions.",
};

const FORMATS = [
  {
    title: "Masterclass",
    duration: "2–3 hours",
    body: "A focused session on a single theme. Ideal as a strong opening to a team day or a stand-alone learning moment.",
  },
  {
    title: "Half-Day Training",
    duration: "4 hours",
    body: "Theory plus applied practice, with room for your team's own cases and questions.",
  },
  {
    title: "Full Training Day",
    duration: "1 day",
    body: "A complete programme with depth, exercises and competency-building your team can put to work immediately.",
  },
  {
    title: "Multi-Session Programme",
    duration: "A series",
    body: "Several sessions spread over weeks or months, so learning is reinforced rather than delivered once and forgotten.",
  },
];

const AUDIENCE = [
  {
    title: "NGOs & Foundations",
    body: "Mission-driven organizations that need their people to understand the policy and governance landscape they operate in.",
  },
  {
    title: "Public Bodies & Authorities",
    body: "Government-adjacent institutions — tourism, social insurance, healthcare and regulatory bodies — working inside complex mandates.",
  },
  {
    title: "Trade Unions",
    body: "Sindicato and worker representatives who need to read policy, structure and leadership dynamics with confidence.",
  },
  {
    title: "Change Makers",
    body: "Teams and individuals trying to move something inside a system that was not designed to move quickly.",
  },
];

const THEMES = [
  {
    title: "Understanding Policy",
    body: "How policy is actually written, interpreted and applied — and how to read what a document really commits an organization to.",
  },
  {
    title: "Leadership Structures",
    body: "How authority, mandate and accountability are distributed in an organization, and what that means for getting decisions made.",
  },
  {
    title: "Risk Management",
    body: "Identifying and managing organizational, compliance and legal risk — one important piece of the picture, not the whole of it.",
  },
  {
    title: "Rights & Governance",
    body: "The rules that govern institutions and the people inside them, across the Kingdom and the Dutch Caribbean.",
  },
];

const HOW = [
  {
    n: "01",
    title: "Tell me about your team",
    body: "What they do, what they're running into, and what needs to be different afterwards.",
  },
  {
    n: "02",
    title: "Choose or adapt a programme",
    body: "Book an existing course as it stands, or have it reshaped around your organization's reality.",
  },
  {
    n: "03",
    title: "Delivered on site or online",
    body: "In your building or fully remote, across the Netherlands and the Dutch Caribbean.",
  },
];

export default function InHouseTrainingPage() {
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
            Train Your Organization
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
            Training that fits your team, not a template.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 470, margin: "0 0 30px" }}>
            In-house courses, workshops and customized learning programs for teams and
            professional organizations. Book an existing course, or have one adapted around the
            work your people actually do.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            Request a Proposal
          </Link>
        </div>
        <div className="img-zoom" style={{ borderRadius: 24 }}>
          <Image
            src="/images/portrait-speaking.png"
            alt="Jayburtt Dijkhoff delivering a training"
            width={640}
            height={688}
            style={{
              width: "100%",
              height: 440,
              objectFit: "contain",
              background: "var(--color-cream)",
              borderRadius: 24,
              boxShadow: "0 24px 48px #00000022",
            }}
          />
        </div>
      </section>

      {/* FORMATS */}
      <section className="reveal" style={{ background: "var(--color-offwhite)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Formats
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              From a few hours to a full programme.
            </h2>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {FORMATS.map((f) => (
              <div key={f.title} className="method-card" style={{ background: "var(--color-cream)", borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 10 }}>
                  {f.duration}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white" }}>
              Three steps to a programme that fits.
            </h2>
          </div>
          <div
            className="grid-3 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
          >
            {HOW.map((h) => (
              <SpotlightCard key={h.n} className="talk-card" style={{ background: "#2a251a", borderRadius: 20, padding: 30 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--color-accent)", marginBottom: 12 }}>
                  {h.n}
                </div>
                <h3 style={{ fontSize: 17.5, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{h.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#a8a49a" }}>{h.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* WHO I WORK WITH */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Who I Work With
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              Built for people moving something inside a system.
            </h2>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {AUDIENCE.map((a) => (
              <div
                key={a.title}
                className="offering-card"
                style={{ background: "var(--color-offwhite)", borderRadius: 20, padding: 30, boxShadow: "0 12px 28px #00000010" }}
              >
                <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 10px" }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THEMES */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Themes
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              What we can work on together.
            </h2>
          </div>
          <div
            className="grid-2 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 900, margin: "0 auto" }}
          >
            {THEMES.map((t) => (
              <div
                key={t.title}
                className="method-card"
                style={{ background: "var(--color-offwhite)", borderRadius: 20, padding: 30 }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, margin: "0 0 10px" }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--color-muted)" }}>{t.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 640, margin: "0 auto 26px" }}>
              Every course in the public catalogue can also be delivered in-house — adapted so the
              examples, cases and language come from your own sector.
            </p>
            <Link href="/courses" className="btn btn-secondary" style={{ padding: "15px 30px", fontSize: 15 }}>
              Browse the Course Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            Let&apos;s design something for your team.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#e3f5f0", margin: "0 0 30px" }}>
            Tell me about your organization and what you want your people to walk away with, and
            you&apos;ll get a concrete proposal back.
          </p>
          <Link
            href="/contact"
            className="btn btn-white"
            style={{ padding: "16px 34px", color: "var(--color-teal-dark)", fontSize: 15, boxShadow: "0 8px 18px #00000020" }}
          >
            Request a Proposal
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
