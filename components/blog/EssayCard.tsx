import Link from "next/link";
import { essayImageUrl, getCategory, type Essay } from "@/lib/essays";

/** The one card used by the blog index and every archive, so they stay in sync. */
export default function EssayCard({ essay }: { essay: Essay }) {
  const image = essayImageUrl(essay.image, essay.slug);
  const category = essay.categories?.[0] ? getCategory(essay.categories[0]) : undefined;
  const date = new Date(essay.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="img-zoom"
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        background: "var(--color-offwhite)",
        border: "1px solid var(--color-cream-line)",
        borderRadius: 20,
        overflow: "hidden",
        height: "100%",
      }}
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
        />
      )}
      <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <span
            style={{
              padding: "3px 10px",
              background: essay.language === "EN" ? "#dde5f0" : "#f2e0d2",
              color: essay.language === "EN" ? "#17325a" : "#a1462a",
              borderRadius: 12,
              fontSize: 10.5,
              fontWeight: 600,
            }}
          >
            {essay.language === "EN" ? "English" : "Papiamento"}
          </span>
          {category && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-accent-dark)" }}>
              {category.label}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 19,
            fontWeight: 600,
            lineHeight: 1.35,
            margin: "0 0 10px",
          }}
        >
          {essay.title}
        </h3>

        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.65,
            color: "var(--color-muted)",
            margin: "0 0 18px",
            flex: 1,
          }}
        >
          {essay.excerpt}
        </p>

        <div style={{ fontSize: 12.5, color: "var(--color-faint)" }}>
          {date} · {essay.minutes} min read
        </div>
      </div>
    </Link>
  );
}
