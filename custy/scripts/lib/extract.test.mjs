import { describe, expect, it } from "vitest";
import { extractArticle, extractLander, extractMeta, extractPolicy, extractProsePage, toMarkdown } from "./extract.mjs";

const landerHtml = `<html><head><style>.other{}</style><style>.custy-features-page{--custy-blue:#17b6f4}</style></head>
<body><main><div class="shopify-block rte"><div class="custy-features-page">
<h1>Powerful Product Customization</h1><section class="custy-hero">Hero</section>
</div></div></main></body></html>`;

const proseHtml = `<html><body><main><h1>Support</h1>
<div class="spacing-style text-block rte"><p>First block.</p></div>
<div class="text-block rte"><p>Second block.</p><script>evil()</script></div>
</main></body></html>`;

const policyHtml = `<html><body><div class="shopify-policy__container">
<div class="shopify-policy__title"><h1>Privacy policy</h1></div>
<div class="shopify-policy__body"><div class="rte"><p>Policy text.</p></div></div>
</div></body></html>`;

const articleHtml = `<html><head><meta property="og:image" content="https://cdn.shopify.com/img.jpg"></head>
<body><main><h1>7 Ways</h1><time datetime="2026-04-17T11:25:37Z">April 17</time>
<div class="blog-post-content rte"><p>Body.</p></div></main></body></html>`;

describe("extractLander", () => {
  it("returns the custy root html and its scoped css", () => {
    const { title, rootHtml, css } = extractLander(landerHtml);
    expect(title).toBe("Powerful Product Customization");
    expect(rootHtml).toContain('class="custy-features-page"');
    expect(css).toContain("--custy-blue");
    expect(css).not.toContain(".other");
  });
  it("throws when no custy root exists", () => {
    expect(() => extractLander("<html><body><p>nope</p></body></html>")).toThrow();
  });
});

describe("extractProsePage", () => {
  it("joins main rte blocks and strips scripts", () => {
    const { title, bodyHtml } = extractProsePage(proseHtml);
    expect(title).toBe("Support");
    expect(bodyHtml).toContain("First block.");
    expect(bodyHtml).toContain("Second block.");
    expect(bodyHtml).not.toContain("evil");
  });
});

describe("extractPolicy", () => {
  it("extracts title and body", () => {
    const { title, bodyHtml } = extractPolicy(policyHtml);
    expect(title).toBe("Privacy policy");
    expect(bodyHtml).toContain("Policy text.");
  });
});

describe("extractArticle", () => {
  it("extracts title, ISO date, og image, body", () => {
    const { title, date, image, bodyHtml } = extractArticle(articleHtml);
    expect(title).toBe("7 Ways");
    expect(date).toBe("2026-04-17");
    expect(image).toBe("https://cdn.shopify.com/img.jpg");
    expect(bodyHtml).toContain("Body.");
  });
});

describe("extractMeta", () => {
  it("reads title tag and returns null description when absent", () => {
    const meta = extractMeta("<html><head><title>\n  Pricing\n &ndash; Custy</title></head><body></body></html>");
    expect(meta.title).toBe("Pricing – Custy");
    expect(meta.description).toBeNull();
  });
});

describe("toMarkdown", () => {
  it("converts headings and tight list markers", () => {
    expect(toMarkdown("<h2>Hi</h2><ul><li>a</li></ul>")).toBe("## Hi\n\n- a");
  });
});
