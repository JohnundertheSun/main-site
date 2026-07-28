import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/admin/signups");
  const safeNext = next.startsWith("/admin") ? next : "/admin/signups";

  const expected = process.env.ADMIN_PASSWORD;
  const url = new URL(request.url);

  if (!expected || password !== expected) {
    const loginUrl = new URL("/admin/login", url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", safeNext);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(safeNext, url), { status: 303 });
  response.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return response;
}
