"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p style={{ fontSize: 15, color: "white", fontWeight: 600 }}>
        Thanks for subscribing — welcome aboard.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <input
        type="email"
        required
        placeholder="Email address"
        className="newsletter-input"
        style={{
          flex: 1,
          padding: "14px 20px",
          borderRadius: 999,
          border: "none",
          fontSize: 15,
        }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        style={{
          padding: "14px 30px",
          fontSize: 15,
          fontWeight: 700,
          whiteSpace: "nowrap",
          boxShadow: "0 8px 18px #c65a3550",
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
