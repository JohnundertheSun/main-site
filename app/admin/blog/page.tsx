import Link from "next/link";
import { ESSAYS } from "@/lib/essays";
import { countCommentsByStatus, getAllEssayStats } from "@/lib/blog/engagement";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const [stats, commentCounts] = await Promise.all([
    getAllEssayStats(),
    countCommentsByStatus(),
  ]);

  const rows = ESSAYS.map((essay) => ({
    essay,
    views: stats[essay.slug]?.views ?? 0,
    likes: stats[essay.slug]?.likes ?? 0,
  })).sort((a, b) => b.views - a.views || b.likes - a.likes);

  const totalViews = rows.reduce((sum, row) => sum + row.views, 0);
  const totalLikes = rows.reduce((sum, row) => sum + row.likes, 0);

  const cell = { padding: "12px 14px", fontSize: 14, verticalAlign: "top" as const };

  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        color: "var(--color-ink)",
        background: "var(--color-bg)",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: "1px solid var(--color-cream-line)",
          background: "var(--color-cream)",
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>
          Blog analytics
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link href="/admin/comments" style={{ fontSize: 14, color: "var(--color-muted)" }}>
            Comments ({commentCounts.pending ?? 0} pending)
          </Link>
          <Link href="/admin/signups" style={{ fontSize: 14, color: "var(--color-muted)" }}>
            Signups
          </Link>
          <form method="POST" action="/api/admin-logout">
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "1px solid var(--color-cream-line)",
                background: "white",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main style={{ padding: "30px 32px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 18, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { label: "Posts", value: ESSAYS.length },
            { label: "Total views", value: totalViews },
            { label: "Total likes", value: totalLikes },
            { label: "Comments pending", value: commentCounts.pending ?? 0 },
          ].map((tile) => (
            <div
              key={tile.label}
              style={{
                flex: "1 1 160px",
                background: "var(--color-offwhite)",
                border: "1px solid var(--color-cream-line)",
                borderRadius: 16,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 12.5, color: "var(--color-faint)", marginBottom: 6 }}>
                {tile.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>
                {tile.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-cream-line)" }}>
                <th style={{ ...cell, fontSize: 12.5, color: "var(--color-faint)" }}>Post</th>
                <th style={{ ...cell, fontSize: 12.5, color: "var(--color-faint)" }}>Published</th>
                <th style={{ ...cell, fontSize: 12.5, color: "var(--color-faint)" }}>Views</th>
                <th style={{ ...cell, fontSize: 12.5, color: "var(--color-faint)" }}>Likes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ essay, views, likes }) => (
                <tr key={essay.slug} style={{ borderBottom: "1px solid var(--color-cream-line)" }}>
                  <td style={cell}>
                    <Link href={`/essays/${essay.slug}`} style={{ color: "var(--color-ink)", fontWeight: 600 }}>
                      {essay.title}
                    </Link>
                  </td>
                  <td style={{ ...cell, color: "var(--color-faint)", whiteSpace: "nowrap" }}>
                    {new Date(essay.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td style={cell}>{views}</td>
                  <td style={cell}>{likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: 13, color: "var(--color-faint)", marginTop: 22, lineHeight: 1.7 }}>
          Views count one read per browser session. Likes count one per device, and a reader can
          take theirs back.
        </p>
      </main>
    </div>
  );
}
