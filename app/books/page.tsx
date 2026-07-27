import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Books — Jayburtt Dijkhoff" };

export default function BooksPage() {
  return (
    <ComingSoon
      eyebrow="Books & Writing"
      title="The full library, coming soon."
      body="Derechonan di Pashent is out now, with more titles on patient rights and healthcare systems on the way. This page will collect them all."
    />
  );
}
