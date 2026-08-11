import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const DESCRIPTION =
  "Short courses, professional training, public speaking and artistic performance by Dr. Jayburtt Dijkhoff — across the Netherlands and the Dutch Caribbean.";

export const metadata: Metadata = {
  // metadataBase makes every relative canonical/Open Graph URL below resolve to
  // an absolute one. Facebook and LinkedIn reject relative og:image values, so
  // without this, shared links render without a preview image.
  metadataBase: new URL(SITE_URL),
  title: "Jayburtt Dijkhoff — Ideas That Move People and Systems",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Jayburtt Dijkhoff",
    locale: "en_US",
    url: "/",
    title: "Jayburtt Dijkhoff — Ideas That Move People and Systems",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${newsreader.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
