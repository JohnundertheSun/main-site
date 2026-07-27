import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Consulting — Jayburtt Dijkhoff" };

export default function ConsultingPage() {
  return (
    <ComingSoon
      eyebrow="For Organizations"
      title="Consulting details, coming soon."
      body="Direct advisory for healthcare institutions and Dutch providers on governance, recognition pathways, and quality systems. Reach out to discuss your organization's needs today."
    />
  );
}
