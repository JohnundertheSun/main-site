import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact — Jayburtt Dijkhoff" };

export default function ContactPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "110px 24px 100px" }}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>
            Book Jayburtt
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              margin: "0 0 22px",
              lineHeight: 1.15,
            }}
          >
            Let&apos;s work together.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-muted)" }}>
            Speaking engagements, consulting, media requests, or just a question — reach out and
            Jayburtt&apos;s team will follow up.
          </p>
        </div>

        <div
          className="container grid-2"
          style={{ display: "grid", gridTemplateColumns: "0.8fr 1fr", gap: 48, alignItems: "start" }}
        >
          <div
            style={{
              background: "var(--color-navy)",
              borderRadius: 24,
              padding: 40,
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600 }}>
              Direct Contact
            </h3>
            <div>
              <div style={{ fontSize: 12.5, color: "#9fb2ca", marginBottom: 4 }}>Phone</div>
              <div style={{ fontSize: 15.5 }}>+297 566 7805</div>
            </div>
            <div>
              <div style={{ fontSize: 12.5, color: "#9fb2ca", marginBottom: 4 }}>Email</div>
              <div style={{ fontSize: 15.5 }}>info@jayburttdijkhoff.com</div>
            </div>
            <div>
              <div style={{ fontSize: 12.5, color: "#9fb2ca", marginBottom: 4 }}>Based In</div>
              <div style={{ fontSize: 15.5 }}>Oranjestad, Aruba</div>
            </div>
            <div style={{ borderTop: "1px solid #2c4a75", paddingTop: 18 }}>
              <div style={{ fontSize: 12.5, color: "#9fb2ca", marginBottom: 10 }}>Follow</div>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>
                  LinkedIn
                </a>
                <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>
                  Instagram
                </a>
                <a href="#" style={{ fontSize: 14, fontWeight: 600 }}>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
