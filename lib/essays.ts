import fs from "node:fs";
import path from "node:path";

// Essays migrated from the previous Wix blog. Metadata lives here; the full
// article body lives in content/essays/<slug>.md. A post without a body file
// still renders — it shows the excerpt and links onward — so the archive can be
// filled in progressively without anything 404ing.

export type Essay = {
  /**
   * URL segment. For the 16 posts migrated from Wix these MUST stay exactly as
   * they were — the same links are already shared on Facebook and are
   * redirected here from /post/<slug> (see next.config.ts). A few carry legacy
   * "pap-" / "en-" prefixes; leave them alone. New posts should use a clean,
   * prefix-free slug.
   */
  slug: string;
  title: string;
  /** Short summary, shown on cards and as the article standfirst. */
  excerpt: string;
  /** ISO date, first published. */
  date: string;
  minutes: number;
  language: "EN" | "PAP";
  /** Wix media id; resolved to a static.wixstatic.com URL at render time. */
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

import migratedImages from "./essay-images.json";

export const WIX_MEDIA_BASE = "https://static.wixstatic.com/media/";

/**
 * Resolves a cover image URL.
 *
 * Prefers an image already migrated to our own storage (see
 * scripts/migrate-essay-images.mjs), and falls back to the original Wix CDN
 * URL for anything not migrated yet. Once every essay appears in
 * essay-images.json, the site no longer depends on the Wix account existing.
 */
export function essayImageUrl(id?: string, slug?: string): string | null {
  if (slug) {
    const migrated = (migratedImages as Record<string, string>)[slug];
    if (migrated) return migrated;
  }
  return id ? WIX_MEDIA_BASE + id : null;
}

export const ESSAYS: Essay[] = [
  {
    slug: "poco-riesgo-no-ta-cero-riesgo-kico-aruba-mester-di-dvg-pa-hantavirus-aworaki",
    title: "Poco riesgo no ta cero riesgo: Kico Aruba mester di DVG pa Hantavirus aworaki",
    excerpt:
      "E problema mas grandi no ta e brote — ta e credibilidad di DVG. 'No tin motibo di preocupa' no ta calma ningun hende. Pueblo por google. Pero ta na DVG pa boga pa nos.",
    date: "2026-05-08",
    minutes: 5,
    language: "PAP",
    image: "fc4975_5622601282b945c088b3968e72ce06d7~mv2.png",
    imageWidth: 1080,
    imageHeight: 1350,
  },
  {
    slug: "calor-fuerte-ta-yega-prepara-calor-y-secura-2026",
    title: "Calor fuerte ta yega — con pa prepara pa calor y secura 2026",
    excerpt:
      "Un temporada di secura y calor halto ta nos dilanti. Ban tuma pasonan di prevencion pa nos keda fuerte, cuida nos curpa, y cuida esnan vulnerabel y nos naturalesa.",
    date: "2026-05-06",
    minutes: 5,
    language: "PAP",
    image: "fc4975_26f252e237094a7aaca8389b542e8903~mv2.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    slug: "the-elephant-was-never-pink-hospitals-fusion-aruba",
    title: "The Elephant Was Never Pink. It Was Always White",
    excerpt:
      "The truth behind the hospital fusion debate in Aruba. A patient is told their diagnostics must be repeated — not because the first test was wrong, but because the system does not fully recognize itself.",
    date: "2026-05-04",
    minutes: 8,
    language: "EN",
    image: "fc4975_d9e375f8d0f04918b36fc94a5549c006~mv2.png",
    imageWidth: 1402,
    imageHeight: 1122,
  },
  {
    slug: "e-olifanti-no-ta-ros-fusion-hospitalnan-aruba",
    title: "E olifanti no ta ros, e ta blanco: fusion hospitalnan Aruba?",
    excerpt:
      "No tin ningun definicion oficial di loke ta un 'hospital' na Aruba. Bo no por absorba un institucion a base di limitacionnan cu bo mes a yuda crea. E problema no ta subtil. E ta un logica absurdo.",
    date: "2026-05-04",
    minutes: 5,
    language: "PAP",
    image: "fc4975_01945ba6ed294509ace25757ad379a8b~mv2.png",
    imageWidth: 1402,
    imageHeight: 1122,
  },
  {
    slug: "transparencia-den-gobierno-di-aruba",
    title: "Ora gobierno ta “transparente”… pero nos ta keda mal bruha",
    excerpt:
      "Un sistema crea pa “transparencia” por crea mas confusion, dependencia y desigualdad. Si hasta un experto mester para y cuestiona e proceso… kico ta pasa cu e ciudadano vulnerabel?",
    date: "2026-04-22",
    minutes: 3,
    language: "PAP",
    image: "fc4975_31067a5dd654409cb45746b440599f20~mv2.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    slug: "pap-hofa-un-decision-pa-autonomia-berdadero-parti-3-hofa-aruba-sindicatonan",
    title: "HOFA: un decision pa autonomia berdadero (Parti 3) — HOFA Aruba y sindicatonan",
    excerpt:
      "Den Parti 3 di HOFA, mira e rol di sindicatonan: nan ta representa e trahado, pero tambe nan ta wak con decisionnan macro ta afecta autonomia y futuro di nos pais.",
    date: "2026-04-19",
    minutes: 6,
    language: "PAP",
    image: "fc4975_36840255daa9424b83fa9609dd930a9d~mv2.png",
    imageWidth: 1200,
    imageHeight: 630,
  },
  {
    slug: "pap-ora-e-sistema-faya-un-pashent-sin-azv-sin-c-e-sa",
    title: "Ora e sistema faya: un pashent sin AZV, sin c'e sa",
    excerpt:
      "Un pashent a perde su AZV pa un eror administrativo na CENSO. Aunke CENSO a coregi esaki, cobertura no a bolbe automaticamente. Esaki ta aceptabel?",
    date: "2026-04-17",
    minutes: 5,
    language: "PAP",
    image: "fc4975_8df5c2e170374fac9c8d1e584adde97f~mv2.png",
    imageWidth: 1408,
    imageHeight: 683,
  },
  {
    slug: "en-when-systems-don-t-speak-a-patient-left-without-health-coverage",
    title: "When Systems Don’t Speak: A Patient Left Without Health Coverage",
    excerpt:
      "A patient lost his health coverage due to an administrative error. Should citizens navigate complex systems alone, or should systems be designed to guide and protect them?",
    date: "2026-04-17",
    minutes: 5,
    language: "EN",
    image: "fc4975_50edb02a9ed14e9f9cd206d1032d199c~mv2.jpg",
    imageWidth: 2810,
    imageHeight: 1440,
  },
  {
    slug: "proteccion-pa-pashent-cu-aparato-medico-parti-3",
    title: "Proteccion pa pashent cu aparato medico? (Parti 3)",
    excerpt:
      "AZV no ta un pagador neutral. Ora e autorisa, paga y controla e proceso, e tin responsabilidad tambe. Aki ta unda AZV tin e obligacion moral di construi e brug.",
    date: "2026-04-16",
    minutes: 6,
    language: "PAP",
    image: "fc4975_a65ea62d569f4fe09ca2b9846d65e36f~mv2.jpg",
    imageWidth: 2325,
    imageHeight: 1505,
  },
  {
    slug: "mi-pareha-ta-controlami-y-mi-whatsapp-kico-mi-por-haci",
    title: "Mi pareha ta controlami y mi WhatsApp. Kico mi por haci?",
    excerpt:
      "Mi pareha ta controla mi WhatsApp y cu ken mi ta papia. Esaki ta amor… of control? Esaki por ta un forma di violencia psicologico.",
    date: "2026-04-16",
    minutes: 6,
    language: "PAP",
    image: "fc4975_e6858d23de814cb1a23c107935f5fe7d~mv2.jpg",
    imageWidth: 2652,
    imageHeight: 1536,
  },
  {
    slug: "proteccion-pa-pashent-cu-aparato-medico-parti-2",
    title: "Proteccion pa pashent cu aparato medico? (Parti 2)",
    excerpt:
      "Ora un aparato medico no ta traha, e ley civil ta proteha e pashent como consumidor. Pero den practica, ken ta asumi responsabilidad real pa e solucion?",
    date: "2026-04-15",
    minutes: 4,
    language: "PAP",
    image: "fc4975_d8ff75b7abef4a2f913ab3e25eb35d52~mv2.jpg",
    imageWidth: 2487,
    imageHeight: 1536,
  },
  {
    slug: "proteccion-pa-pashent-cu-aparato-medico-parti-1",
    title: "Proteccion pa pashent cu aparato medico? (Parti 1)",
    excerpt:
      "Un pashent cu a perde su pia despues di un amputacion a haya un protesis cu no ta adapta bon. Ki proteccion un pashent tin ora un aparato medico simplemente no ta traha?",
    date: "2026-04-14",
    minutes: 3,
    language: "PAP",
    image: "fc4975_621b7fe2ed1e41a89725eae28a1ae7b0~mv2.jpg",
    imageWidth: 2667,
    imageHeight: 1536,
  },
  {
    slug: "malpractice-101",
    title: "Malpractice 101",
    excerpt:
      "A malpractice case exposed deeper cracks in Aruba’s healthcare system. These are not isolated incidents but signs of structural neglect, fear, and eroding trust.",
    date: "2026-04-14",
    minutes: 5,
    language: "EN",
    image: "fc4975_9132ce6a884c44b1a543007cb7de9fec~mv2.avif",
    imageWidth: 1024,
    imageHeight: 1536,
  },
  {
    slug: "hofa-un-decision-pa-autonomia-berdadero-parti-2",
    title: "HOFA: un decision pa autonomia berdadero (Parti 2)",
    excerpt:
      "After decades of weak financial discipline, the real question is not autonomy versus control, but how to build credible institutions.",
    date: "2026-04-14",
    minutes: 6,
    language: "PAP",
    image: "fc4975_d26eb90884b74241b089ea7db22b802c~mv2.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    slug: "en-hofa-a-decision-for-real-autonomy-part-1",
    title: "HOFA and the Question of Real Autonomy",
    excerpt:
      "Aruba faces a crucial decision: accept Rijkswet HOFA or not. The deeper question is what Aruba has done with its autonomy over the past forty years.",
    date: "2026-04-12",
    minutes: 5,
    language: "EN",
    image: "fc4975_64f9fd9736ca40a9a4f81a1df4869c2a~mv2.png",
    imageWidth: 1582,
    imageHeight: 1685,
  },
  {
    slug: "hofa-un-decision-pa-autonomia-berdadero-parti-1",
    title: "HOFA: un decision pa autonomia berdadero (Parti 1)",
    excerpt:
      "Aruba ta para dilanti un decision importante: Acepta Rijkswet HOFA, si of no? Awor kico e ta: un menasa of un bendicion disfrasa?",
    date: "2026-04-09",
    minutes: 4,
    language: "PAP",
    image: "fc4975_77911a9d6e7e4285a9c9bc71392fa82e~mv2.jpg",
    imageWidth: 2574,
    imageHeight: 1536,
  },
];

export function getEssay(slug: string): Essay | undefined {
  return ESSAYS.find((e) => e.slug === slug);
}

/** Reads the article body from content/essays/<slug>.md, or null if not yet migrated. */
export function getEssayBody(slug: string): string | null {
  try {
    const file = path.join(process.cwd(), "content", "essays", `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, "utf8").trim();
    return raw || null;
  } catch {
    return null;
  }
}
