import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Insights — Jayburtt Dijkhoff" };

export default function InsightsPage() {
  return (
    <ComingSoon
      eyebrow="The Blog"
      title="Health. Law. Reflection. Coming soon."
      body="Full-length articles on healthcare, law, and reflection across the ABC islands and the Netherlands are on the way."
    />
  );
}
