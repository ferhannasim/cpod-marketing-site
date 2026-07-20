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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
