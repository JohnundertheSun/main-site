"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        style={{
          background: "var(--color-offwhite)",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 16px 36px #00000012",
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
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      style={{
        background: "var(--color-offwhite)",
        borderRadius: 24,
        padding: 40,
        boxShadow: "0 16px 36px #00000012",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>Name</span>
          <input
            required
            type="text"
            name="name"
            style={{
              padding: "13px 16px",
              borderRadius: 12,
              border: "1px solid var(--color-cream-line)",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
        </label>
        <label style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>Email</span>
          <input
            required
            type="email"
            name="email"
            style={{
              padding: "13px 16px",
              borderRadius: 12,
              border: "1px solid var(--color-cream-line)",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>
          What would you like to book?
        </span>
        <select
          name="reason"
          defaultValue="Speaking"
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
            background: "white",
          }}
        >
          <option>Speaking Engagement</option>
          <option>Consulting</option>
          <option>Media &amp; Press</option>
          <option>Something Else</option>
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>Message</span>
        <textarea
          required
          name="message"
          rows={5}
          style={{
            padding: "13px 16px",
            borderRadius: 12,
            border: "1px solid var(--color-cream-line)",
            fontSize: 15,
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ padding: "15px 30px", fontSize: 15, alignSelf: "flex-start" }}
      >
        Send Message
      </button>
    </form>
  );
}
