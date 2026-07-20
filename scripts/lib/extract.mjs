import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

function cleanBody($, body) {
  body.find("script, style, noscript").remove();
  return body.html() ?? "";
}

export function extractPage(html) {
  const $ = cheerio.load(html);
  const root = $('[data-section-type="page"]').first();
  const title = root.find("h1.page__title").first().text().trim();
  const body = root.find(".page__content").first();
  if (!title || body.length === 0) throw new Error("page structure not found");
  return { title, bodyHtml: cleanBody($, body) };
}

export function extractPolicy(html) {
  const $ = cheerio.load(html);
  const root = $(".shopify-policy__container").first();
  const title = root.find(".shopify-policy__title h1").first().text().trim();
  const body = root.find(".shopify-policy__body").first();
  if (!title || body.length === 0) throw new Error("policy structure not found");
  return { title, bodyHtml: cleanBody($, body) };
}

// The Warehouse theme's FAQ page uses an accordion (.faq__group / .faq__item)
// rather than the generic .page__content body extractPage() expects. Flatten
// each group/question/answer into headings + answer HTML, in document order.
export function extractFaqPage(html) {
  const $ = cheerio.load(html);
  const title = $("h1.page__title").first().text().trim();
  const groups = $(".faq__group");
  if (groups.length === 0) throw new Error("faq structure not found");

  const root = $("<div></div>");
  groups.each((_, groupEl) => {
    const group = $(groupEl);
    const groupTitle = group.find(".faq__group-title").first().text().trim();
    root.append($("<h2></h2>").text(groupTitle));
    group.find(".faq__item").each((__, itemEl) => {
      const item = $(itemEl);
      const question = item.find(".faq__question").first().text().trim();
      root.append($("<h3></h3>").text(question));
      const answer = item.find(".faq__answer").first();
      root.append(answer.html() ?? "");
    });
  });

  const contactInfo = $(".faq__contact-info").first();
  if (contactInfo.length > 0) root.append(contactInfo.html() ?? "");

  root.find("script, style, noscript").remove();
  return { title, bodyHtml: root.html() ?? "" };
}

// The Warehouse theme's contact page uses a form + store-info block rather
// than the generic .page__content body extractPage() expects. Keep only the
// store info (heading + rte text); the form itself carries no page copy.
export function extractContactPage(html) {
  const $ = cheerio.load(html);
  const title = $("h1.page__title").first().text().trim();
  const storeInfos = $(".contact__store-info");
  if (storeInfos.length === 0) throw new Error("contact structure not found");

  const root = $("<div></div>");
  storeInfos.each((_, infoEl) => {
    const info = $(infoEl);
    const heading = info.find(".contact__store-heading").first().text().trim();
    root.append($("<h2></h2>").text(heading));
    const text = info.find(".contact__store-text").first();
    root.append(text.html() ?? "");
  });

  root.find("script, style, noscript").remove();
  return { title, bodyHtml: root.html() ?? "" };
}

export function toMarkdown(html) {
  const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });
  turndown.use(gfm);
  turndown.keep(["iframe"]);
  // Turndown's built-in listItem rule always pads the marker to 4 columns
  // (e.g. "-   item") to align with two-digit ordered-list numbers. That's
  // valid markdown but noisy for hand-editing; use a single space instead.
  turndown.addRule("listItem", {
    filter: "li",
    replacement(content, node, options) {
      content = content
        .replace(/^\n+/, "")
        .replace(/\n+$/, "\n")
        .replace(/\n/gm, "\n    ");
      let prefix = options.bulletListMarker + " ";
      const parent = node.parentNode;
      if (parent.nodeName === "OL") {
        const start = parent.getAttribute("start");
        const index = Array.prototype.indexOf.call(parent.children, node);
        prefix = (start ? Number(start) + index : index + 1) + ". ";
      }
      return prefix + content + (node.nextSibling && !/\n$/.test(content) ? "\n" : "");
    },
  });
  return turndown.turndown(html);
}
