import "server-only";
import { SITE_URL } from "@/lib/site";
import { getCourse } from "@/lib/courses";

/**
 * Email templates.
 *
 * Written as plain string HTML with inline styles on purpose. Email clients
 * strip <style> blocks, ignore most modern CSS and do not run JavaScript, so
 * the design vocabulary here is deliberately narrower than the site's: tables
 * for layout, inline styles for everything, and web-safe font stacks with the
 * brand serif as a first choice that gracefully falls back.
 *
 * Every template returns both html and text. Plain text is not optional —
 * without it, spam filters score the message worse and some clients show
 * nothing at all.
 */

const INK = "#201c14";
const ACCENT = "#c65a35";
const CREAM = "#f5ecdc";
const CREAM_LINE = "#e8dcc2";
const OFFWHITE = "#fffaf0";
const MUTED = "#5c5546";
const FAINT = "#8a8272";

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Escapes user-supplied text before it goes anywhere near the HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Shared shell: cream page, offwhite card, wordmark, footer. */
function layout(options: { heading: string; preheader: string; body: string }): string {
  const { heading, preheader, body } = options;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};">
  <!-- Preheader: the grey line clients show next to the subject. Hidden in the body. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CREAM};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <tr>
            <td style="padding:0 0 20px;font-family:${SERIF};font-size:19px;font-weight:700;color:${INK};">
              Jayburtt Dijkhoff
            </td>
          </tr>

          <tr>
            <td style="background:${OFFWHITE};border-radius:16px;padding:36px 32px;">
              <h1 style="margin:0 0 18px;font-family:${SERIF};font-size:24px;line-height:1.3;font-weight:600;color:${INK};">
                ${escapeHtml(heading)}
              </h1>
              ${body}
            </td>
          </tr>

          <tr>
            <td style="padding:22px 4px 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${FAINT};">
              Sent from <a href="${SITE_URL}" style="color:${FAINT};">jayburttdijkhoff.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 14px;font-family:${SANS};font-size:15px;line-height:1.65;color:${MUTED};">${text}</p>`;
}

/** Label/value rows for the admin notification. */
function detailRows(rows: Array<[string, string | null | undefined]>): string {
  const cells = rows
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid ${CREAM_LINE};font-family:${SANS};font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:${FAINT};white-space:nowrap;vertical-align:top;width:34%;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:9px 0 9px 14px;border-bottom:1px solid ${CREAM_LINE};font-family:${SANS};font-size:15px;line-height:1.55;color:${INK};white-space:pre-wrap;">
            ${escapeHtml(String(value))}
          </td>
        </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 24px;">${cells}</table>`;
}

function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:${ACCENT};color:#ffffff;font-family:${SANS};font-size:15px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:999px;">${escapeHtml(label)}</a>`;
}

export type SignupDetails = {
  program: string;
  programLabel: string;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  reason?: string | null;
  notes?: string | null;
  sourcePath?: string | null;
};

/**
 * Goes to Jayburtt. Optimised for triage on a phone: who, what, and a reply
 * address that works with a single tap.
 */
export function adminNotification(signup: SignupDetails): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New ${signup.programLabel.toLowerCase()} — ${signup.name}`;

  const html = layout({
    heading: `New ${signup.programLabel.toLowerCase()}`,
    preheader: `${signup.name} · ${signup.email}`,
    body:
      detailRows([
        ["Name", signup.name],
        ["Email", signup.email],
        ["Phone", signup.phone],
        ["Organization", signup.organization],
        ["About", signup.reason],
        ["From page", signup.sourcePath],
        ["Message", signup.notes],
      ]) +
      paragraph("Reply straight to this email to reach them directly.") +
      button("Open all signups", `${SITE_URL}/admin/signups`),
  });

  const text = [
    `New ${signup.programLabel.toLowerCase()}`,
    "",
    `Name: ${signup.name}`,
    `Email: ${signup.email}`,
    signup.phone ? `Phone: ${signup.phone}` : null,
    signup.organization ? `Organization: ${signup.organization}` : null,
    signup.reason ? `About: ${signup.reason}` : null,
    signup.sourcePath ? `From page: ${signup.sourcePath}` : null,
    signup.notes ? `\nMessage:\n${signup.notes}` : null,
    "",
    "Reply straight to this email to reach them directly.",
    `All signups: ${SITE_URL}/admin/signups`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}

/**
 * Goes to the person who filled in the form.
 *
 * Deliberately short and specific. It confirms what they signed up for and
 * sets an expectation about what happens next, because the site takes no
 * payment yet — follow-up is manual, and silence after a form reads as broken.
 */
export function visitorConfirmation(signup: SignupDetails): {
  subject: string;
  html: string;
  text: string;
} {
  const isContact = signup.program === "contact";
  const isAgenda = signup.program === "course-agenda";

  const firstName = signup.name.trim().split(/\s+/)[0] || "there";

  const subject = isContact
    ? "Thanks for reaching out"
    : isAgenda
      ? "You're on the course agenda list"
      : `You're on the list for ${signup.programLabel}`;

  const heading = isContact
    ? "Message received"
    : isAgenda
      ? "You're on the agenda list"
      : "You're on the list";

  const lead = isContact
    ? `Thanks for getting in touch. Your message has landed and Jayburtt will come back to you personally, usually within a couple of working days.`
    : isAgenda
      ? `Thanks ${escapeHtml(firstName)} — you'll be the first to hear when new course dates and founding-cohort places open up.`
      : `Thanks ${escapeHtml(firstName)}. Your place for <strong style="color:${INK};">${escapeHtml(signup.programLabel)}</strong> is reserved while we get in touch with the details.`;

  // A course with a pay link can be paid for right now; one without still gets
  // the manual follow-up promise, so neither case reads as a dead end.
  const payUrl = isContact || isAgenda ? undefined : getCourse(signup.program)?.paymentUrl;

  const next = isContact
    ? null
    : isAgenda
      ? null
      : payUrl
        ? `One step is left: complete the payment below and your access is confirmed. Nothing has been charged yet.`
        : `The next step is a secure payment link, sent to this address, which confirms your enrollment. Nothing has been charged yet.`;

  const html = layout({
    heading,
    preheader: subject,
    body:
      paragraph(lead) +
      (next ? paragraph(next) : "") +
      paragraph("If any of this looks wrong, just reply to this email.") +
      (payUrl ? button("Complete your payment", payUrl) : button("Back to the site", SITE_URL)),
  });

  const text = [
    heading,
    "",
    isContact
      ? "Thanks for getting in touch. Your message has landed and Jayburtt will come back to you personally, usually within a couple of working days."
      : isAgenda
        ? `Thanks ${firstName} — you'll be the first to hear when new course dates and founding-cohort places open up.`
        : `Thanks ${firstName}. Your place for ${signup.programLabel} is reserved while we get in touch with the details.`,
    next ? `\n${next}` : null,
    "",
    "If any of this looks wrong, just reply to this email.",
    payUrl ? `Complete your payment: ${payUrl}` : SITE_URL,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
}
