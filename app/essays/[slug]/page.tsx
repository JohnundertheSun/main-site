import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareRow from "@/components/blog/ShareRow";
import LikeButton from "@/components/blog/LikeButton";
import ViewBeacon from "@/components/blog/ViewBeacon";
import Comments from "@/components/blog/Comments";
import {
  AUTHOR,
  ESSAYS,
  getCategory,
  getEssay,
  getTag,
  essayImageUrl,
  relatedEssays,
} from "@/lib/essays";
import {
  getEssayStats,
  listAttachments,
  listPublishedComments,
  resolveEssayBody,
} from "@/lib/blog/engagement";

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

  // These posts are already circulating on Facebook under their old Wix URLs.
  // When someone follows or re-shares one, the preview has to look right, so
  // each article carries its own Open Graph card.
  const cover = essayImageUrl(essay.image, essay.slug);
  const url = `/essays/${essay.slug}`;

  return {
    title: `${essay.title} — Jayburtt Dijkhoff`,
    description: essay.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: essay.title,
      description: essay.excerpt,
      publishedTime: essay.date,
      authors: [AUTHOR.name],
      tags: essay.tags?.map((t) => getTag(t)?.label ?? t),
      section: essay.categories?.[0] ? getCategory(essay.categories[0])?.label : undefined,
      locale: essay.language === "EN" ? "en_US" : "pap_AW",
      images: cover
        ? [{ url: cover, width: essay.imageWidth, height: essay.imageHeight, alt: essay.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.excerpt,
      images: cover ? [cover] : undefined,
    },
  };
}

function formatBytes(bytes: number | null): string {
  if (!bytes) return "PDF";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `PDF · ${mb.toFixed(1)} MB`;
  return `PDF · ${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  const [body, stats, comments, attachments] = await Promise.all([
    resolveEssayBody(slug),
    getEssayStats(slug),
    listPublishedComments(slug),
    listAttachments(slug),
  ]);

  const cover = essayImageUrl(essay.image, essay.slug);
  const date = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const related = relatedEssays(slug);

  // Search engines get the article as structured data, so these pieces can
  // surface as rich results rather than plain links.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: essay.title,
    description: essay.excerpt,
    datePublished: essay.date,
    inLanguage: essay.language === "EN" ? "en" : "pap",
    author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role },
    publisher: { "@type": "Person", name: AUTHOR.name },
    image: cover ? [cover] : undefined,
    mainEntityOfPage: `https://www.jayburttdijkhoff.com/essays/${essay.slug}`,
    keywords: essay.tags?.map((t) => getTag(t)?.label ?? t).join(", "),
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <ViewBeacon slug={essay.slug} />

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
            {essay.categories?.map((c) => {
              const category = getCategory(c);
              if (!category) return null;
              return (
                <Link
                  key={c}
                  href={`/blog/category/${category.slug}`}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--color-accent-dark)",
                    textDecoration: "none",
                  }}
                >
                  {category.label}
                </Link>
              );
            })}
            <span style={{ fontSize: 13.5, color: "var(--color-faint)" }}>
              {date} · {essay.minutes} min read
              {stats.views > 0 ? ` · ${stats.views} ${stats.views === 1 ? "view" : "views"}` : ""}
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
              margin: "0 0 26px",
            }}
          >
            {essay.excerpt}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 26,
              marginBottom: 8,
              borderBottom: "1px solid var(--color-cream-line)",
            }}
          >
            <div style={{ fontSize: 14.5 }}>
              <div style={{ fontWeight: 600 }}>{AUTHOR.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--color-faint)" }}>{AUTHOR.role}</div>
            </div>
          </div>
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

        {attachments.length > 0 && (
          <div style={{ maxWidth: 720, margin: "44px auto 0" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 19,
                fontWeight: 700,
                margin: "0 0 14px",
              }}
            >
              Documents
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {attachments.map((file) => (
                <li key={file.id}>
                  <a
                    href={file.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 18px",
                      borderRadius: 14,
                      border: "1px solid var(--color-cream-line)",
                      background: "var(--color-offwhite)",
                      textDecoration: "none",
                      color: "var(--color-ink)",
                    }}
                  >
                    <span aria-hidden="true" style={{ fontSize: 20 }}>
                      📄
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>
                        {file.label}
                      </span>
                      <span style={{ fontSize: 12.5, color: "var(--color-faint)" }}>
                        {formatBytes(file.sizeBytes)}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          style={{
            maxWidth: 720,
            margin: "44px auto 0",
            paddingTop: 26,
            borderTop: "1px solid var(--color-cream-line)",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LikeButton slug={essay.slug} initialLikes={stats.likes} />
          <ShareRow title={essay.title} path={`/essays/${essay.slug}`} />
        </div>

        {essay.tags && essay.tags.length > 0 && (
          <div
            style={{
              maxWidth: 720,
              margin: "26px auto 0",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {essay.tags.map((t) => {
              const tag = getTag(t);
              if (!tag) return null;
              return (
                <Link
                  key={t}
                  href={`/blog/tag/${tag.slug}`}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: "var(--color-cream)",
                    color: "var(--color-muted)",
                    fontSize: 12.5,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  #{tag.label}
                </Link>
              );
            })}
          </div>
        )}
      </article>

      <section style={{ padding: "40px 24px 0" }}>
        <Comments
          slug={essay.slug}
          initialComments={comments.map((c) => ({
            id: c.id,
            author: c.authorName,
            body: c.body,
            createdAt: c.createdAt,
          }))}
        />
      </section>

      {related.length > 0 && (
        <section style={{ padding: "70px 24px 20px" }}>
          <div style={{ maxWidth: 1040, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                margin: "0 0 24px",
              }}
            >
              Keep reading
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 22,
              }}
            >
              {related.map((item) => {
                const image = essayImageUrl(item.image, item.slug);
                return (
                  <Link
                    key={item.slug}
                    href={`/essays/${item.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      borderRadius: 18,
                      overflow: "hidden",
                      background: "var(--color-offwhite)",
                      border: "1px solid var(--color-cream-line)",
                      display: "block",
                    }}
                  >
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt=""
                        style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }}
                      />
                    )}
                    <div style={{ padding: "18px 20px 22px" }}>
                      <div style={{ fontSize: 12, color: "var(--color-faint)", marginBottom: 8 }}>
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {" · "}
                        {item.minutes} min
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 17,
                          fontWeight: 600,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "50px 24px 90px", textAlign: "center" }}>
        <Link href="/blog" className="text-link" style={{ fontSize: 15 }}>
          ← All essays
        </Link>
      </section>

      <Footer />
    </div>
  );
}
