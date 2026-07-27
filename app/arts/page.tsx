import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Arts — Jayburtt Dijkhoff" };

export default function ArtsPage() {
  return (
    <ComingSoon
      eyebrow="Beyond the Systems"
      title="Poetry and music, coming soon."
      body="Jayburtt's creative work explores the same questions as his professional life, in a different voice. This page will host it soon."
    />
  );
}
