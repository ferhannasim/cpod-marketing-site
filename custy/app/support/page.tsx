import type { Metadata } from "next";
import Body from "@/content/pages/support.mdx";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with the Custy Shopify product customizer app.",
};

export default function SupportPage() {
  return (
    <main>
      <Prose>
        <h1>Support</h1>
        <Body />
      </Prose>
    </main>
  );
}
