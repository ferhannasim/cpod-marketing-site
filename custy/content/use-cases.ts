import type { CardItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export const useCasesHero = {
  eyebrow: "Use cases",
  title: "Who sells with Custy",
  lead: [
    "Personalization isn't one niche — it's a capability that lifts stores across categories. If your customers would love a product with their name, their team, or their artwork on it, Custy fits.",
  ],
  ctas: [
    { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
    { label: "See the Design Lab", href: "/design-lab", variant: "secondary" as const },
  ],
};

export const audiences: CardItem[] = [
  {
    icon: "store",
    title: "Print-on-demand stores",
    text: "Let shoppers design t-shirts, hoodies and caps in real time, with dynamic pricing by print method, side count and product options.",
  },
  {
    icon: "shirt",
    title: "Apparel brands",
    text: "Offer names, numbers and monograms on your existing line without new SKUs — every design becomes structured order data.",
  },
  {
    icon: "trending-up",
    title: "Team & event merch",
    text: "Jerseys, tournament tees and event shirts with per-size pricing, quantity discounts and an approval step before anything prints.",
  },
  {
    icon: "gift",
    title: "Promo products",
    text: "Mugs, totes and giveaways with customer logos — quote-by-email workflows and buy-blank options included.",
  },
];

export const niches: CardItem[] = [
  { icon: "sparkles", title: "Athletic, College & Greek", text: "Spirit wear and chapter apparel shoppers proudly co-design." },
  { icon: "gift", title: "Weddings & Events", text: "Bachelorette crews, birthdays and reunions — one design, many names." },
  { icon: "shield-check", title: "Military", text: "Unit pride and homecoming pieces with details that matter." },
  { icon: "trending-up", title: "Sports & Teams", text: "Names and numbers on jerseys, priced per size range." },
  { icon: "calendar-check", title: "Religious & Community", text: "Youth groups and church events with easy group orders." },
  { icon: "circle-dollar-sign", title: "Fundraising & Charity", text: "Awareness merch where quantity discounts do the heavy lifting." },
  { icon: "zap", title: "First Responders", text: "Station wear and appreciation runs, customized per crew." },
  { icon: "calendar-check", title: "Holidays", text: "Seasonal personalization spikes — be ready before the rush." },
];

export const useCasesCta = {
  title: "Your store, their designs",
  text: "Whatever you sell, personalization raises engagement and order value. Flag your first product as customizable today.",
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
  secondaryCta: { label: "View pricing", href: "/pricing", variant: "secondary" as const },
};
