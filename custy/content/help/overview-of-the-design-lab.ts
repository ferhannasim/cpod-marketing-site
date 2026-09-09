import type { HelpArticle } from "./types";

const FIG = { width: 1735, height: 906 } as const;

export const overviewOfTheDesignLab: HelpArticle = {
  slug: "overview-of-the-design-lab",
  categorySlug: "products",
  subCategorySlug: null,
  title: "Overview of the Design Lab",
  description:
    "A plain tour of every main button in the Custy Design Lab — the screen shoppers use to decorate your products.",
  summary:
    "What each Design Lab button does: top tools, add text or images, sides, colors, save, and add to cart.",
  readMinutes: 8,
  updatedOn: "9 September 2026",
  lead: [
    "The Custy Design Lab is the design screen on your store. Shoppers open it from Customize It, decorate the product live, then add it to the cart.",
    "You set up the product in Custy first. Shoppers cannot break your store by designing.",
  ],
  leadLinks: [
    { label: "Try the live demo", href: "/live-demo" },
    {
      label: "Setting Up Your First Product",
      href: "/help/products/custom-products/first-product",
    },
  ],
  sections: [
    {
      id: "what-shoppers-can-do",
      title: "What shoppers can do",
      paragraphs: [
        "In the Design Lab, shoppers can:",
      ],
      highlights: [
        "Add words (text) and change fonts, size, and color",
        "Upload their own logo or picture",
        "Add a graphic from your clipart library",
        "Design more than one side of the product",
        "Change the product color when you offer colors",
        "Preview, save, or download a proof of the design",
        "Pick sizes and quantities, then add the item to the cart",
      ],
    },
    {
      id: "main-screen",
      title: "The main screen",
      paragraphs: [
        "The Design Lab looks like a work table. The product sits in the middle. Tools sit around the edges. Most shoppers only need Add Text, Upload image, or Add Graphic — then they drag the design into place.",
        "Use the numbered notes on the picture below. Capture a fresh screenshot from your live Design Lab when you replace this image.",
      ],
      figure: {
        src: "/images/help/design-lab-overview.png",
        alt: "Full Custy Design Lab screen with product in the center",
        caption: "Full Design Lab: top tools, add tools on the left, product in the middle, sides on the right, size & cart at the bottom.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Top tools",
            body: "SELECT ALL, Undo, Redo, Zoom, CLEAR ALL, EDIT LAYER, Preview, Save Design, and Download.",
          },
          {
            n: 2,
            title: "Add design",
            body: "Add Text, Upload image, and Add Graphic — the three main ways to decorate.",
          },
          {
            n: 3,
            title: "Product preview",
            body: "Live product photo. The dashed box is the print area when you set one up.",
          },
          {
            n: 4,
            title: "Choose color",
            body: "Color swatches so shoppers can change the garment color (when you offer colors).",
          },
          {
            n: 5,
            title: "Product side",
            body: "Switch sides such as Front and Back.",
          },
          {
            n: 6,
            title: "Size & cart",
            body: "SELECT SIZE & QUANTITY — pick sizes and amounts, then add to cart.",
          },
        ],
      },
    },
    {
      id: "top-tools",
      title: "Available tools at the top",
      paragraphs: [
        "These controls sit along the top of the Design Lab:",
      ],
      actions: [
        "SELECT ALL — selects every design piece on the current side so the shopper can move them together. When active, it becomes DESELECT.",
        "Undo — goes back one step (tooltip: Undo).",
        "Redo — brings that step back (tooltip: Redo).",
        "Zoom out / Zoom in — makes the product smaller or bigger on screen for careful placement.",
        "CLEAR ALL — removes every design piece from the current side. Shoppers can Undo if they click by mistake.",
        "EDIT LAYER — opens the Layers list (see next section).",
        "Preview (eye icon) — opens DESIGN PREVIEW so they can see all sides before buying.",
        "Save Design (save icon) — opens SAVE YOUR DESIGN so they can save and come back later.",
        "Download (download icon) — downloads a proof of the current design.",
      ],
      figure: {
        src: "/images/help/design-lab-top-toolbar.png",
        alt: "Design Lab top toolbar with Select All, Undo, Redo, Zoom, Clear All, Edit Layer, Preview, Save, Download",
        caption: "Top toolbar — capture this strip clearly with markers on each control.",
        ...FIG,
        markers: [
          { n: 1, title: "SELECT ALL", body: "Select every design piece on this side." },
          { n: 2, title: "Undo / Redo", body: "Go back one step, or bring that step back." },
          { n: 3, title: "Zoom", body: "Zoom out and zoom in." },
          { n: 4, title: "CLEAR ALL", body: "Remove all designs from the current side." },
          { n: 5, title: "EDIT LAYER", body: "Open the Layers list." },
          { n: 6, title: "Preview", body: "Open DESIGN PREVIEW." },
          { n: 7, title: "Save Design", body: "Save the design for later." },
          { n: 8, title: "Download", body: "Download a proof of the design." },
        ],
      },
    },
    {
      id: "edit-layer",
      title: "EDIT LAYER (Layers list)",
      paragraphs: [
        "Click EDIT LAYER to open Layers. Here shoppers see every text, upload, and graphic on the current side.",
      ],
      actions: [
        "Drag a row to change the order (what sits on top).",
        "Use move up / move down if they prefer arrows.",
        "Delete a single layer, or Clear All from this panel.",
        "If nothing is on the side yet, it says No elements added yet.",
      ],
      figure: {
        src: "/images/help/design-lab-edit-layer.png",
        alt: "Layers panel open from EDIT LAYER",
        caption: "EDIT LAYER opens the Layers list — reorder or delete design pieces.",
        ...FIG,
        markers: [
          { n: 1, title: "EDIT LAYER", body: "Button that opens this panel." },
          { n: 2, title: "Layers list", body: "Each text, image, and graphic on this side." },
          { n: 3, title: "Reorder / Delete", body: "Drag to reorder, or delete one piece." },
        ],
      },
    },
    {
      id: "choose-color",
      title: "CHOOSE COLOR",
      paragraphs: [
        "When the product has colors set up in Custy, shoppers see CHOOSE COLOR with swatches. Clicking a swatch changes the garment color on the preview.",
        "Some products may offer an advanced color picker. If you did not set colors on the product, this section will not appear.",
      ],
      figure: {
        src: "/images/help/design-lab-choose-color.png",
        alt: "Choose Color swatches in the Design Lab",
        caption: "CHOOSE COLOR — shoppers pick a garment color from the swatches you set up.",
        ...FIG,
        markers: [
          { n: 1, title: "CHOOSE COLOR", body: "Section title for garment colors." },
          { n: 2, title: "Swatches", body: "Click a color to change the product look." },
          { n: 3, title: "Selected color name", body: "Shows which color is active." },
        ],
      },
      links: [
        {
          label: "Setting Up Your First Product",
          href: "/help/products/custom-products/first-product",
        },
      ],
    },
    {
      id: "product-side",
      title: "PRODUCT SIDE",
      paragraphs: [
        "PRODUCT SIDE shows each printable side you added (for example Front and Back). Shoppers click a side to design it. Under the product, side tabs may also appear on desktop.",
        "If a side is turned off for customization, they will see a message that this side is not enabled for customization.",
      ],
      figure: {
        src: "/images/help/design-lab-product-side.png",
        alt: "Product Side panel with Front and Back thumbnails",
        caption: "PRODUCT SIDE — switch between Front, Back, and other sides you set up.",
        ...FIG,
        markers: [
          { n: 1, title: "PRODUCT SIDE", body: "List of sides the shopper can design." },
          { n: 2, title: "Side thumbnail", body: "Click to switch to that side." },
        ],
      },
      links: [
        {
          label: "Print Areas & Mark Areas",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
        },
      ],
    },
    {
      id: "add-text",
      title: "Add Text",
      paragraphs: [
        "Under ADD DESIGN OBJECT, shoppers click Add Text. That button goes away and a small form opens on the left. The picture below shows that form — after Add Text was already clicked.",
        "They type words, pick a font and size, pick a text color, then click Add Text again to place it on the product.",
      ],
      actions: [
        "Type in Enter your text...",
        "Pick a font from SELECT A FONT (categories and search).",
        "Set font size and TEXT COLOR.",
        "Click Add Text to place it, or Cancel to close.",
      ],
      figure: {
        src: "/images/help/design-lab-add-text.png",
        alt: "Add Text form in the Design Lab after clicking Add Text",
        caption:
          "After you click Add Text, this form opens. Type words, pick font and color, then place the text on the product.",
        ...FIG,
        markers: [
          { n: 1, title: "Text box", body: "Where shoppers type their words." },
          { n: 2, title: "Font and size", body: "Choose font and font size." },
          { n: 3, title: "TEXT COLOR", body: "Pick a color for the text." },
          { n: 4, title: "Add Text", body: "Places the text on the product." },
        ],
      },
    },
    {
      id: "text-options",
      title: "TEXT OPTIONS (after text is selected)",
      paragraphs: [
        "When a shopper clicks text on the product, TEXT OPTIONS open. This is where they fine-tune the words.",
      ],
      actions: [
        "CONTENT — Edit Text Content to change the words. Duplicate or Remove the text.",
        "PRINT & COLOR — pick PRINTING TYPE if you assigned more than one method, and pick COLOR for ink colors.",
        "TYPOGRAPHY — SELECT FONT, FONT SIZE, Bold, Italic, Underline.",
        "SIZING / DIMENSIONS — WIDTH and HEIGHT (with lock for proportions), Flip H, Flip V.",
        "Advanced tools — LETTER SPACING, LINE HEIGHT, OUTLINE & SHADOW, ROTATE, and OBJECT POSITION (align left, center, right, top, middle, bottom).",
      ],
      figure: {
        src: "/images/help/design-lab-text-options.png",
        alt: "TEXT OPTIONS panel for selected text — content, printing, typography, and advanced tools",
        caption:
          "TEXT OPTIONS after text is selected. Top: content, edit text, printing type and color. Bottom: font, size, and advanced tools.",
        width: 2048,
        height: 2228,
        markers: [
          { n: 1, title: "CONTENT", body: "Duplicate or remove the text." },
          { n: 2, title: "Edit Text Content", body: "Change the words." },
          { n: 3, title: "PRINTING TYPE / COLOR", body: "Printing method and ink color." },
          { n: 4, title: "Font and size", body: "SELECT FONT, FONT SIZE, Bold, Italic, Underline." },
          { n: 5, title: "Advanced tools", body: "Spacing, outline, shadow, rotate, and position." },
        ],
      },
    },
    {
      id: "upload-image",
      title: "Upload image",
      paragraphs: [
        "Shoppers click Upload image (on mobile it may say Upload Image or Uploads). A window titled UPLOAD IMAGE opens.",
      ],
      actions: [
        "Choose Upload A File or From URL.",
        "Click Choose File (or paste a URL and Load). Allowed types: JPG, PNG, GIF, BMP, or WebP. Max size: 20MB.",
        "Optional: crop, mask to a shape, photo effects, or background removal.",
        "Click Continue (or Add Image) to place the picture on the product.",
      ],
      figure: {
        src: "/images/help/design-lab-upload.png",
        alt: "Upload image flow: button, choose file, then crop and continue",
        caption:
          "UPLOAD IMAGE flow. Top: click Upload image. Middle: Upload A File and Choose File. Bottom: crop & mask, then CONTINUE.",
        width: 2048,
        height: 3362,
        markers: [
          { n: 1, title: "Upload image", body: "Click this to open the upload window." },
          { n: 2, title: "Upload A File / From URL", body: "Two ways to add artwork." },
          { n: 3, title: "Choose File", body: "Pick a JPG, PNG, GIF, BMP, or WebP file." },
          { n: 4, title: "Crop & Mask", body: "Optional crop, mask shapes, and photo effects." },
          { n: 5, title: "CONTINUE", body: "Places the image on the product." },
        ],
      },
      note: {
        title: "After the image is on the product",
        body: "Shoppers can select it to open OBJECT CONTROLS — change size, flip, rotate, printing type, and filters. Uploaded images keep their own colors (there is no color picker on uploads).",
      },
    },
    {
      id: "add-graphic",
      title: "Add Graphic",
      paragraphs: [
        "Add Graphic opens the clipart library (title ADD GRAPHIC). Shoppers browse GRAPHIC CATEGORIES, search, and click a graphic to place it on the product.",
        "After it is placed, they can change printing type, color (for library clipart), size, flip, rotate, and position — similar to text.",
      ],
      figure: {
        src: "/images/help/design-lab-add-graphic.png",
        alt: "Add Graphic button, then ADD GRAPHIC library with categories and search",
        caption:
          "ADD GRAPHIC flow. Top: click Add Graphic. Bottom: pick a category, search, then click a graphic to place it.",
        width: 2048,
        height: 2232,
        markers: [
          { n: 1, title: "Add Graphic", body: "Opens the clipart library." },
          { n: 2, title: "GRAPHIC CATEGORIES", body: "Groups of clipart." },
          { n: 3, title: "Search", body: "Search graphics by name." },
          { n: 4, title: "Graphic tile", body: "Click to place on the product." },
        ],
      },
    },
    {
      id: "preview-save-download",
      title: "Preview, Save Design, and Download",
      paragraphs: [
        "Preview opens DESIGN PREVIEW so shoppers can check every side before they buy. From preview they can also download a proof.",
        "Save Design opens SAVE YOUR DESIGN. They enter a name and email, then click Save Design. They get a link they can Copy to open the design later. You can find saved designs under Orders in Custy.",
        "The Download icon on the top bar also downloads a proof of the current design.",
      ],
      figure: {
        src: "/images/help/design-lab-preview.png",
        alt: "Preview icon and DESIGN PREVIEW modal with sides, Download Proof, and Close",
        caption:
          "DESIGN PREVIEW flow. Top: click the eye (Preview) icon. Bottom: check each side, Download Proof, or Close.",
        width: 2048,
        height: 2232,
        markers: [
          { n: 1, title: "Preview", body: "Eye icon that opens this window." },
          { n: 2, title: "Preview sides", body: "See each side of the product." },
          { n: 3, title: "Download Proof", body: "Save a proof image." },
          { n: 4, title: "Close", body: "Return to designing." },
        ],
      },
    },
    {
      id: "save-design",
      title: "SAVE YOUR DESIGN",
      paragraphs: [
        "Click the Save Design icon on the top bar. Enter a design name and email, then click Save Design.",
        "After a successful save, shoppers see DESIGN SAVED with a shareable link and a Copy button. There is no separate Share button on the toolbar — sharing is done by copying that link. You can find saved designs under Orders in Custy.",
      ],
      figure: {
        src: "/images/help/design-lab-save.png",
        alt: "Save Design icon, SAVE YOUR DESIGN form, then DESIGN SAVED with copy link",
        caption:
          "Save Design flow. Top: click Save. Middle: enter name and email, then Save Design. Bottom: copy the shareable link.",
        width: 2048,
        height: 3364,
        markers: [
          { n: 1, title: "Save Design icon", body: "Opens the save form from the top bar." },
          { n: 2, title: "Name, email, and Save Design", body: "Enter details, then click Save Design." },
          { n: 3, title: "Copy link", body: "After save, copy the link to open the design later or share it." },
        ],
      },
    },
    {
      id: "size-and-cart",
      title: "SELECT SIZE & QUANTITY and Add to Cart",
      paragraphs: [
        "At the bottom, shoppers click SELECT SIZE & QUANTITY. A window titled SIZE & QUANTITY opens. They pick sizes and how many of each, see the totals, then click ADD TO CART.",
        "CONTINUE DESIGNING takes them back to the design screen. On a phone, they may see CHECKOUT — that opens the same size and quantity window.",
        "If they try to add to cart with no design, a friendly reminder asks them to Add Design or Continue Anyway.",
      ],
      figure: {
        src: "/images/help/design-lab-size-quantity.png",
        alt: "SELECT SIZE & QUANTITY button, then SIZE & QUANTITY modal with Add to Cart",
        caption:
          "SIZE & QUANTITY flow. Top: click SELECT SIZE & QUANTITY. Bottom: pick sizes and quantities, CONTINUE DESIGNING, or ADD TO CART.",
        width: 2048,
        height: 2232,
        markers: [
          { n: 1, title: "SELECT SIZE & QUANTITY", body: "Footer button that opens this window." },
          { n: 2, title: "Size and quantity", body: "Pick each size and how many of that size." },
          { n: 3, title: "CONTINUE DESIGNING", body: "Go back to the design screen." },
          { n: 4, title: "ADD TO CART", body: "Send the customized product to the Shopify cart." },
        ],
      },
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "The totals in this window include the product price and any extras from your printing setup. Shopify still handles payment and shipping after Add to Cart.",
        ],
        link: {
          label: "Pricing Rules",
          href: "/help/products/printing-types-and-pricing/pricing-rules",
        },
      },
    },
    {
      id: "warnings",
      title: "Helpful warnings",
      paragraphs: [
        "The Design Lab may show warnings to protect your print quality. These are normal — not a broken store.",
      ],
      highlights: [
        "Design is outside the print area — move artwork inside the dashed box",
        "Image quality / low DPI — the upload may print soft; re-upload a larger file or scale down",
        "Too many colors for this printing type — reduce colors to the limit you set",
      ],
      callout: {
        variant: "important",
        title: "You stay in control",
        bullets: [
          "You can turn off Add Text, Upload, Add Graphic, or Add to Cart per product under Restrictions.",
          "Shoppers only design inside the print areas and options you set up.",
          "Shopify still runs the cart, payment, and shipping.",
        ],
      },
    },
  ],
};
