import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EssayCard from "@/components/blog/EssayCard";
import { TAGS, activeTags, essaysWithTag, getTag } from "@/lib/essays";

export function generateStaticParams() {
  return TAGS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return { title: "Tag not found — Jayburtt Dijkhoff" };
  return {
    title: `${tag.label} — Jayburtt Dijkhoff`,
    description: `Essays tagged ${tag.label} by Dr. Jayburtt Dijkhoff.`,
    alternates: { canonical: `/blog/tag/${tag.slug}` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();

  const essays = essaysWithTag(slug).sort((a, b) => b.date.localeCompare(a.date));
  const others = activeTags().filter((t) => t.slug !== slug);

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "84px 24px 34px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Topic
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4.8vw, 46px)",
              lineHeight: 1.14,
              fontWeight: 700,
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}
          >
            #{tag.label}
          </h1>
          <p style={{ fontSize: 16, color: "var(--color-muted)" }}>
            {essays.length} {essays.length === 1 ? "essay" : "essays"}
          </p>
        </div>
      </section>

      <section className="reveal" style={{ padding: "0 24px 60px" }}>
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 26,
          }}
        >
          {essays.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
        </div>
      </section>

      <section style={{ padding: "0 24px 90px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/blog/tag/${other.slug}`}
              style={{
                padding: "7px 15px",
                borderRadius: 999,
                background: "var(--color-cream)",
                color: "var(--color-muted)",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              #{other.label}
            </Link>
          ))}
        </div>
        <Link href="/blog" className="text-link" style={{ fontSize: 15 }}>
          ← All essays
        </Link>
      </section>

      <Footer />
    </div>
  );
}
