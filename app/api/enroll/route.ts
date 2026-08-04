import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { program, name, email, phone, notes } = (body ?? {}) as Record<string, unknown>;

  if (typeof program !== "string" || !program.trim()) {
    return NextResponse.json({ ok: false, error: "Missing program." }, { status: 400 });
  }
  if (typeof name !== "string" || !name.trim() || name.trim().length > 200) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.trim().length > 320) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone !== undefined && phone !== null && (typeof phone !== "string" || phone.length > 60)) {
    return NextResponse.json({ ok: false, error: "Invalid phone number." }, { status: 400 });
  }
  if (notes !== undefined && notes !== null && (typeof notes !== "string" || notes.length > 5000)) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("program_signups").insert({
      program: program.trim(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" && phone.trim() ? phone.trim() : null,
      notes: typeof notes === "string" && notes.trim() ? notes.trim() : null,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enroll route error:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
