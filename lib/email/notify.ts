import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { EMAIL_FROM, EMAIL_REPLY_TO, EMAIL_TO_ADMIN, getResendClient } from "./client";
import { adminNotification, visitorConfirmation, type SignupDetails } from "./templates";

type EmailKind = "admin_notification" | "visitor_confirmation";

/**
 * Records the outcome of a send in email_log.
 *
 * Never throws. Logging is a diagnostic, and a diagnostic that can break the
 * thing it observes is worse than no diagnostic.
 */
async function recordEmail(entry: {
  signupId: string | null;
  kind: EmailKind;
  recipient: string;
  subject: string;
  status: "sent" | "failed";
  providerMessageId?: string | null;
  error?: string | null;
}): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    await supabase.from("email_log").insert({
      signup_id: entry.signupId,
      kind: entry.kind,
      recipient: entry.recipient,
      subject: entry.subject,
      status: entry.status,
      provider_message_id: entry.providerMessageId ?? null,
      error: entry.error ?? null,
    });
  } catch (err) {
    console.error("email_log insert failed:", err);
  }
}

/** Sends one message and records the result. Resolves either way. */
async function send(options: {
  signupId: string | null;
  kind: EmailKind;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const { signupId, kind, to, replyTo, subject, html, text } = options;

  if (to.length === 0) return;

  const resend = getResendClient();
  if (!resend) {
    // No API key configured. Not an error — see getResendClient.
    console.warn(`RESEND_API_KEY not set; skipped ${kind} to ${to.join(", ")}`);
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo,
      subject,
      html,
      text,
    });

    if (error) {
      console.error(`Resend rejected ${kind}:`, error.message);
      await recordEmail({
        signupId,
        kind,
        recipient: to.join(", "),
        subject,
        status: "failed",
        error: error.message,
      });
      return;
    }

    await recordEmail({
      signupId,
      kind,
      recipient: to.join(", "),
      subject,
      status: "sent",
      providerMessageId: data?.id ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Sending ${kind} threw:`, message);
    await recordEmail({
      signupId,
      kind,
      recipient: to.join(", "),
      subject,
      status: "failed",
      error: message,
    });
  }
}

/**
 * Fires both emails for a new signup: the notification to Jayburtt and the
 * confirmation to the visitor.
 *
 * Deliberately swallows every failure. The visitor has already been saved to
 * the database by the time this runs, and a Resend outage must never turn a
 * successful signup into an error message on the form. Failures land in
 * email_log and the server console instead.
 */
export async function notifyNewSignup(
  signupId: string | null,
  signup: SignupDetails
): Promise<void> {
  const admin = adminNotification(signup);
  const visitor = visitorConfirmation(signup);

  await Promise.allSettled([
    send({
      signupId,
      kind: "admin_notification",
      to: EMAIL_TO_ADMIN,
      // Replying to the notification reaches the person who signed up.
      replyTo: signup.email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    }),
    send({
      signupId,
      kind: "visitor_confirmation",
      to: [signup.email],
      replyTo: EMAIL_REPLY_TO,
      subject: visitor.subject,
      html: visitor.html,
      text: visitor.text,
    }),
  ]);
}
