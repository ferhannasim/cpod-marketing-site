import { steps } from "@/content/steps";

export function StepList() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step.label} className="relative rounded-2xl border border-zinc-200 bg-white p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
            {index + 1}
          </span>
          <p className="mt-3 font-semibold text-ink">{step.label}</p>
          <p className="mt-1 text-sm text-zinc-600">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
