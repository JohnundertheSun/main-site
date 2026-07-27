import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Consulting — Jayburtt Dijkhoff" };

const SERVICES = [
  {
    tag: "Most Requested",
    tagBg: "#f2e0d2",
    tagColor: "#a1462a",
    title: "Recognition Support: Beroepswaardering",
    body: "Independent advisory for healthcare professionals navigating AruBIG and KIG recognition pathways.",
    meta: "2 hr 30 min session",
    price: "US$ 675",
    cta: "Book Now",
  },
  {
    tag: "On-Site or Remote",
    tagBg: "#ece2d0",
    tagColor: "#5a4a30",
    title: "Quality Audits & Structured Review",
    body: "Structured analysis of clinical and administrative processes with a clear, actionable findings report.",
    meta: "Scoped by engagement",
    price: "On request",
    cta: "Request a Quote",
  },
  {
    tag: "For Institutions",
    tagBg: "#ece2d0",
    tagColor: "#5a4a30",
    title: "Governance & Policy Advisory",
    body: "Guidance for healthcare organizations and Dutch providers on governance structures and cross-Kingdom policy alignment.",
    meta: "Ongoing or one-off",
    price: "On request",
    cta: "Request a Quote",
  },
  {
    tag: "For Teams",
    tagBg: "#dbeae6",
    tagColor: "#1a6b5c",
    title: "Team Subscription",
    body: "Ongoing access to workshops, updates, and direct guidance, so your organization stays current on quality and compliance year-round.",
    meta: "Monthly or annual",
    price: "On request",
    cta: "Request a Quote",
  },
];

export default function ConsultingPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "80px 24px 56px", maxWidth: 800, marginInline: "auto" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Consulting
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700,
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}
        >
          High-level advisory, one-on-one.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)" }}>
          Direct engagement with Jayburtt for institutions and Dutch healthcare providers
          navigating governance, recognition, and quality systems across the Kingdom.
        </p>
      </section>

      <section
        className="container"
        style={{ padding: "0 24px 90px", display: "flex", flexDirection: "column", gap: 24 }}
      >
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="grid-2"
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
              <div
                style={{
                  display: "inline-flex",
                  padding: "5px 14px",
                  borderRadius: 14,
                  background: s.tagBg,
                  color: s.tagColor,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {s.tag}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, margin: "0 0 12px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--color-muted)" }}>{s.body}</p>
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
              <div style={{ fontSize: 13, color: "var(--color-faint)", marginBottom: 6 }}>{s.meta}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, marginBottom: 18 }}>
                {s.price}
              </div>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ padding: "14px 26px", fontSize: 14.5, textAlign: "center" }}
              >
                {s.cta}
              </Link>
            </div>
          </div>
        ))}
        <div style={{ background: "var(--color-offwhite)", borderRadius: 24, padding: "40px 44px", boxShadow: "0 12px 28px #00000010" }}>
          <div style={{ fontSize: 13, color: "var(--color-faint)" }}>
            Jayburtt is not a lawyer. Advisory letters and guidance support your case but are not
            legal representation.
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, margin: "0 0 20px" }}>
          Not sure which service fits?
        </h2>
        <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 34px", fontSize: 15 }}>
          Start a Conversation
        </Link>
      </section>

      <Footer />
    </div>
  );
}
