"use client";

import { useState } from "react";

const REASONS = [
  "A course or masterclass",
  "In-house training for my organization",
  "A performance or speaking engagement",
  "A book order",
  "Media or press",
  "Advisory or coaching",
  "Something else",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const submitted = status === "done";

  if (submitted) {
    return (
      <div
        style={{
          background: "var(--color-offwhite)",
          borderRadius: 24,
          padding: 44,
          boxShadow: "0 16px 36px #00000014",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, margin: "0 0 12px" }}>
          Message received
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--color-muted)" }}>
          Thanks for reaching out — Jayburtt&apos;s team will get back to you soon.
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
        const reason = String(data.get("reason") ?? "");
        const message = String(data.get("message") ?? "");
        try {
          const res = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              program: "contact",
              name: data.get("name"),
              email: data.get("email"),
              notes: `Reason: ${reason}\n\n${message}`,
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
        borderRadius: 24,
        padding: 44,
        boxShadow: "0 16px 36px #00000014",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Name</label>
        <input
          required
          type="text"
          name="name"
          placeholder="Your full name"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
          }}
        />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Email</label>
        <input
          required
          type="email"
          name="email"
          placeholder="you@example.com"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
          }}
        />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
          I&apos;m reaching out about
        </label>
        <select
          name="reason"
          defaultValue={REASONS[0]}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
            background: "white",
          }}
        >
          {REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Message</label>
        <textarea
          required
          name="message"
          placeholder="Tell me about your event, organization, or question."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "13px 16px",
            borderRadius: 10,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
            minHeight: 120,
            resize: "vertical",
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
        style={{ padding: "15px 30px", fontSize: 15, alignSelf: "flex-start", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
