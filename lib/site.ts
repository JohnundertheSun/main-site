/**
 * Canonical origin for the site.
 *
 * Used for metadataBase, canonical URLs, Open Graph tags and the sitemap.
 * Override with NEXT_PUBLIC_SITE_URL on preview deployments so shared links
 * from a preview point at the preview, not production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jayburttdijkhoff.com"
).replace(/\/$/, "");
