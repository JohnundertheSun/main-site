import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Books — Jayburtt Dijkhoff" };

export default function BooksPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "80px 24px 20px", textAlign: "center" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>
          Books
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700 }}>
          Written to be understood.
        </h1>
      </section>

      <section style={{ padding: "60px 24px 100px" }}>
        <div
          className="container grid-2 reveal"
          style={{
            maxWidth: 1040,
            display: "grid",
            gridTemplateColumns: "0.5fr 1fr",
            gap: 56,
            alignItems: "start",
            background: "var(--color-offwhite)",
            borderRadius: 28,
            padding: 48,
            boxShadow: "0 20px 50px #00000012",
          }}
        >
          <div className="img-zoom" style={{ borderRadius: 14 }}>
            <Image
              src="/images/book-cover.webp"
              alt="Derechonan di Pashent book cover"
              width={640}
              height={1024}
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 14, boxShadow: "0 20px 40px #00000022" }}
            />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, margin: "0 0 10px" }}>
              Derechonan di Pashent
            </h2>
            <div style={{ fontSize: 14, color: "var(--color-faint)", marginBottom: 22 }}>
              by Jayburtt J. Dijkhoff, PhD
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3a352c", margin: "0 0 18px" }}>
              A clear-language guide to patient rights in Aruba, written so every reader, not just
              legal or medical professionals, can command their place in the healthcare system.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#3a352c", margin: "0 0 30px" }}>
              Drawing on real cases and lived experience, the book walks through the rights every
              patient holds, how to exercise them, and where to turn when a system falls short.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600 }}>$20.00</div>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ padding: "14px 30px", fontSize: 15, boxShadow: "0 8px 18px #c65a3540" }}
              >
                Order a Copy
              </Link>
            </div>
            <div style={{ fontSize: 13, color: "var(--color-faint)" }}>
              Available in Papiamento, with English translation notes.
            </div>
          </div>
        </div>
      </section>

      <section className="reveal" style={{ background: "var(--color-teal)", padding: "90px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#d9f3ec", marginBottom: 16 }}>
            Coming Next
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 16px" }}>
            A collection of poetry and reflection.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#e3f5f0", margin: "0 0 24px" }}>
            Jayburtt is currently writing a second book, a more personal, artistic exploration of
            systems, dignity, and what it means to be human within them.
          </p>
          <Link href="/contact" style={{ fontSize: 14.5, fontWeight: 600, color: "white", textDecoration: "underline" }}>
            Get notified when it&apos;s out →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
