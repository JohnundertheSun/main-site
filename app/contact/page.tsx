import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact — Jayburtt Dijkhoff" };

const INFO = [
  { label: "Phone", value: "+297 566 7805" },
  { label: "Email", value: "info@jayburttdijkhoff.com" },
  { label: "Location", value: "Oranjestad, Aruba. Available across the ABC islands and the Netherlands" },
];

export default function ContactPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Get in Touch
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              margin: "0 0 16px",
            }}
          >
            Let&apos;s talk about your goals.
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18, lineHeight: 1.6, color: "var(--color-muted)" }}>
            Speaking engagements, consulting, media, or just to say hello.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 100px" }}>
        <div
          className="container grid-2"
          style={{ maxWidth: 1040, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56 }}
        >
          <ContactForm />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {INFO.map((item) => (
              <div key={item.label} style={{ background: "#ece0cb", borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>{item.label}</div>
                <div style={{ fontSize: 15, color: "var(--color-muted)" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
