import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpotlightCard from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "In-House Training — Jayburtt Dijkhoff",
  description:
    "In-house training for NGOs, public bodies, trade unions and organizations across the ABC islands — risk and compliance you can actually plan for, and communication that ends the fear culture.",
};

const FEARS = [
  {
    title: "Losing your people",
    body: "Leaders retiring, members drifting away, an ageing workforce and no one prepared to take over.",
  },
  {
    title: "Losing quality",
    body: "Standards slipping quietly, complaints and negative claims stacking up, and nobody able to say exactly where it started.",
  },
  {
    title: "Losing control",
    body: "Running the organization day to day instead of to a plan — always reacting, never ahead of it.",
  },
  {
    title: "Losing authority",
    body: "Poor leadership, power struggles and ego deciding outcomes instead of structure and mandate.",
  },
];

const PROGRAMMES = [
  {
    number: "01",
    eyebrow: "Flagship programme",
    title: "Risk & Compliance: From Ad Hoc to Control",
    body: "Most organizations manage risk by reacting to whatever lands on the desk that morning. This programme replaces that with an actual plan — so the organization runs smoothly, predictably, and under your control rather than the other way around.",
    points: [
      "Identify organizational, compliance and legal risk before it becomes a crisis",
      "Replace day-to-day firefighting with a plan your board can see and approve",
      "Build the structure that keeps quality from slipping quietly",
      "Give your people the tools to judge for themselves whether it's working",
    ],
    accent: "var(--color-accent)",
  },
  {
    number: "02",
    eyebrow: "Flagship programme",
    title: "Communication Inside the Organization",
    body: "Fear culture, power struggles and ego cost more than most boards realise — in decisions not made, talent lost, and problems nobody dares raise until they are expensive. This programme addresses how people actually talk to each other inside your structure.",
    points: [
      "Name and dismantle a fear culture without blowing up the organization",
      "Read power dynamics and ego, and stop them driving decisions",
      "Make it safe to raise a problem while it is still small",
      "Communicate decisions so they hold across levels and mandates",
    ],
    accent: "var(--color-teal)",
  },
];

const ALTERNATIVES = [
  { label: "Expensive consultants", body: "Big fees, a thick report, and very little that changes on Monday morning." },
  { label: "Expensive lawyers", body: "Called in once it is already a dispute — the costliest possible moment." },
  { label: "Generic trainers", body: "A pleasant day out that does not touch how your organization actually works." },
  { label: "Third parties", body: "Work outsourced, knowledge leaves with them, and you are dependent next time too." },
];

const AUDIENCE = [
  {
    title: "NGOs & Foundations",
    body: "Mission-driven organizations whose people need to understand the policy and governance landscape they work in.",
  },
  {
    title: "Public Bodies & Authorities",
    body: "Tourism, social insurance, healthcare and regulatory institutions operating inside complex mandates.",
  },
  {
    title: "Trade Unions",
    body: "Sindicato and worker representatives who need to read policy, structure and leadership dynamics with confidence.",
  },
  {
    title: "Change Makers",
    body: "Teams trying to move something inside a system that was not designed to move quickly.",
  },
];

const FORMATS = [
  { title: "Masterclass", duration: "2–3 hours", body: "A focused session on one theme. Strong opening to a team day, or a stand-alone learning moment." },
  { title: "Half-Day Training", duration: "4 hours", body: "Theory plus applied practice, with room for your team's own cases." },
  { title: "Full Training Day", duration: "1 day", body: "A complete programme with depth, exercises and competency-building your team can use immediately." },
  { title: "Multi-Session Programme", duration: "A series", body: "Sessions spread over weeks or months, so learning is reinforced rather than delivered once and forgotten." },
];

const HOW = [
  { n: "01", title: "A conversation", body: "What your organization is running into, what you are afraid of, and what has to be different afterwards." },
  { n: "02", title: "A written proposal", body: "A concrete offer with scope, format and price — in a form your board and treasury can review and approve." },
  { n: "03", title: "Delivered on site or online", body: "In your building or fully remote, across Aruba, Bonaire, Curaçao and the Netherlands." },
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
          gridTemplateColumns: "1fr 0.85fr",
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
            Stop running your organization from one crisis to the next.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 480, margin: "0 0 30px" }}>
            In-house training for NGOs, public bodies, trade unions and organizations that want
            control, structure and a plan — instead of reacting to whatever lands on the desk
            that morning.
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

      {/* THE FEARS */}
      <section className="reveal" style={{ background: "var(--color-ink)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 50, maxWidth: 720, marginInline: "auto" }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What&apos;s Actually at Stake
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: "white", margin: "0 0 18px" }}>
              Will you wait until the next crisis?
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#a8a49a" }}>
              Every organization I work with recognises at least one of these. The cost is rarely
              a single dramatic event — it is the slow version, where the loss is only obvious in
              hindsight.
            </p>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
          >
            {FEARS.map((f) => (
              <SpotlightCard key={f.title} className="talk-card" style={{ background: "#2a251a", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#a8a49a" }}>{f.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ORGANIZATIONS TRY FIRST */}
      <section className="reveal" style={{ background: "var(--color-cream)", padding: "90px 24px" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              What Usually Gets Tried First
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: "0 0 16px" }}>
              A lot of money, very little change.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--color-muted)", maxWidth: 620, margin: "0 auto" }}>
              Most organizations have already spent on this problem before we speak. The issue is
              usually not the budget — it is that the knowledge never stayed in the building.
            </p>
          </div>
          <div
            className="grid-4 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}
          >
            {ALTERNATIVES.map((a) => (
              <div key={a.label} style={{ background: "var(--color-offwhite)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{a.label}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)", margin: 0 }}>{a.body}</p>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.6,
              textAlign: "center",
              margin: "44px auto 0",
              maxWidth: 620,
            }}
          >
            I teach your people to do it themselves — so the capability stays after I leave.
          </p>
        </div>
      </section>

      {/* FLAGSHIP PROGRAMMES */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              Core Programmes
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>
              Where most organizations start.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {PROGRAMMES.map((p) => (
              <div
                key={p.number}
                className="service-card grid-2"
                style={{
                  background: "var(--color-offwhite)",
                  borderRadius: 28,
                  padding: 44,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 44,
                  boxShadow: "0 16px 36px #00000012",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: p.accent,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {p.number}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-faint)" }}>
                      {p.eyebrow}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 25, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.25 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--color-muted)", margin: 0 }}>{p.body}</p>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12, alignSelf: "center" }}>
                  {p.points.map((pt) => (
                    <li key={pt} style={{ fontSize: 15, lineHeight: 1.6 }}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO I WORK WITH */}
      <section className="reveal" style={{ background: "var(--color-offwhite)", padding: "100px 24px" }}>
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
              <div key={a.title} className="method-card" style={{ background: "var(--color-cream)", borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, margin: "0 0 10px" }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--color-muted)" }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="reveal" style={{ padding: "100px 24px" }}>
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

      {/* HOW IT WORKS + INVESTMENT */}
      <section className="reveal" style={{ background: "var(--color-navy)", padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 14 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "white" }}>
              A proposal your board can approve.
            </h2>
          </div>
          <div
            className="grid-3 reveal reveal-stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 48 }}
          >
            {HOW.map((h) => (
              <div key={h.n} style={{ background: "#1f3f6d", borderRadius: 20, padding: 30 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#9fb2ca", marginBottom: 12 }}>{h.n}</div>
                <h3 style={{ fontSize: 17.5, fontWeight: 600, color: "white", margin: "0 0 10px" }}>{h.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#c3d2e4" }}>{h.body}</p>
              </div>
            ))}
          </div>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              background: "#1f3f6d",
              borderRadius: 24,
              padding: 36,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9fb2ca", marginBottom: 12 }}>
              Investment
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "white", marginBottom: 12 }}>
              From AFL 2,000
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#c3d2e4", margin: 0 }}>
              Every engagement is quoted individually, based on format, group size and how much
              adaptation your organization needs. Most in-house training is funded from an
              existing training and development budget.
            </p>
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
            you&apos;ll get a written proposal back — scope, format and price, ready to take to
            your board.
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
