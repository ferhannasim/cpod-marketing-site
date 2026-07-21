import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://custyapp.com"),
  title: {
    default: "Custy | Best Shopify POD Customizer App for T-Shirts, Caps & Apparel",
    template: "%s | Custy",
  },
  description:
    "Custy is a next-generation Shopify product customizer built for print-on-demand businesses. Let customers personalize t-shirts, caps and apparel in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
