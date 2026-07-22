import type { Metadata } from "next";
import Body from "@/content/policies/privacy.mdx";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Custy Shopify product customizer app.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Prose>
        <h1>Privacy Policy</h1>
        <Body />
      </Prose>
    </main>
  );
}
