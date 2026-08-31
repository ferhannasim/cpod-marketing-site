import type { CardItem } from "@/components/lander";
import { APP_URL } from "@/lib/site";

export const useCasesHero = {
  eyebrow: "Use cases",
  title: "Who sells with Custy",
  lead: [
    "Personalization isn't one niche. It's a capability that lifts stores across categories. If your customers would love a product with their name, their team, or their artwork on it, Custy fits.",
    "Apparel brands, print shops, promotional merch sellers, and any Shopify merchant selling personalized products all run on the same setup.",
  ],
  ctas: [
    { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
    { label: "See the Design Lab", href: "/#features", variant: "secondary" as const },
  ],
};

export const audiences: CardItem[] = [
  {
    icon: "store",
    title: "Print-on-demand stores",
    text: "Let shoppers design t-shirts, hoodies and caps in real time, with pricing that adjusts by print method, side count and product options.",
  },
  {
    icon: "shirt",
    title: "Apparel & merch brands",
    text: "Add personalization to your existing line without creating a new SKU for every variation. Each design becomes structured order data.",
  },
  {
    icon: "printer",
    title: "Print shops",
    text: "Screen print, DTG, embroidery, vinyl and sublimation, each with its own color limits, setup fees and quantity minimums enforced at checkout.",
  },
  {
    icon: "gift",
    title: "Promotional & corporate merch",
    text: "Mugs, totes and giveaways carrying a client's logo, with quantity discounts and an approval step before anything reaches the press.",
  },
];

export const niches: CardItem[] = [
  { icon: "sparkles", title: "Athletic, College & Greek", text: "Spirit wear and chapter apparel shoppers proudly co-design." },
  { icon: "gift", title: "Weddings & Events", text: "Bachelorette crews, birthdays and reunions: one design, many names." },
  { icon: "shield-check", title: "Military", text: "Unit pride and homecoming pieces with details that matter." },
  { icon: "trending-up", title: "Sports & Teams", text: "Team apparel and jerseys, priced per size range." },
  { icon: "calendar-check", title: "Religious & Community", text: "Youth groups and church events with easy group orders." },
  { icon: "circle-dollar-sign", title: "Fundraising & Charity", text: "Awareness merch where quantity discounts do the heavy lifting." },
  { icon: "zap", title: "First Responders", text: "Station wear and appreciation runs, customized per crew." },
  { icon: "calendar-check", title: "Holidays", text: "Seasonal personalization spikes, so be ready before the rush." },
];

export const useCasesCta = {
  title: "Your store, their designs",
  text: "Whatever you sell, personalization raises engagement and order value. Flag your first product as customizable today.",
  cta: { label: "Start Your 30-Day Free Trial of Custy", href: APP_URL, variant: "primary" as const },
  secondaryCta: { label: "View pricing", href: "/#pricing", variant: "secondary" as const },
};
