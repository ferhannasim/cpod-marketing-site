import path from "node:path";
import sharp from "sharp";

// Composites the logo, centered, onto a plain 1200x630 white canvas -> public/images/og-card.png.
// Run once: `node scripts/make-og-card.mjs`. Re-run any time public/images/logo.png changes.
const OUT_WIDTH = 1200;
const OUT_HEIGHT = 630;
const LOGO_WIDTH = 900; // logo.png is 3000x860 (~3.49:1); scaled to 900 wide -> ~258 tall, comfortable margins

const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
const outPath = path.join(process.cwd(), "public", "images", "og-card.png");

const logo = await sharp(logoPath).resize({ width: LOGO_WIDTH }).toBuffer();

await sharp({
  create: {
    width: OUT_WIDTH,
    height: OUT_HEIGHT,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile(outPath);

console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${OUT_WIDTH}x${OUT_HEIGHT})`);
