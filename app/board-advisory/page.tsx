import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Board Advisory & Coaching — Jayburtt Dijkhoff",
  description:
    "High-level advisory and coaching for advisory and directive boards: risk mitigation, risk identification, and governance, so organizations lead with control instead of managing risk ad hoc.",
};

const STAKES = [
  {
    title: "Money and control",
    body: "An organization that can't govern its own risk stops being effective, and starts losing money and control over its own direction.",
  },
  {
    title: "Time and energy",
    body: "Without a system, every issue becomes a fire drill. Boards spend their time and energy reacting instead of leading.",
  },
  {
    title: "Talented people",
    body: "Talented employees leave organizations that can't govern themselves. Losing them is often the first sign something deeper is wrong.",
  },
  {
    title: "Growth potential",
    body: "Unmanaged risk doesn't just cause damage, it holds the whole company back from reaching its maximum potential.",
  },
];

const SERVICES = [
  {
    title: "Risk Mitigation",
    body: "Building the structures that keep risk contained before it becomes a crisis.",
    items: ["Legal Risk", "Organizational Risk"],
  },
  {
    title: "Risk Identification",
    body: "Seeing risk clearly, and early, across every part of how the organization operates.",
    items: ["Organizational Risk", "Compliance Risk", "Customer-Service Risk & Reputational Damage"],
  },
  {
    title: "Governance",
    body: "Governance structures and decision-making processes strong enough to hold up under real pressure.",
    items: [],
  },
];

const FORMATS = [
  {
    title: "One-on-One Coaching",
    body: "Direct, confidential coaching for individual directors and executives, including power strategies: reading power dynamics, office politics, and organizational politics, so leaders navigate them deliberately instead of by accident.",
  },
  {
    title: "In-House Training",
    body: "Full-board or top-management sessions, built around your organization's real situation.",
  },
  {
    title: "Retreats",
    body: "Half-day sessions that combine theory with real competency-building, not just a lecture.",
  },
  {
    title: "Mindfulness Coaching",
    body: "Guiding directors with mindfulness practices, so they can lead with clarity under pressure.",
  },
];

const PRICING = [
  {
    title: "Power Strategy Coaching",
    body: "One-on-one coaching on power dynamics, office politics, and organizational politics, in 3 sessions.",
    meta: "3 Sessions",
    price: "$750",
    cta: "Book Now",
  },
  {
    title: "Consulting Call",
    body: "A focused call to talk through a specific risk, governance question, or board challenge.",
    meta: "Single session",
    price: "On request",
    cta: "Request a Quote",
  },
];

const CREDENTIALS = [
  { title: "13 Years", subtitle: "In Government, Various Director Roles" },
  { title: "PhD", subtitle: "Health Sciences, Quality Regulation" },
  { title: "Inspector", subtitle: "Risk-Oriented Supervision" },
  { title: "Head of Institute", subtitle: "Healthcare Quality & Standards" },
];

export default function BoardAdvisoryPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "90px 24px 70px", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            For Boards &amp; Executive Teams
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5.5vw, 54px)",
              lineHeight: 1.12,
              fontWeight: 700,
              margin: "0 0 26px",
              letterSpacing: "-0.02em",
            }}
          >
            Risk management shouldn&apos;t be ad hoc. It should be under your control.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)", maxWidth: 600, margin: "0 auto 38px" }}>
            Jayburtt Dijkhoff is a high-level consultant who guides and coaches advisory and
            directive boards to see the bigger picture, take control of organizational risk, and
            lead instead of react.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            Book a Board Session
          </Link>
        </div>
      </section>

      {/* STAKES */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              The Cost of Ad Hoc Risk
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white" }}>
              When governance fails, everyone pays.
            </h2>
          </div>
          <div className="grid-4 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {STAKES.map((s) => (
              <SpotlightCard key={s.title} className="talk-card" style={{ background: "#2a251a", borderRadius: 20, padding: 26 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#a8a49a" }}>{s.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="reveal" style={{ background: "var(--color-offwhite)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Services
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              Built to put boards back in control.
            </h2>
          </div>
          <div className="grid-3 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="offering-card"
                style={{ background: "var(--color-cream)", borderRadius: 20, padding: 32 }}
              >
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-muted)", margin: s.items.length ? "0 0 16px" : 0 }}>
                  {s.body}
                </p>
                {s.items.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ fontSize: 13.5, color: "var(--color-muted)" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: "0 0 20px" }}>
              Coaching built around how your board actually works.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-muted)", maxWidth: 640, margin: "0 auto" }}>
              Beyond frameworks and checklists, sessions draw on creative and intuitive work, soft
              skills, and emotional intelligence, the human capacities that let leaders see the
              bigger picture and act on it.
            </p>
          </div>
          <div className="grid-4 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 50 }}>
            {FORMATS.map((f) => (
              <div key={f.title} className="method-card" style={{ background: "var(--color-cream)", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{f.body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-faint)", maxWidth: 640, margin: "40px auto 0", textAlign: "center" }}>
            Every engagement leaves the board with more than advice: practical tools to judge, on
            their own, whether they&apos;re actually doing a good job, not just take it on faith.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Pricing
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>
              Start with a session, or a strategy.
            </h2>
          </div>
          <div className="reveal reveal-stagger" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {PRICING.map((p) => (
              <div
                key={p.title}
                className="service-card grid-2"
                style={{
                  background: "var(--color-offwhite)",
                  borderRadius: 24,
                  padding: 40,
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr",
                  gap: 40,
                  boxShadow: "0 12px 28px #00000010",
                }}
              >
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, margin: "0 0 12px" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-muted)" }}>{p.body}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderLeft: "1px solid var(--color-cream-line)",
                    paddingLeft: 36,
                  }}
                >
                  <div style={{ fontSize: 13, color: "var(--color-faint)", marginBottom: 6 }}>{p.meta}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, marginBottom: 18 }}>
                    {p.price}
                  </div>
                  <Link href="/contact" className="btn btn-primary" style={{ padding: "14px 26px", fontSize: 14.5, textAlign: "center" }}>
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "90px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Why Jayburtt
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white", margin: "0 0 20px" }}>
              Governance experience from the inside.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#c9c4b6", maxWidth: 720, margin: "0 auto" }}>
              Before advising boards, Jayburtt spent 13 years in government across various director
              roles, including as an inspector applying risk-oriented supervision, and as Head of
              the Quality Institute for Healthcare, responsible for revising the rules, standards,
              certification, and registration for every healthcare provider under his authority,
              running the institute itself like a semi-public business, inside a real revenue
              model and limited resources.
            </p>
          </div>
          <div className="grid-4 reveal reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {CREDENTIALS.map((c) => (
              <SpotlightCard key={c.title} className="credential-card" style={{ background: "#2a251a", borderRadius: 20, padding: 24 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 6 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: 13, color: "#a8a49a" }}>{c.subtitle}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="reveal" style={{ background: "var(--color-navy)", padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.6, color: "#3f5c86", marginBottom: 10 }}>
            &ldquo;
          </div>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, lineHeight: 1.5, color: "white", margin: "0 0 22px" }}>
            I teach them how to find the solutions, show them the way, and give them the skills
            and the tools to navigate at a high level, and to judge for themselves whether
            they&apos;re doing a good job.
          </p>
          <div style={{ width: 40, height: 2, background: "var(--color-accent)", margin: "0 auto 14px" }} />
          <div style={{ fontSize: 14, color: "#9fb2ca" }}>Jayburtt Dijkhoff, PhD</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "90px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, margin: "0 0 20px" }}>
          Ready to lead with control?
        </h2>
        <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 34px", fontSize: 15 }}>
          Book a Board Session
        </Link>
      </section>

      <Footer />
    </div>
  );
}
