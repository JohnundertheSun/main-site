#!/usr/bin/env node
/**
 * Migrates essay cover images off the Wix CDN and into Supabase Storage.
 *
 * Why this is a script and not part of the build: static.wixstatic.com is only
 * reachable from a normal network, and the upload needs the service-role key,
 * which never belongs in the browser or in CI output.
 *
 * Run it once (and again whenever a new essay is added):
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run migrate:images
 *
 * or just `npm run migrate:images` if those live in .env.local.
 *
 * It is safe to re-run. Images already present in lib/essay-images.json are
 * skipped unless you pass --force.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ESSAYS_TS = path.join(ROOT, "lib", "essays.ts");
const OUT_JSON = path.join(ROOT, "lib", "essay-images.json");
const BUCKET = "essay-images";
const WIX_BASE = "https://static.wixstatic.com/media/";

const FORCE = process.argv.includes("--force");

/* ------------------------------------------------------------------ env --- */

// Load .env.local / .env so the script works with no exported variables.
for (const name of [".env.local", ".env"]) {
  const file = path.join(ROOT, name);
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing credentials.\n\n" +
      "  SUPABASE_URL              = https://<project-ref>.supabase.co\n" +
      "  SUPABASE_SERVICE_ROLE_KEY = the service_role key (Project Settings → API)\n\n" +
      "Put them in .env.local or export them before running this script.\n" +
      "The service_role key bypasses RLS — never commit it, never ship it to the browser."
  );
  process.exit(1);
}

/* --------------------------------------------------------------- essays --- */

/**
 * Pulls { slug, image } out of lib/essays.ts. Reading the TypeScript source
 * keeps a single source of truth — no parallel list to forget to update.
 */
function readEssays() {
  const source = fs.readFileSync(ESSAYS_TS, "utf8");
  const body = source.slice(source.indexOf("export const ESSAYS"));
  const essays = [];
  const objectPattern = /\{([^{}]*)\}/g;
  let match;
  while ((match = objectPattern.exec(body))) {
    const block = match[1];
    const slug = /slug:\s*"([^"]+)"/.exec(block)?.[1];
    const image = /image:\s*"([^"]+)"/.exec(block)?.[1];
    if (slug && image) essays.push({ slug, image });
  }
  return essays;
}

const EXTENSIONS = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

/** Wix ids look like `fc4975_abc123~mv2.png` — the real extension is on the end. */
function extensionOf(wixId) {
  const dot = wixId.lastIndexOf(".");
  const ext = dot === -1 ? "" : wixId.slice(dot).toLowerCase();
  return EXTENSIONS[ext] ? ext : ".jpg";
}

/* -------------------------------------------------------------- migrate --- */

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

async function ensureBucket() {
  const { data, error } = await supabase.storage.getBucket(BUCKET);
  if (data && !error) {
    if (!data.public) {
      console.log(`Bucket "${BUCKET}" exists but is private — making it public.`);
      await supabase.storage.updateBucket(BUCKET, { public: true });
    }
    return;
  }
  console.log(`Creating public bucket "${BUCKET}"…`);
  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: "20MB",
  });
  if (createError) throw new Error(`Could not create bucket: ${createError.message}`);
}

async function download(url) {
  const response = await fetch(url, {
    headers: {
      // Wix serves 403 to clients without a browser-shaped request.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      Accept: "image/avif,image/webp,image/png,image/*,*/*;q=0.8",
      Referer: "https://www.jayburttdijkhoff.com/",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

/* --------------------------------------------------------- brand assets --- */

// The logo from the Wix site, so the browser tab keeps the icon Jayburtt's
// readers already recognise. Next.js uses app/icon.png as the favicon
// automatically, but the file has to exist locally — it can't be a remote URL.
const LOGO_WIX_ID = "fc4975_5997414a6f0141b0b5a1426b2daa5e44~mv2.png"; // "LOGO JD.png", 800x800

async function migrateBrandAssets() {
  const iconPng = path.join(ROOT, "app", "icon.png");
  const iconTsx = path.join(ROOT, "app", "icon.tsx");
  const publicLogo = path.join(ROOT, "public", "images", "logo-jd.png");

  if (fs.existsSync(iconPng) && !FORCE) {
    console.log("→ favicon … already migrated, skipping");
    return;
  }

  try {
    process.stdout.write("→ favicon (LOGO JD.png) … ");
    const bytes = await download(WIX_BASE + LOGO_WIX_ID);

    fs.writeFileSync(iconPng, bytes);
    fs.mkdirSync(path.dirname(publicLogo), { recursive: true });
    fs.writeFileSync(publicLogo, bytes);

    // Only drop the generated placeholder once the real icon is on disk —
    // Next.js errors if both app/icon.png and app/icon.tsx exist.
    if (fs.existsSync(iconTsx)) fs.rmSync(iconTsx);

    console.log(`${(bytes.length / 1024).toFixed(0)} KB ✓  (app/icon.png, public/images/logo-jd.png)`);
  } catch (error) {
    console.log(`failed — ${error.message}`);
    console.log("   Keeping the generated placeholder icon for now.");
  }
}

async function main() {
  const essays = readEssays();
  if (!essays.length) {
    console.error("No essays with images found in lib/essays.ts — nothing to do.");
    process.exit(1);
  }

  await ensureBucket();

  const existing = fs.existsSync(OUT_JSON)
    ? JSON.parse(fs.readFileSync(OUT_JSON, "utf8"))
    : {};
  const mapping = { ...existing };

  let migrated = 0;
  let skipped = 0;
  const failures = [];

  for (const { slug, image } of essays) {
    if (mapping[slug] && !FORCE) {
      skipped += 1;
      continue;
    }

    const ext = extensionOf(image);
    const target = `${slug}${ext}`;

    try {
      process.stdout.write(`→ ${slug} … `);
      const bytes = await download(WIX_BASE + image);

      const { error } = await supabase.storage.from(BUCKET).upload(target, bytes, {
        contentType: EXTENSIONS[ext],
        cacheControl: "31536000",
        upsert: true,
      });
      if (error) throw new Error(error.message);

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(target);
      mapping[slug] = data.publicUrl;
      migrated += 1;
      console.log(`${(bytes.length / 1024).toFixed(0)} KB ✓`);
    } catch (error) {
      console.log(`failed — ${error.message}`);
      failures.push({ slug, reason: error.message });
    }
  }

  // Write whatever succeeded, so a partial run is still progress.
  const sorted = Object.fromEntries(Object.keys(mapping).sort().map((k) => [k, mapping[k]]));
  fs.writeFileSync(OUT_JSON, JSON.stringify(sorted, null, 2) + "\n");

  console.log(
    `\nMigrated ${migrated}, skipped ${skipped} (already done), failed ${failures.length}.`
  );
  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}.`);
  if (failures.length) {
    console.log("\nFailures:");
    for (const { slug, reason } of failures) console.log(`  ${slug}: ${reason}`);
  }
  await migrateBrandAssets();

  console.log("\nNext: commit lib/essay-images.json, app/icon.png and public/images/, then redeploy.");
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
