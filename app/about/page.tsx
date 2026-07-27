import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "About — Jayburtt Dijkhoff" };

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "110px 24px 90px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            About Jayburtt
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 54px)",
              fontWeight: 700,
              margin: "0 0 26px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            A career built on making systems make sense.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)" }}>
            Jayburtt Dijkhoff, PhD, is a speaker, author, and quality-systems expert working across
            healthcare and law in the ABC islands and the Netherlands.
          </p>
        </div>
      </section>

      <section
        className="grid-2"
        style={{
          padding: "0 24px 110px",
          display: "grid",
          gridTemplateColumns: "0.8fr 1fr",
          gap: 56,
          alignItems: "center",
          maxWidth: 1140,
          marginInline: "auto",
        }}
      >
        <Image
          src="/images/portrait-speaking.png"
          alt="Jayburtt Dijkhoff"
          width={640}
          height={688}
          style={{
            width: "100%",
            height: 420,
            objectFit: "contain",
            background: "var(--color-cream)",
            borderRadius: 24,
            boxShadow: "0 24px 48px #00000022",
          }}
        />
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--color-muted)", margin: "0 0 20px" }}>
            After more than a decade working inside healthcare systems and legal frameworks,
            Jayburtt earned his PhD in Health Sciences and turned his research into practice:
            helping individuals understand their rights, and helping institutions build the
            governance and recognition pathways that protect both patients and practitioners.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--color-muted)", margin: "0 0 20px" }}>
            He is the author of <em>Derechonan di Pashent</em>, a clear-language guide to patient
            rights in Aruba, and has been featured on television for his work bridging Dutch and
            Caribbean healthcare governance. His work is supported in part by the SIKI Foundation.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--color-muted)", margin: "0 0 30px" }}>
            Today, Jayburtt splits his time between speaking, writing, one-on-one consulting for
            healthcare institutions, and creative work in poetry and music, all in service of the
            same idea: when people understand the systems around them, they can make better
            decisions, resolve their issues, and reach their goals.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 15 }}>
            Book Jayburtt
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
