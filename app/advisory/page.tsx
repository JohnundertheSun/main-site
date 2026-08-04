import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Advisory & Coaching — Jayburtt Dijkhoff",
  description:
    "A limited number of advisory and coaching engagements are accepted each year, by request, at a premium rate and within a clearly defined scope.",
};

const ENGAGEMENTS = [
  {
    title: "Recognition Support",
    subtitle: "Beroepswaardering",
    body: "Independent advisory for healthcare professionals navigating AruBIG and KIG recognition pathways.",
    meta: "2 hr 30 min session",
    price: "US$ 675",
  },
  {
    title: "Power Strategy Coaching",
    subtitle: "One-on-one",
    body: "Confidential coaching on power dynamics, office politics and organizational politics — reading them deliberately rather than by accident.",
    meta: "3 sessions",
    price: "$750",
  },
  {
    title: "Governance & Quality Review",
    subtitle: "For institutions",
    body: "Structured review of governance, policy or quality systems, delivered as a clear findings report with actionable recommendations.",
    meta: "Scoped per engagement",
    price: "On request",
  },
];

export default function AdvisoryPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      {/* HERO */}
      <section style={{ padding: "90px 24px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--color-faint)",
              marginBottom: 18,
            }}
          >
            By Invitation
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 46px)",
              lineHeight: 1.15,
              fontWeight: 700,
              margin: "0 0 22px",
              letterSpacing: "-0.02em",
            }}
          >
            Advisory and coaching, selectively.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)" }}>
            My work is primarily teaching, training and performance. A small number of advisory
            and coaching engagements are still accepted each year — by request, at a premium
            rate, and within a clearly defined scope.
          </p>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="reveal" style={{ padding: "20px 24px 90px" }}>
        <div className="container" style={{ maxWidth: 900, display: "flex", flexDirection: "column", gap: 20 }}>
          {ENGAGEMENTS.map((e) => (
            <div
              key={e.title}
              className="service-card grid-2"
              style={{
                background: "var(--color-offwhite)",
                borderRadius: 24,
                padding: 36,
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: 36,
                boxShadow: "0 12px 28px #00000010",
              }}
            >
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>
                  {e.title}
                </h2>
                <div style={{ fontSize: 13.5, color: "var(--color-faint)", marginBottom: 14 }}>{e.subtitle}</div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-muted)", margin: 0 }}>{e.body}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: "1px solid var(--color-cream-line)",
                  paddingLeft: 32,
                }}
              >
                <div style={{ fontSize: 13, color: "var(--color-faint)", marginBottom: 6 }}>{e.meta}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, marginBottom: 18 }}>
                  {e.price}
                </div>
                <Link
                  href="/contact"
                  className="btn btn-secondary"
                  style={{ padding: "13px 24px", fontSize: 14.5, textAlign: "center" }}
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}

          <div style={{ background: "var(--color-cream)", borderRadius: 24, padding: "30px 36px" }}>
            <div style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--color-muted)" }}>
              Jayburtt is not a lawyer. Advisory letters and guidance support your case but do not
              constitute legal representation.
            </div>
          </div>
        </div>
      </section>

      {/* REDIRECT TO CORE WORK */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, margin: "0 0 16px" }}>
            Looking for something for your whole team?
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-muted)", margin: "0 0 28px" }}>
            Most organizations are better served by an in-house training programme than by an
            advisory engagement — it reaches more people and leaves the knowledge behind.
          </p>
          <Link href="/in-house-training" className="btn btn-primary" style={{ padding: "15px 32px", fontSize: 15 }}>
            Explore In-House Training
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
