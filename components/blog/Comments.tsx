"use client";

import { useId, useState } from "react";

export type PublicComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Comments({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: PublicComment[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const nameId = useId();
  const emailId = useId();
  const bodyId = useId();

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid var(--color-cream-line)",
    fontSize: 15,
    fontFamily: "inherit",
  };

  return (
    <section style={{ maxWidth: 720, margin: "0 auto", padding: "10px 0 0" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 700,
          margin: "0 0 22px",
        }}
      >
        {initialComments.length > 0
          ? `${initialComments.length} ${initialComments.length === 1 ? "comment" : "comments"}`
          : "Join the conversation"}
      </h2>

      {initialComments.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
          {initialComments.map((comment) => (
            <li
              key={comment.id}
              style={{
                borderTop: "1px solid var(--color-cream-line)",
                padding: "20px 0",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600 }}>{comment.author}</span>
                <span style={{ fontSize: 12.5, color: "var(--color-faint)" }}>
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--color-muted)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      )}

      {status === "done" ? (
        <div
          style={{
            background: "var(--color-cream)",
            borderRadius: 16,
            padding: "24px 26px",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--color-muted)",
          }}
        >
          Thank you — your comment has been sent and will appear once it has been read.
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus("sending");
            setError("");
            const data = new FormData(e.currentTarget);
            try {
              const res = await fetch(`/api/essays/${encodeURIComponent(slug)}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: data.get("name"),
                  email: data.get("email"),
                  body: data.get("body"),
                  website: data.get("website"),
                }),
              });
              const json = await res.json();
              if (!res.ok || !json.ok) {
                setError(json.error || "Something went wrong. Please try again.");
                setStatus("error");
                return;
              }
              setStatus("done");
            } catch {
              setError("Something went wrong. Please try again.");
              setStatus("error");
            }
          }}
          style={{
            background: "var(--color-offwhite)",
            borderRadius: 20,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px" }}>
              <label htmlFor={nameId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Name
              </label>
              <input id={nameId} name="name" type="text" required maxLength={80} style={inputStyle} />
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label htmlFor={emailId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Email <span style={{ color: "var(--color-faint)", fontWeight: 400 }}>(not published)</span>
              </label>
              <input id={emailId} name="email" type="email" style={inputStyle} />
            </div>
          </div>
          <div>
            <label htmlFor={bodyId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              Comment
            </label>
            <textarea
              id={bodyId}
              name="body"
              required
              rows={5}
              maxLength={4000}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Honeypot — hidden from people, filled in by bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          {status === "error" && (
            <p style={{ fontSize: 13.5, color: "var(--color-accent-dark)", margin: 0 }}>{error}</p>
          )}

          <p style={{ fontSize: 13, color: "var(--color-faint)", margin: 0, lineHeight: 1.6 }}>
            Comments are read before they appear.
          </p>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn btn-primary"
            style={{
              padding: "13px 28px",
              fontSize: 15,
              alignSelf: "flex-start",
              opacity: status === "sending" ? 0.7 : 1,
            }}
          >
            {status === "sending" ? "Sending…" : "Post comment"}
          </button>
        </form>
      )}
    </section>
  );
}
