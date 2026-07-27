import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "About — Jayburtt Dijkhoff" };

const CREDENTIALS = [
  { title: "PhD", subtitle: "Health Sciences" },
  { title: "Featured on TV", subtitle: "Media & Own Program" },
  { title: "Author", subtitle: "Derechonan di Pashent" },
  { title: "Supported by", subtitle: "SIKI Foundation" },
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
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1284,
          marginInline: "auto",
        }}
      >
        <Image
          src="/images/portrait-speaking.png"
          alt="Jayburtt Dijkhoff, PhD"
          width={640}
          height={688}
          style={{ width: "100%", height: 520, objectFit: "cover", borderRadius: 24, boxShadow: "0 24px 48px #00000022" }}
        />
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            About
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5vw, 42px)",
              fontWeight: 700,
              margin: "0 0 20px",
              lineHeight: 1.2,
            }}
          >
            Jayburtt Dijkhoff, PhD
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
            A systems thinker with a storyteller&apos;s voice, commanding health, law, and human
            rights so people and institutions can navigate them with power.
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

      {/* BIO */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 90px" }}>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "#3a352c", margin: "0 0 22px" }}>
          Jayburtt&apos;s work sits at the intersection of healthcare practice, regulation, and
          lived reality. A health scientist by training, he has spent years inside the systems he
          now researches, writes, and speaks about, and continues to command them today.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "#3a352c", margin: "0 0 22px" }}>
          That work takes many shapes: researching how healthcare systems actually function,
          advising institutions on governance and recognition pathways, speaking and teaching on
          stages across the Kingdom, writing books that make patient rights understandable to
          everyone, and reflecting in prose and poetry on what it means to be human inside a
          system. Part of the mission is personal: stronger, more accountable healthcare for the
          ABC islands.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: "#3a352c" }}>
          The thread running through all of it is the same: when people understand the systems
          around them, they can make better decisions, resolve their issues, and reach their
          goals.
        </p>
      </section>

      {/* CREDENTIALS */}
      <section style={{ background: "var(--color-ink)", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, textAlign: "center", color: "white", margin: "0 0 48px" }}>
          Credentials
        </h2>
        <div
          className="container grid-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}
        >
          {CREDENTIALS.map((c) => (
            <div key={c.title} style={{ background: "#2a251a", borderRadius: 20, padding: 24 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 6 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 13, color: "#a8a49a" }}>{c.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, margin: "0 0 20px" }}>
          Want to work together?
        </h2>
        <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 34px", fontSize: 15 }}>
          Get in Touch
        </Link>
      </section>

      <Footer />
    </div>
  );
}
