"use client";

import { useId, useState } from "react";

export default function EnrollForm({
  program,
  price,
  ctaLabel = "Reserve My Spot",
  paymentUrl,
}: {
  program: string;
  price: string;
  ctaLabel?: string;
  /** Wix pay link. Present means the buyer can pay immediately. */
  paymentUrl?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  if (status === "done") {
    return (
      <div
        style={{
          background: "var(--color-offwhite)",
          borderRadius: 24,
          padding: 36,
          textAlign: "center",
          boxShadow: "0 16px 36px #00000014",
        }}
      >
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, margin: "0 0 10px" }}>
          {paymentUrl ? "You're registered" : "You're on the list"}
        </h3>
        {paymentUrl ? (
          <>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--color-muted)", marginBottom: 20 }}>
              One step left: complete the {price} payment and your access is confirmed. The same
              link is in the email we just sent, so you can also finish this later.
            </p>
            <a
              href={paymentUrl}
              className="btn btn-primary"
              style={{ padding: "14px 30px", fontSize: 15, display: "inline-block" }}
            >
              Pay {price} now
            </a>
          </>
        ) : (
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--color-muted)" }}>
            We&apos;ll follow up with a secure payment link to complete your enrollment for{" "}
            {price}.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setError("");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
          const res = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              program,
              name: data.get("name"),
              email: data.get("email"),
              phone: data.get("phone"),
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
        borderRadius: 24,
        padding: 36,
        boxShadow: "0 16px 36px #00000014",
        display: "flex",
        flexDirection: "column",
        gap: 16,
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
          placeholder="Your full name"
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
      <div>
        <label htmlFor={phoneId} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Phone <span style={{ color: "var(--color-faint)", fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          placeholder="+297 ..."
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
        style={{ padding: "14px 30px", fontSize: 15, alignSelf: "flex-start", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "Sending…" : ctaLabel}
      </button>
    </form>
  );
}
