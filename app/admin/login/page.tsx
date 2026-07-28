export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-cream)",
        fontFamily: "var(--font-body)",
        padding: 24,
      }}
    >
      <form
        method="POST"
        action="/api/admin-login"
        style={{
          background: "var(--color-offwhite)",
          borderRadius: 24,
          padding: 40,
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 16px 36px #00000014",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>
          Admin
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--color-muted)", margin: "0 0 8px" }}>
          Enter the admin password to view program signups.
        </p>
        <input type="hidden" name="next" value={next ?? "/admin/signups"} />
        <div>
          <label htmlFor="password" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
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
        {error && (
          <p style={{ fontSize: 13.5, color: "var(--color-accent-dark)", margin: 0 }}>
            Incorrect password. Try again.
          </p>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "13px 28px", fontSize: 15 }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
