import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/lander";
import { helpCategories, helpHub } from "@/content/help";
import { APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Centre",
  description:
    "Plain guides for print shop owners: add Custy, turn it on in your theme, set up products, and learn the Design Lab — one step at a time.",
};

export default function HelpHubPage() {
  return (
    <div>
      <header className="max-w-[720px]">
        <p className="text-[13px] font-semibold tracking-widest text-muted uppercase">Help</p>
        <h1 className="mt-2 text-[clamp(1.85rem,3.6vw,2.75rem)] leading-tight font-extrabold text-ink">
          {helpHub.title}
        </h1>
        <div className="mt-4 space-y-3 text-[16px] leading-[1.65] text-body">
          {helpHub.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-[clamp(1.35rem,2.4vw,1.7rem)] font-extrabold text-ink">
          {helpHub.pathTitle}
        </h2>
        <p className="mt-2 max-w-[640px] text-[15.5px] leading-[1.65] text-body">{helpHub.pathLead}</p>
        <ol className="mt-6 space-y-3">
          {helpHub.pathSteps.map((step, index) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.12)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[16px] font-semibold text-ink">{step.title}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-6 text-body">{step.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-[clamp(1.35rem,2.4vw,1.7rem)] font-extrabold text-ink">Browse by category</h2>
        <div className="mt-6 grid gap-4">
          {helpCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.12)]"
            >
              <p className="text-[13px] font-semibold tracking-widest text-muted uppercase">
                {category.overviewArticles.length +
                  category.subCategories.reduce((sum, sub) => sum + sub.articles.length, 0)}{" "}
                guides
              </p>
              <h3 className="mt-2 text-[20px] font-bold text-ink">{category.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-body">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          href="/faq"
          className="rounded-2xl border border-line bg-lander-light p-5 transition-colors hover:bg-white"
        >
          <h3 className="text-[16px] font-semibold text-ink">FAQ</h3>
          <p className="mt-1 text-[14.5px] text-body">
            Short answers on plans, fulfillment, and common setup questions.
          </p>
        </Link>
        <Link
          href="/about#contact"
          className="rounded-2xl border border-line bg-lander-light p-5 transition-colors hover:bg-white"
        >
          <h3 className="text-[16px] font-semibold text-ink">Contact</h3>
          <p className="mt-1 text-[14.5px] text-body">
            Reach the Custy team when a guide does not cover your store.
          </p>
        </Link>
      </section>

      <div className="mt-14">
        <CtaBand
          title="Ready to install Custy?"
          text="Open the Shopify App Store listing and follow Getting Started from install through pricing."
          cta={{ label: "Install Custy on Shopify", href: APP_URL, variant: "light" }}
          secondaryCta={{ label: "Start with Getting Started", href: "/help/getting-started", variant: "outline" }}
        />
      </div>
    </div>
  );
}
