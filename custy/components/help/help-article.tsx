import Link from "next/link";
import { Check, Info, Rocket } from "lucide-react";
import type { HelpArticle } from "@/content/help";
import { getCategory, getSubCategory } from "@/content/help";
import { AnnotatedFigure } from "./annotated-figure";
import { HelpBreadcrumbs } from "./help-breadcrumbs";
import { HelpCalloutBox, HelpLinkList } from "./help-callout";
import { HelpInline } from "./help-inline";
import { HelpPager } from "./help-pager";

export function HelpArticleView({
  article,
  previous,
  next,
}: {
  article: HelpArticle;
  previous: HelpArticle | null;
  next: HelpArticle | null;
}) {
  const category = getCategory(article.categorySlug);
  const subCategory = article.subCategorySlug
    ? getSubCategory(article.categorySlug, article.subCategorySlug)
    : undefined;
  const isOverview = article.slug === "overview" && !article.subCategorySlug;

  const crumbs = [
    { label: "Help", href: "/help" },
    ...(category ? [{ label: category.title, href: category.href }] : []),
    ...(subCategory ? [{ label: subCategory.title, href: subCategory.href }] : []),
    { label: article.title },
  ];

  return (
    <article className={isOverview ? "max-w-[760px]" : undefined}>
      <HelpBreadcrumbs items={crumbs} />

      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {category ? (
            <Link
              href={category.href}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-body transition-colors hover:text-ink"
            >
              {category.slug === "getting-started" ? (
                <Rocket className="h-3.5 w-3.5" aria-hidden />
              ) : null}
              {category.title}
            </Link>
          ) : (
            <span className="text-[13px] font-semibold tracking-widest text-muted uppercase">
              Help
            </span>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
            {article.readMinutes ? <span>{article.readMinutes} min to read</span> : null}
            {article.readMinutes && article.updatedOn ? <span aria-hidden>·</span> : null}
            {article.updatedOn ? <span>Last update on {article.updatedOn}</span> : null}
          </div>
        </div>

        <h1 className="mt-4 text-[clamp(1.85rem,3.6vw,2.75rem)] leading-tight font-extrabold text-ink">
          {article.title}
        </h1>

        <div
          className={`mt-5 space-y-4 text-body ${isOverview ? "text-[17px] leading-[1.7]" : "max-w-[720px] text-[16px] leading-[1.65]"}`}
        >
          {article.lead.map((paragraph) => (
            <p key={paragraph}>
              <HelpInline text={paragraph} />
            </p>
          ))}
        </div>

        {article.leadLinks && article.leadLinks.length > 0 ? (
          <HelpLinkList links={article.leadLinks} />
        ) : null}
      </header>

      <div className={`mt-10 ${isOverview ? "space-y-8" : "mt-12 space-y-14"}`}>
        {article.sections.map((section) => {
          const hasTitle = Boolean(section.title);
          const onlyCallout =
            section.callout &&
            section.paragraphs.length === 0 &&
            !section.highlights?.length &&
            !section.actions?.length &&
            !section.figure &&
            !section.note &&
            !section.links?.length;

          return (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              {hasTitle ? (
                <h2 className="text-[clamp(1.35rem,2.5vw,1.75rem)] leading-tight font-extrabold text-ink">
                  {section.title}
                </h2>
              ) : null}

              {section.paragraphs.length > 0 ? (
                <div
                  className={`space-y-3 text-body ${hasTitle ? "mt-4" : ""} ${
                    isOverview ? "text-[16.5px] leading-[1.7]" : "text-[15.5px] leading-[1.65]"
                  }`}
                >
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      <HelpInline text={paragraph} />
                    </p>
                  ))}
                </div>
              ) : null}

              {section.highlights && section.highlights.length > 0 ? (
                <ol className={`${section.paragraphs.length ? "mt-4" : ""} space-y-3`}>
                  {section.highlights.map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[16px] leading-[1.65] text-body"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">
                        <HelpInline text={item} />
                      </span>
                    </li>
                  ))}
                </ol>
              ) : null}

              {section.actions && section.actions.length > 0 ? (
                <ul className="mt-5 grid gap-3 rounded-2xl border border-line bg-lander-light p-5 md:p-6">
                  {section.actions.map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-3 text-[15px] leading-6 text-body"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f6fe]"
                      >
                        <Check className="h-3 w-3 text-[#0b7fad]" strokeWidth={3} />
                      </span>
                      <span>
                        <HelpInline text={action} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.links && section.links.length > 0 ? (
                <HelpLinkList links={section.links} />
              ) : null}

              {section.callout ? (
                <div className={onlyCallout ? undefined : "mt-5"}>
                  <HelpCalloutBox callout={section.callout} />
                </div>
              ) : null}

              {section.note ? (
                <div className="mt-5 flex gap-3 rounded-2xl border border-[#cfe8f6] bg-[#f3faff] p-4 md:p-5">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#0b7fad]" aria-hidden />
                  <div className="min-w-0 text-[14.5px] leading-6 text-body">
                    {section.note.title ? (
                      <p className="font-semibold text-ink">{section.note.title}</p>
                    ) : null}
                    <p className={section.note.title ? "mt-1" : undefined}>
                      <HelpInline text={section.note.body} />
                    </p>
                  </div>
                </div>
              ) : null}

              {section.figure ? <AnnotatedFigure figure={section.figure} /> : null}
            </section>
          );
        })}
      </div>

      <HelpPager previous={previous} next={next} />
    </article>
  );
}
