import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/courses";
import { ESSAYS } from "@/lib/essays";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap, so search engines re-index the new URLs quickly after the move off
 * Wix. The old /post/<slug> links 301 to /essays/<slug>, and listing the new
 * URLs here is what tells Google to transfer the ranking rather than treat
 * them as new pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/courses",
    "/in-house-training",
    "/performances",
    "/books-and-ideas",
    "/advisory",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const courses = COURSES.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const essays = ESSAYS.map((essay) => ({
    url: `${SITE_URL}/essays/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...courses, ...essays];
}
