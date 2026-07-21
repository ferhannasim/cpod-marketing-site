import type { Metadata } from "next";
import Body from "@/content/policies/terms.mdx";
import { Prose } from "@/components/prose";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Custy Shopify product customizer app.",
};

export default function TermsPage() {
  return (
    <main>
      <Prose>
        <h1>Terms of Service</h1>
        <Body />
      </Prose>
    </main>
  );
}
