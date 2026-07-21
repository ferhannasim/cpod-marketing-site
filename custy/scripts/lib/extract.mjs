import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

function cleanBody($, body) {
  body.find("script, style, noscript").remove();
  return body.html() ?? "";
}

export function extractLander(html) {
  const $ = cheerio.load(html);
  const root = $('div[class*="custy-"]').filter((_, el) =>
    /custy-[a-z]+-page/.test($(el).attr("class") ?? ""),
  ).first();
  if (root.length === 0) throw new Error("lander custy-*-page root not found");
  const css = $("style")
    .toArray()
    .map((el) => $(el).text())
    .filter((text) => text.includes(".custy-"))
    .join("\n");
  const title = root.find("h1").first().text().trim();
  root.find("script, noscript").remove();
  return { title, rootHtml: $.html(root), css };
}

export function extractProsePage(html) {
  const $ = cheerio.load(html);
  const title = $("main h1").first().text().trim();
  if (!title) throw new Error("prose page structure not found");
  // Some prose pages (e.g. support/contact on the current theme) are just a
  // title section plus a contact form, with no `.rte` rich-text block at all —
  // that's a legitimately empty body, not an extraction failure.
  const blocks = $("main .rte");
  const root = $("<div></div>");
  blocks.each((_, el) => root.append($(el).clone()));
  return { title, bodyHtml: cleanBody($, root) };
}

export function extractPolicy(html) {
  const $ = cheerio.load(html);
  const root = $(".shopify-policy__container").first();
  const title = root.find(".shopify-policy__title h1").first().text().trim();
  const body = root.find(".shopify-policy__body").first();
  if (!title || body.length === 0) throw new Error("policy structure not found");
  return { title, bodyHtml: cleanBody($, body) };
}

export function extractArticle(html) {
  const $ = cheerio.load(html);
  const title = $("main h1").first().text().trim();
  const datetime = $("time[datetime]").first().attr("datetime") ?? "";
  const body = $(".blog-post-content.rte").first();
  if (!title || body.length === 0) throw new Error("article structure not found");
  return {
    title,
    date: datetime.slice(0, 10),
    image: $('meta[property="og:image"]').attr("content") ?? null,
    bodyHtml: cleanBody($, body),
  };
}

export function extractMeta(html) {
  const $ = cheerio.load(html);
  const title = $("title").first().text().replace(/\s+/g, " ").replace(/&ndash;|–/g, "–").trim();
  return { title, description: $('meta[name="description"]').attr("content") ?? null };
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
