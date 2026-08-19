import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EssayCard from "@/components/blog/EssayCard";
import { CATEGORIES, activeCategories, essaysInCategory, getCategory } from "@/lib/essays";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found — Jayburtt Dijkhoff" };
  return {
    title: `${category.label} — Jayburtt Dijkhoff`,
    description: `Essays on ${category.label.toLowerCase()} by Dr. Jayburtt Dijkhoff.`,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const essays = essaysInCategory(slug).sort((a, b) => b.date.localeCompare(a.date));
  const others = activeCategories().filter((c) => c.slug !== slug);

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <section style={{ padding: "84px 24px 34px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            Category
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
            {category.label}
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
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 30 }}>
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/blog/category/${other.slug}`}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid var(--color-cream-line)",
                background: "var(--color-offwhite)",
                color: "var(--color-ink)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {other.label}
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
