import { renderToStaticMarkup } from "react-dom/server";
import { HelpInline } from "./help-inline";

describe("HelpInline", () => {
  it("returns plain text when there is no markup", () => {
    expect(HelpInline({ text: "Click Apps on the left." })).toBe(
      "Click Apps on the left.",
    );
  });

  it("wraps **segments** in strong tags", () => {
    const html = renderToStaticMarkup(
      <p>
        <HelpInline text="Click **Apps** on the left, then **Install**." />
      </p>,
    );
    expect(html).toBe(
      "<p>Click <strong>Apps</strong> on the left, then <strong>Install</strong>.</p>",
    );
  });
});
