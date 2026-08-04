// Course catalogue.
//
// This is the single source of truth for both the /courses index and the
// /courses/[slug] page template. Adding a course = adding an object here;
// no new page files needed.
//
// Courses marked status: "coming-soon" render as development cards without a
// buy path, so nothing looks purchasable before it actually is.

export type CourseLanguage = "NL" | "EN" | "PAP";

export type Course = {
  slug: string;
  title: string;
  /** Translated or explanatory subtitle, shown under the title. */
  subtitle?: string;
  language: CourseLanguage;
  /** e.g. "Self-paced online", "Live masterclass" */
  format: string;
  duration?: string;
  /** Omit while a course is still being built. */
  price?: string;
  status: "available" | "coming-soon";
  /** One-paragraph pitch, used on both the index card and the detail page. */
  summary: string;
  /** Bullet points for the "What you'll learn" section. */
  learn: string[];
  audience?: string;
  /** Path under /public, or omit for the neutral placeholder treatment. */
  image?: string;
};

export const LANGUAGE_LABELS: Record<CourseLanguage, string> = {
  NL: "Nederlands",
  EN: "English",
  PAP: "Papiamento",
};

export const COURSES: Course[] = [
  {
    slug: "yabinan-di-poder",
    title: "Yabinan di Poder",
    subtitle: "Keys of Power",
    language: "PAP",
    format: "Self-paced online",
    duration: "Pre-recorded modules",
    price: "AWG 50",
    status: "available",
    summary:
      "Concrete, practical steps to know your rights as a citizen, and to get real movement on your case. Originally taught live across Aruba as a masterclass and workshop, now available to follow at your own pace.",
    learn: [
      "Assume your position: concrete steps that get movement on your case right away",
      "Know your rights as a citizen, and where the line actually is",
      "Read how institutions really make decisions, so you stop guessing",
      "Turn what you know into results: heard requests and resolved cases",
    ],
    audience:
      "Anyone facing a system with more power than they have — government offices, healthcare institutions, insurance, or employers.",
    image: "/images/portrait-speaking.png",
  },

  // ---------------------------------------------------------------------
  // TODO (Jayburtt): the first three Dutch-language short courses.
  // Titles and copy below are working drafts — replace with the real
  // content. They render as "In development" until status is flipped to
  // "available" and a price is added.
  // ---------------------------------------------------------------------
  {
    slug: "je-rechten-als-patient",
    title: "Je Rechten als Patiënt",
    subtitle: "Your Rights as a Patient",
    language: "NL",
    format: "Self-paced online",
    status: "coming-soon",
    summary:
      "A clear-language course on what you are actually entitled to in the healthcare system, how to ask for it, and what to do when you are not heard.",
    learn: [
      "The rights every patient holds, in plain language",
      "How to exercise them without needing a lawyer",
      "What to do when a provider or institution falls short",
    ],
    audience: "Patients and families in the Netherlands and the Dutch Caribbean.",
  },
  {
    slug: "grenzen-en-autonomie",
    title: "Grenzen en Autonomie",
    subtitle: "Boundaries and Autonomy",
    language: "NL",
    format: "Self-paced online",
    status: "coming-soon",
    summary:
      "Not every form of control looks like force. This course helps you recognise subtle patterns of control, understand what is happening, and reclaim your autonomy step by step.",
    learn: [
      "Recognise everyday patterns of control and how they work",
      "Your right to privacy and freedom, also inside a relationship",
      "Practical, safe steps to recover your personal space",
    ],
    audience: "Anyone who senses something is not right but cannot yet name it.",
  },
  {
    slug: "navigeren-door-het-systeem",
    title: "Navigeren door het Systeem",
    subtitle: "Navigating the System",
    language: "NL",
    format: "Live masterclass",
    status: "coming-soon",
    summary:
      "How governance, regulation and institutional decision-making actually function across the Kingdom, and how to work with them rather than against them.",
    learn: [
      "How decisions really get made inside institutions",
      "Where Dutch and Caribbean rules meet, and where they differ",
      "How to position a request so it actually lands",
    ],
    audience: "Professionals working between the Netherlands and the Caribbean.",
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function coursesByLanguage(language: CourseLanguage): Course[] {
  return COURSES.filter((c) => c.language === language);
}

/** Languages that actually have courses, in display order. */
export function activeLanguages(): CourseLanguage[] {
  const order: CourseLanguage[] = ["NL", "EN", "PAP"];
  return order.filter((l) => COURSES.some((c) => c.language === l));
}
