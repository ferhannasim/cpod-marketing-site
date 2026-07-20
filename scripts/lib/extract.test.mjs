import { describe, expect, it } from "vitest";
import { extractContactPage, extractFaqPage, extractPage, extractPolicy, toMarkdown } from "./extract.mjs";

const PAGE_HTML = `<html><body>
<section data-section-id="x" data-section-type="page">
  <div class="container">
    <header class="page__header"><h1 class="page__title heading h1">Test Page</h1></header>
    <div class="page__content rte">
      <p>Hello <strong>world</strong></p>
      <ul><li>One</li><li>Two</li></ul>
      <table><thead><tr><th>Size</th><th>Chest</th></tr></thead>
        <tbody><tr><td>S</td><td>18</td></tr></tbody></table>
      <script>evil()</script>
    </div>
  </div>
</section>
</body></html>`;

const POLICY_HTML = `<html><body>
<div class="shopify-policy__container">
  <div class="shopify-policy__title"><h1>Privacy Policy</h1></div>
  <div class="shopify-policy__body"><p>We respect privacy.</p></div>
</div>
</body></html>`;

const FAQ_HTML = `<html><body>
<section data-section-id="x" data-section-type="page">
  <div class="container">
    <header class="page__header"><h1 class="page__title heading h1">FAQs</h1></header>
  </div>
</section>
<div class="faq" itemscope itemtype="https://schema.org/FAQPage">
  <div class="faq__group-list">
    <div class="faq__group">
      <h1 class="faq__group-title heading h2">Information</h1>
      <div class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <button class="faq__question heading h4" itemprop="name">Are you affiliated with X? <span class="plus-button"></span></button>
        <div class="faq__answer-wrapper" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div class="faq__answer rte" itemprop="text">
            <p>No, we are not affiliated. <script>evil()</script></p>
          </div>
        </div>
      </div>
    </div>
    <div class="faq__group">
      <h1 class="faq__group-title heading h2">DTF Questions</h1>
      <div class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <button class="faq__question heading h4" itemprop="name">What is DTF?</button>
        <div class="faq__answer-wrapper" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div class="faq__answer rte" itemprop="text">
            <p>Direct to Film printing.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="faq__contact-info">
    <p>Still have questions? <a href="/pages/contact">Contact us</a>.</p>
  </div>
</div>
</body></html>`;

const CONTACT_HTML = `<html><body>
<section data-section-id="x" data-section-type="page">
  <div class="container">
    <header class="page__header"><h1 class="page__title heading h1">Contact</h1></header>
  </div>
</section>
<div class="layout">
  <div class="layout__section">
    <form method="post" action="/contact#contact_form" id="contact_form" class="form">
      <input type="hidden" name="form_type" value="contact" />
      <input id="contact-form-name" type="text" name="contact[name]" />
      <button type="submit">Send message</button>
    </form>
  </div>
  <div class="layout__section layout__section--large-secondary">
    <div class="contact__store-info">
      <h2 class="contact__store-heading heading h3">Find Us</h2>
      <div class="contact__store-text rte">
        <h4>Cheapest Print on Demand</h4>
        <p>72-C Brunswick, Dollard, QC, H9B 2C5</p>
        <script>evil()</script>
      </div>
    </div>
  </div>
</div>
</body></html>`;

describe("extractPage", () => {
  it("pulls the title and body, stripping scripts", () => {
    const { title, bodyHtml } = extractPage(PAGE_HTML);
    expect(title).toBe("Test Page");
    expect(bodyHtml).toContain("Hello");
    expect(bodyHtml).not.toContain("evil()");
  });
  it("throws when the page section is missing", () => {
    expect(() => extractPage("<html><body><p>nope</p></body></html>")).toThrow();
  });
});

describe("extractPolicy", () => {
  it("pulls title and body from the policy wrapper", () => {
    const { title, bodyHtml } = extractPolicy(POLICY_HTML);
    expect(title).toBe("Privacy Policy");
    expect(bodyHtml).toContain("We respect privacy.");
  });
});

describe("toMarkdown", () => {
  it("converts emphasis, lists and tables to GFM", () => {
    const md = toMarkdown(extractPage(PAGE_HTML).bodyHtml);
    expect(md).toContain("**world**");
    expect(md).toContain("- One");
    expect(md).toContain("| Size | Chest |");
  });
});

describe("extractFaqPage", () => {
  it("pulls title and flattens groups/items into headings, stripping scripts", () => {
    const { title, bodyHtml } = extractFaqPage(FAQ_HTML);
    expect(title).toBe("FAQs");
    expect(bodyHtml).toContain("<h2>Information</h2>");
    expect(bodyHtml).toContain("<h3>Are you affiliated with X?");
    expect(bodyHtml).toContain("No, we are not affiliated.");
    expect(bodyHtml).not.toContain("evil()");
    expect(bodyHtml).toContain("<h2>DTF Questions</h2>");
    expect(bodyHtml).toContain("<h3>What is DTF?");
    expect(bodyHtml).toContain("Direct to Film printing.");
    expect(bodyHtml).toContain("Still have questions?");
  });

  it("throws when no faq groups are found", () => {
    expect(() => extractFaqPage("<html><body><p>nope</p></body></html>")).toThrow();
  });

  it("converts to markdown with group/question headings", () => {
    const md = toMarkdown(extractFaqPage(FAQ_HTML).bodyHtml);
    expect(md).toContain("## Information");
    expect(md).toContain("### Are you affiliated with X?");
  });
});

describe("extractContactPage", () => {
  it("pulls title and store info, ignoring the form and stripping scripts", () => {
    const { title, bodyHtml } = extractContactPage(CONTACT_HTML);
    expect(title).toBe("Contact");
    expect(bodyHtml).toContain("<h2>Find Us</h2>");
    expect(bodyHtml).toContain("Cheapest Print on Demand");
    expect(bodyHtml).toContain("72-C Brunswick");
    expect(bodyHtml).not.toContain("contact_form");
    expect(bodyHtml).not.toContain("Send message");
    expect(bodyHtml).not.toContain("evil()");
  });

  it("throws when no store info block is found", () => {
    expect(() => extractContactPage("<html><body><p>nope</p></body></html>")).toThrow();
  });
});
