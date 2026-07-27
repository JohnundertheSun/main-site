import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Speaking — Jayburtt Dijkhoff" };

export default function SpeakingPage() {
  return (
    <ComingSoon
      eyebrow="On Stage"
      title="Full speaking topics, coming soon."
      body="The complete lineup of keynotes, workshops, and master classes is on its way. In the meantime, reach out directly to discuss booking Jayburtt for your event."
    />
  );
}
