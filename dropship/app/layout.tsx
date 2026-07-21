import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dropshippod.ca"),
  title: {
    default: "DropShipPOD — Print-on-Demand Dropshipping in Canada",
    template: "%s | DropShipPOD",
  },
  description:
    "DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app. We print, pack and ship your custom apparel — no inventory, no tech headaches.",
  openGraph: {
    title: "DropShipPOD — Print-on-Demand Dropshipping in Canada",
    description:
      "DropShipPOD is a Canadian print-on-demand dropshipping service and Shopify app. We print, pack and ship your custom apparel — no inventory, no tech headaches.",
    url: "https://dropshippod.ca",
    siteName: "DropShipPOD",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "DropShipPOD — Your Brand. Your Platform.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DropShipPOD",
    url: "https://dropshippod.ca",
    logo: "https://dropshippod.ca/images/logo.png",
    sameAs: [
      "https://www.facebook.com/CheapestPrintOnDemand/",
      "https://www.instagram.com/cheapestprintondemand/",
      "https://www.tiktok.com/@cheapest.print.on.demand",
      "https://www.youtube.com/@DropShipPOD",
    ],
  };

  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
