"use client";

import { useId, useState } from "react";

/**
 * Course agenda / founding-cohort signup.
 *
 * Unlike the old decorative newsletter form, this posts to /api/enroll and is
 * stored, so the list is real and visible in /admin/signups.
 */
export default function CourseAgendaForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const nameId = useId();
  const emailId = useId();

  if (status === "done") {
    return (
      <div
        style={{
          background: "var(--color-offwhite)",
          borderRadius: 20,
          padding: 32,
          textAlign: "center",
          boxShadow: "0 16px 36px #00000030",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, margin: "0 0 8px" }}>
          You&apos;re on the agenda list
        </h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--color-muted)", margin: 0 }}>
          You&apos;ll hear about new course dates and founding-cohort places first.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setError("");
        const data = new FormData(e.currentTarget);
        try {
          const res = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              program: "course-agenda",
              name: data.get("name"),
              email: data.get("email"),
              sourcePath: window.location.pathname,
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
        padding: 32,
        boxShadow: "0 16px 36px #00000030",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        textAlign: "left",
      }}
    >
      <div>
        <label htmlFor={nameId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          placeholder="Your name"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
          }}
        />
      </div>
      <div>
        <label htmlFor={emailId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
          }}
        />
      </div>
      {status === "error" && (
        <p style={{ fontSize: 13.5, color: "var(--color-accent-dark)", margin: 0 }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary"
        style={{ padding: "14px 28px", fontSize: 15, alignSelf: "flex-start", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "Joining…" : "Join the Agenda List"}
      </button>
    </form>
  );
}
