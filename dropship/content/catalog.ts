import type { CardItem } from "@/components/lander";
import { SHOPIFY_APP_URL } from "@/lib/site";

export const catalogHero = {
  eyebrow: "The catalog",
  title: "100+ blanks from brands your customers trust",
  lead: "Every product is print-ready for DTF, DTG, sublimation or embroidery, stocked and produced in Canada, and importable into Shopify in a few clicks.",
  ctas: [
    { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
    { label: "See size charts", href: "/size-charts" },
  ],
};

export const categories: CardItem[] = [
  {
    icon: "shirt",
    title: "T-shirts & tops",
    text: "Everyday tees, premium fits and long sleeves from top blank brands — the backbone of any merch line.",
  },
  {
    icon: "package",
    title: "Hoodies & fleece",
    text: "Heavyweight hoodies, crewnecks and zip-ups that hold vivid prints wash after wash.",
  },
  {
    icon: "coffee",
    title: "Mugs & drinkware",
    text: "Sublimated mugs with edge-to-edge artwork — a favourite for gifts and fundraising runs.",
  },
  {
    icon: "gift",
    title: "More every season",
    text: "The catalog keeps growing. If you sell it, we probably print it — ask us about a product you need.",
  },
];

export const niches: CardItem[] = [
  { icon: "graduation-cap", title: "Athletic, College & Greek", text: "Team spirit wear, intramural merch and chapter apparel." },
  { icon: "heart", title: "Weddings & Events", text: "Bachelorette parties, birthdays, baby showers and family reunions." },
  { icon: "medal", title: "Military", text: "Unit pride, veteran tributes and homecoming shirts." },
  { icon: "trophy", title: "Sports & Teams", text: "League jerseys, fan merch and tournament tees." },
  { icon: "church", title: "Religious", text: "Church events, youth groups and faith-based apparel." },
  { icon: "hand-heart", title: "Fundraising & Charity", text: "Awareness campaigns and charity-run merchandise." },
  { icon: "siren", title: "First Responders", text: "Fire, police and EMS appreciation and station wear." },
  { icon: "calendar", title: "Holidays", text: "Seasonal drops for every holiday on the calendar." },
];

export const catalogCta = {
  title: "Put your designs on all of it",
  text: "Install the app to browse the full catalog with live base costs, then import and publish with your markup.",
  cta: { label: "Install the Shopify app", href: SHOPIFY_APP_URL },
  secondaryCta: { label: "How it works", href: "/how-it-works" },
};
