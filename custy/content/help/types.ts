export type HelpMarker = {
  n: number;
  title: string;
  body: string;
};

export type AnnotatedFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Numbered callouts drawn on the screenshot; legend renders below the image. */
  markers: HelpMarker[];
};

export type HelpNote = {
  title?: string;
  body: string;
};

export type HelpLink = {
  label: string;
  href: string;
};

export type HelpCallout = {
  variant: "important" | "tip";
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  link?: HelpLink;
};

export type HelpSection = {
  id: string;
  /** Omit or leave empty for prose blocks without a section heading. */
  title?: string;
  paragraphs: string[];
  /** Numbered highlights rendered as (1) (2) (3) in a flowing sentence style. */
  highlights?: string[];
  actions?: string[];
  links?: HelpLink[];
  callout?: HelpCallout;
  note?: HelpNote;
  figure?: AnnotatedFigure;
};

export type HelpArticle = {
  slug: string;
  categorySlug: string;
  /** Null/undefined for top-level category articles such as Overview. */
  subCategorySlug?: string | null;
  title: string;
  description: string;
  summary: string;
  lead: string[];
  /** Optional CTA links shown under the lead (e.g. live demo). */
  leadLinks?: HelpLink[];
  sections: HelpSection[];
  /** Approximate read time shown on article pages. */
  readMinutes?: number;
  /** Displayed as "Last update on …" when set. */
  updatedOn?: string;
};

export type HelpNavArticle = {
  slug: string;
  title: string;
  href: string;
  summary?: string;
};

export type HelpSubCategory = {
  slug: string;
  title: string;
  description: string;
  href: string;
  articles: HelpNavArticle[];
};

export type HelpNavCategory = {
  slug: string;
  title: string;
  description: string;
  href: string;
  /** Semantic icon name from lander icons registry. */
  icon: string;
  /** Top-level articles listed under "Articles" on the category page (e.g. Overview). */
  overviewArticles: HelpNavArticle[];
  subCategories: HelpSubCategory[];
};

export type HelpHub = {
  title: string;
  lead: string[];
  pathTitle: string;
  pathLead: string;
  pathSteps: { title: string; href: string; summary: string }[];
};
