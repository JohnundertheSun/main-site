import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_auth";

/**
 * Whether this request carries a valid admin session.
 *
 * The proxy in proxy.ts gates /admin *pages*, but its matcher does not cover
 * /api routes. Anything that writes on the admin's behalf has to check for
 * itself, or the path becomes an unauthenticated back door.
 */
export async function isAdminRequest(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

/** Bucket holding PDFs attached to essays. Public: these are meant to be read. */
export const ATTACHMENTS_BUCKET = "essay-attachments";
