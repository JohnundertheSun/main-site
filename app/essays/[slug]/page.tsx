import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ESSAYS, getEssay, getEssayBody, essayImageUrl } from "@/lib/essays";

export function generateStaticParams() {
  return ESSAYS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return { title: "Essay not found — Jayburtt Dijkhoff" };
  return { title: `${essay.title} — Jayburtt Dijkhoff`, description: essay.excerpt };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  const body = getEssayBody(slug);
  const cover = essayImageUrl(essay.image, essay.slug);
  const date = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <Header />

      <article style={{ padding: "70px 24px 40px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 22, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "4px 11px",
                background: essay.language === "EN" ? "#dde5f0" : "#f2e0d2",
                color: essay.language === "EN" ? "#17325a" : "#a1462a",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {essay.language === "EN" ? "English" : "Papiamento"}
            </span>
            <span style={{ fontSize: 13.5, color: "var(--color-faint)" }}>
              {date} · {essay.minutes} min read
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4.6vw, 44px)",
              lineHeight: 1.16,
              fontWeight: 700,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            {essay.title}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              margin: "0 0 34px",
            }}
          >
            {essay.excerpt}
          </p>
        </div>

        {cover && (
          <div style={{ maxWidth: 900, margin: "0 auto 44px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={essay.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 20,
                boxShadow: "0 20px 44px #00000018",
              }}
            />
          </div>
        )}

        <div className="prose" style={{ maxWidth: 720, margin: "0 auto" }}>
          {body ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          ) : (
            <div
              style={{
                background: "var(--color-cream)",
                borderRadius: 16,
                padding: "28px 30px",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--color-muted)",
              }}
            >
              The full text of this essay is being migrated and will appear here shortly.
            </div>
          )}
        </div>
      </article>

      <section style={{ padding: "50px 24px 90px", textAlign: "center" }}>
        <Link href="/books-and-ideas" className="text-link" style={{ fontSize: 15 }}>
          ← All essays
        </Link>
      </section>

      <Footer />
    </div>
  );
}
