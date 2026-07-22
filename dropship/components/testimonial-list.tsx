import { Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Card } from "@/components/ui/card";

function Stars() {
  return (
    <div role="img" aria-label="5 out of 5 stars" className="flex gap-1 text-brand">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden className="h-5 w-5" fill="currentColor" />
      ))}
    </div>
  );
}

export function TestimonialList() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className="flex flex-col gap-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none">
          <p aria-hidden className="font-display text-5xl leading-none text-brand">“</p>
          <Stars />
          <blockquote className="text-sm leading-relaxed text-zinc-600">“{testimonial.quote}”</blockquote>
          <p className="mt-auto font-semibold text-ink">{testimonial.name}</p>
        </Card>
      ))}
    </div>
  );
}
