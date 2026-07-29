import Link from "next/link";
import {
  CardGrid, CtaBand, HighlightCard, LanderHero, LanderSection,
} from "@/components/lander";
import { CustyPitch } from "@/components/sections/custy-pitch";
import { ShippingBand } from "@/components/sections/shipping-band";
import { LogoWall } from "@/components/logo-wall";
import { TestimonialList } from "@/components/testimonial-list";
import { StepList } from "@/components/step-list";
import { VideoEmbed } from "@/components/video-embed";
import { featuredVideo } from "@/content/videos";
import {
  catalogTeaser, economics, faqTeaser, finalCta, fulfillmentModes, hero, heroHighlight,
  printMethods, valueProps,
} from "@/content/home";

export default function HomePage() {
  return (
    <>
      <LanderHero {...hero} highlight={<HighlightCard {...heroHighlight} />} />
      <LanderSection tone="light" id="how-it-works" eyebrow="Five easy steps" title="How it works">
        <StepList />
        <div className="mt-8 text-center">
          <Link href="/how-it-works" className="text-sm font-semibold text-brand hover:text-brand-dark">
            See the full walkthrough
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Built for sellers" title="Sell without stock"
        lead="Everything between the sale and the doorstep is handled for you.">
        <CardGrid items={valueProps} columns={3} />
      </LanderSection>
      <LanderSection tone="light" eyebrow="Simple economics" title="Simple economics, no subscription"
        lead="Three numbers decide your business — and you control the middle one.">
        <CardGrid items={economics} columns={3} align="center" />
        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-brand hover:text-brand-dark">
            See how pricing works
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Print quality" title="Four ways to print"
        lead="300 DPI print-ready artwork, produced with the method that suits each product.">
        <CardGrid items={printMethods} columns={4} />
      </LanderSection>
      <LanderSection tone="light" id="catalog" eyebrow="The catalog" title="100+ blanks ready for your designs">
        <CardGrid items={catalogTeaser} columns={4} align="center" />
        <div className="mt-10">
          <LogoWall />
        </div>
        <div className="mt-8 text-center">
          <Link href="/catalog" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Browse the catalog
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="You stay in control" title="Fulfillment, your way">
        <CardGrid items={fulfillmentModes} columns={2} align="center" className="mx-auto max-w-[760px]" />
      </LanderSection>
      <LanderSection tone="light" id="reviews" eyebrow="Reviews" title="What sellers say">
        <TestimonialList />
      </LanderSection>
      <CustyPitch />
      <LanderSection tone="light" eyebrow="Watch" title="See the platform in action">
        <div className="mx-auto max-w-[880px]">
          <VideoEmbed id={featuredVideo.id} title={featuredVideo.title} />
        </div>
        <div className="mt-8 text-center">
          <Link href="/videos" className="text-sm font-semibold text-brand hover:text-brand-dark">
            Visit the video library
          </Link>
        </div>
      </LanderSection>
      <LanderSection eyebrow="Questions" title="Answers before you ask">
        <ul className="mx-auto grid max-w-[880px] gap-3 md:grid-cols-2">
          {faqTeaser.map((item) => (
            <li key={item.href}>
              <Link href={item.href}
                className="block rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-[15px] font-semibold text-ink transition-colors hover:border-zinc-300">
                {item.question}
              </Link>
            </li>
          ))}
        </ul>
      </LanderSection>
      <ShippingBand />
      <LanderSection>
        <CtaBand {...finalCta} />
      </LanderSection>
    </>
  );
}
