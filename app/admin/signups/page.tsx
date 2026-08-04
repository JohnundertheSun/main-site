import { getSupabaseServerClient } from "@/lib/supabase/serverClient";

export const dynamic = "force-dynamic";

type Signup = {
  id: string;
  created_at: string;
  program: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  notes: string | null;
};

async function loadSignups(): Promise<{ signups: Signup[]; error: string | null }> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("program_signups")
      .select("id, created_at, program, name, email, phone, status, notes")
      .order("created_at", { ascending: false });

    if (error) return { signups: [], error: error.message };
    return { signups: data ?? [], error: null };
  } catch (err) {
    return { signups: [], error: err instanceof Error ? err.message : "Unknown error." };
  }
}

export default async function AdminSignupsPage() {
  const { signups, error } = await loadSignups();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--color-ink)", background: "var(--color-bg)", minHeight: "100vh" }}>
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
          Program Signups
        </div>
        <form method="POST" action="/api/admin-logout">
          <button
            type="submit"
            style={{
              background: "transparent",
              border: "1px solid var(--color-cream-line)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13.5,
              fontFamily: "inherit",
              cursor: "pointer",
              color: "var(--color-muted)",
            }}
          >
            Sign Out
          </button>
        </form>
      </header>

      <main style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>
        {error && (
          <div
            style={{
              background: "#fdecec",
              border: "1px solid #f3b9b9",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              fontSize: 14,
              color: "#8a2020",
            }}
          >
            Couldn&apos;t load signups: {error}. Make sure <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> are set, and that the{" "}
            <code>program_signups</code> table exists (see <code>supabase/migrations/</code>).
          </div>
        )}

        <div style={{ fontSize: 13.5, color: "var(--color-faint)", marginBottom: 20 }}>
          {signups.length} {signups.length === 1 ? "signup" : "signups"}
        </div>

        <div style={{ overflowX: "auto", background: "var(--color-offwhite)", borderRadius: 16, boxShadow: "0 8px 24px #00000010" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--color-cream-line)" }}>
                <th style={{ padding: "14px 18px" }}>Date</th>
                <th style={{ padding: "14px 18px" }}>Program</th>
                <th style={{ padding: "14px 18px" }}>Name</th>
                <th style={{ padding: "14px 18px" }}>Email</th>
                <th style={{ padding: "14px 18px" }}>Phone</th>
                <th style={{ padding: "14px 18px" }}>Message</th>
                <th style={{ padding: "14px 18px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {signups.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid var(--color-cream-line)" }}>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap", color: "var(--color-faint)" }}>
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 18px" }}>{s.program}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <a href={`mailto:${s.email}`} className="text-link">
                      {s.email}
                    </a>
                  </td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>{s.phone ?? "—"}</td>
                  <td style={{ padding: "14px 18px", maxWidth: 320, whiteSpace: "pre-wrap", color: "var(--color-muted)", fontSize: 13.5 }}>
                    {s.notes ?? "—"}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        background: "#ece0cb",
                        color: "#5a4a30",
                      }}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
              {signups.length === 0 && !error && (
                <tr>
                  <td colSpan={7} style={{ padding: "32px 18px", textAlign: "center", color: "var(--color-faint)" }}>
                    No signups yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
