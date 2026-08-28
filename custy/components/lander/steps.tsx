import { cn } from "@/lib/utils";

export type StepItem = {
  number: number;
  title: string;
  /** One or more body paragraphs. */
  text: string | string[];
  /** Optional illustration (unused by the four source pages; forward-compat). */
  image?: string;
};

const gridColumnClasses: Record<number, string> = {
  1: "",
  2: "min-[1200px]:grid-cols-2",
  3: "md:grid-cols-2 min-[1200px]:grid-cols-3",
  4: "md:grid-cols-2 min-[1200px]:grid-cols-4",
  5: "md:grid-cols-2 min-[1200px]:grid-cols-5",
};

export type StepsProps = {
  items: StepItem[];
  /**
   * `grid` — numbered cards laid out in columns (features page).
   * `rows` — a vertical timeline with a connector rail (how-it-works page).
   */
  layout?: "grid" | "rows";
  /** Columns above 1200px for the grid layout (default 4). */
  columns?: number;
  className?: string;
};

function bodyParagraphs(text: StepItem["text"]): string[] {
  return Array.isArray(text) ? text : [text];
}

/**
 * The step sequence. The grid variant renders numbered cards; the rows variant
 * renders a vertical timeline whose connector rail encodes that the steps are
 * a real, ordered workflow.
 */
export function Steps({ items, layout = "grid", columns = 4, className }: StepsProps) {
  if (layout === "rows") {
    return (
      <div className={cn("relative mx-auto max-w-[880px]", className)}>
        <div aria-hidden className="absolute top-3 bottom-3 left-[19px] w-px bg-line" />
        {items.map((step) => (
          <div key={step.number} className="relative pb-10 pl-16 last:pb-0 max-md:pl-14">
            <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-[15px] font-bold text-ink shadow-[0_2px_8px_rgba(16,24,40,0.06)]">
              {step.number}
            </div>
            {step.image ? (
              <img src={step.image} alt="" className="mb-3.5 max-w-full rounded-2xl" />
            ) : null}
            <h3 className="pt-2 text-[18px] leading-snug font-bold text-ink">{step.title}</h3>
            {bodyParagraphs(step.text).map((paragraph, index) => (
              <p key={index} className="mt-2.5 text-[15px] leading-[1.6] text-body">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-5", gridColumnClasses[columns] ?? gridColumnClasses[4], className)}>
      {items.map((step) => (
        <div
          key={step.number}
          className="rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#d3dce8] hover:shadow-[0_16px_40px_-12px_rgba(16,24,40,0.14)]"
        >
          <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
            {step.number}
          </div>
          {step.image ? (
            <img src={step.image} alt="" className="mb-3.5 max-w-full rounded-2xl" />
          ) : null}
          <h3 className="text-[17px] leading-snug font-bold text-ink">{step.title}</h3>
          {bodyParagraphs(step.text).map((paragraph, index) => (
            <p key={index} className="mt-2.5 text-[15px] leading-[1.6] text-body">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
