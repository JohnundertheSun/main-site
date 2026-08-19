import Link from "next/link";
import { countCommentsByStatus, listCommentsForModeration } from "@/lib/blog/engagement";
import { getEssay } from "@/lib/essays";
import CommentActions from "./CommentActions";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "published", label: "Published" },
  { key: "trash", label: "Trash" },
] as const;

type Status = (typeof TABS)[number]["key"];

export default async function AdminCommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: requested } = await searchParams;
  const status: Status = TABS.some((t) => t.key === requested)
    ? (requested as Status)
    : "pending";

  const [comments, counts] = await Promise.all([
    listCommentsForModeration(status),
    countCommentsByStatus(),
  ]);

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
          Comments
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link href="/admin/blog" style={{ fontSize: 14, color: "var(--color-muted)" }}>
            Blog analytics
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

      <main style={{ padding: "30px 32px 80px", maxWidth: 900, margin: "0 auto" }}>
        <nav style={{ display: "flex", gap: 10, marginBottom: 26 }}>
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={`/admin/comments?status=${tab.key}`}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
                background: tab.key === status ? "var(--color-ink)" : "var(--color-offwhite)",
                color: tab.key === status ? "white" : "var(--color-ink)",
                border: "1px solid var(--color-cream-line)",
              }}
            >
              {tab.label} ({counts[tab.key] ?? 0})
            </Link>
          ))}
        </nav>

        {comments.length === 0 ? (
          <p style={{ fontSize: 15, color: "var(--color-muted)" }}>
            {status === "pending"
              ? "No comments waiting. New ones land here before they appear on the site."
              : `No ${status} comments.`}
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
            {comments.map((comment) => {
              const essay = getEssay(comment.essaySlug);
              return (
                <li
                  key={comment.id}
                  style={{
                    background: "var(--color-offwhite)",
                    border: "1px solid var(--color-cream-line)",
                    borderRadius: 16,
                    padding: "20px 22px",
                  }}
                >
                  <div style={{ fontSize: 12.5, color: "var(--color-faint)", marginBottom: 6 }}>
                    on{" "}
                    <Link href={`/essays/${comment.essaySlug}`} style={{ color: "var(--color-muted)" }}>
                      {essay?.title ?? comment.essaySlug}
                    </Link>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{comment.authorName}</span>
                    <span style={{ fontSize: 12.5, color: "var(--color-faint)" }}>
                      {new Date(comment.createdAt).toLocaleString("en-GB")}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "0 0 16px",
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--color-muted)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {comment.body}
                  </p>
                  <CommentActions id={comment.id} status={comment.status} />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
