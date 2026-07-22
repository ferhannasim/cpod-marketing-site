import { Container } from "@/components/container";
import { RichSection } from "@/components/sections/rich-section";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { StepsTeaser } from "@/components/sections/steps-teaser";
import { MediaWithContent } from "@/components/sections/media-with-content";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { Faq } from "@/components/sections/faq";
import { BlogTeasers } from "@/components/sections/blog-teasers";
import { CtaBand } from "@/components/lander";
import { home } from "@/content/home";
import { features } from "@/content/features";
import { howItWorks } from "@/content/how-it-works";
import { pricing } from "@/content/pricing";
import { posts } from "@/content/posts";

export default function HomePage() {
  return (
    <main>
      <RichSection block={home.intro} scheme="bg-scheme1-bg" imagePosition="left" headingLevel="h1" />
      <FeatureHighlights cards={(features.sections[0].cards ?? []).slice(0, 6)} />
      <StepsTeaser steps={howItWorks.stepsSection.steps.slice(0, 4)} />
      <MediaWithContent media={home.media} />
      <PricingTeaser plans={pricing.plans} />
      <Faq items={pricing.faq.items} />
      <BlogTeasers heading="Custy Blog" posts={posts} />
      <Container className="pb-14">
        <CtaBand
          title={home.closing.title}
          text={home.closing.text}
          cta={home.closing.cta}
          secondaryCta={home.closing.secondaryCta}
        />
      </Container>
    </main>
  );
}
