import { describe, expect, it } from "vitest";
import { generalFaq } from "./general";
import { dtfFaq } from "./dtf";
import { sublimationFaq } from "./sublimation";
import { printOnYourOwnItemFaq } from "./print-on-your-own-item";

const sets = { generalFaq, dtfFaq, sublimationFaq, printOnYourOwnItemFaq };

describe("FAQ data", () => {
  for (const [name, items] of Object.entries(sets)) {
    it(`${name} has at least 3 items with unique, non-empty questions`, () => {
      expect(items.length).toBeGreaterThanOrEqual(3);
      const questions = items.map((i) => i.question.trim());
      expect(questions.every((q) => q.length > 0)).toBe(true);
      expect(new Set(questions).size).toBe(questions.length);
    });
  }
});
