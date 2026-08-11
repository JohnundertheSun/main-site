import "server-only";
import { Resend } from "resend";

/**
 * Resend is optional at runtime.
 *
 * If RESEND_API_KEY is not set, the site still works — forms save to Supabase
 * exactly as before and no email goes out. This keeps local development and
 * preview deploys usable without handing out the production key, and means a
 * missing key can never take the forms down.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Sender address. Must be on a domain verified in Resend. */
export const EMAIL_FROM =
  process.env.EMAIL_FROM || "Jayburtt Dijkhoff <hello@updates.jayburttdijkhoff.com>";

/** Where signup notifications land. Comma-separated for more than one. */
export const EMAIL_TO_ADMIN = (process.env.EMAIL_TO_ADMIN || "")
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

/** Address a visitor's reply should go to, which is a real inbox, not the sender. */
export const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || EMAIL_TO_ADMIN[0] || undefined;
