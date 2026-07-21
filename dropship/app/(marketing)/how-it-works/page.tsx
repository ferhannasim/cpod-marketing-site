import type { Metadata } from "next";
import Link from "next/link";
import { AppCta } from "@/components/app-cta";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "How It Works",
  description: "The five steps from blank product to shipped order with DropShipPOD.",
};

const steps = [
  {
    label: "Pick your products",
    detail:
      "Browse our catalog of blanks from Gildan, Bella + Canvas, Comfort Colors, American Apparel and more — t-shirts, hoodies, sweatshirts, caps and drinkware, all stocked in Canada.",
  },
  {
    label: "Choose colors and sizes",
    detail:
      "Pick the colorways that fit your brand and the size range you want to offer. Check the size charts to make sure every product fits the way your customers expect.",
  },
  {
    label: "Upload your design",
    detail:
      "Send print-ready artwork or choose from our design library. Every file goes through artwork and mockup approval before it prints, so nothing ships that you haven't seen.",
  },
  {
    label: "Connect your store — or order direct",
    detail:
      "Install the DropShipPOD Shopify app and orders flow straight to production automatically. No store yet? Order directly for events, teams and one-off runs.",
  },
  {
    label: "We print, pack & ship",
    detail:
      "Your order is produced in Canada with DTG, DTF or sublimation, then packed and shipped to your customer — ground delivery in 1–5 business days, express in 1–2.",
  },
];

const resources = [
  { label: "Delivery speed", href: "/delivery" },
  { label: "Artwork & mockup approval", href: "/artwork-approval" },
  { label: "Size charts", href: "/size-charts" },
  { label: "Printing FAQs", href: "/faq" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="How It Works"
        lede="Five steps from blank product to shipped order — no inventory, no equipment, no tech headaches."
      />
      <Container className="py-12 sm:py-16">
        <ol className="relative max-w-3xl space-y-10 border-l-2 border-ink-tint pl-8">
          {steps.map((step, index) => (
            <li key={step.label} data-step={index + 1} className="relative">
              <span
                aria-hidden
                className="absolute -left-[3.05rem] grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white ring-4 ring-white"
              >
                {index + 1}
              </span>
              <h2 className="font-display text-xl font-bold text-ink">{step.label}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-zinc-600">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-sm text-zinc-500">
          If you run into any difficulty at any step, give us a call — our friendly staff is always
          eager and ready to help.
        </p>
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-ink">Good to know</h2>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  {resource.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12">
          <AppCta />
        </div>
      </Container>
    </>
  );
}
