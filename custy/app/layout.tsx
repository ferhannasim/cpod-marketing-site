import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { socialLinks } from "@/lib/nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const TITLE = "Custy | Best Shopify POD Customizer App for T-Shirts, Caps & Apparel";
const DESCRIPTION =
  "Custy is a powerful Shopify product customizer app for POD stores. Enable multi-side design, dynamic pricing, DTG/DTF printing, and boost sales easily.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Custy",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/images/og-card.png", width: 1200, height: 630, alt: "Custy" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: socialLinks.map((s) => s.href),
  };

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
