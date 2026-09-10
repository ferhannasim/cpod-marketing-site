import type { HelpArticle } from "./types";

const FIG = { width: 1735, height: 906 } as const;

export const overviewOfTheDesignLab: HelpArticle = {
  slug: "overview-of-the-design-lab",
  categorySlug: "products",
  subCategorySlug: null,
  title: "Overview of the Design Lab",
  description:
    "A simple tour of the Design Lab, the screen shoppers use to decorate your products. No coding needed.",
  summary:
    "What each button does on the design screen: add words or pictures, change colors, save, and add to cart.",
  readMinutes: 8,
  updatedOn: "10 September 2026",
  lead: [
    "The **Design Lab** is the screen where shoppers decorate your product. They click **Customize It** on your store, make a design, then add it to the cart.",
    "You set up the product in Custy first. Shoppers cannot break your store by designing. If they make a mistake, they can **Undo** or **CLEAR ALL** and try again.",
  ],
  leadLinks: [
    { label: "Try the live demo", href: "/live-demo" },
    {
      label: "How to Set Up Your First Customizable Product?",
      href: "/help/products/custom-products/first-product",
    },
  ],
  sections: [
    {
      id: "what-shoppers-can-do",
      title: "What shoppers can do",
      paragraphs: [
        "On this screen, shoppers can:",
      ],
      highlights: [
        "Add words and change how the words look",
        "Upload their own logo or picture",
        "Add a ready-made picture from your art library",
        "Design the front, back, and other sides you set up",
        "Change the shirt (or product) color when you offer colors",
        "Look at a preview, save the design, or download a proof",
        "Pick sizes and how many, then add the item to the cart",
      ],
    },
    {
      id: "main-screen",
      title: "The main screen",
      paragraphs: [
        "Think of the **Design Lab** like a work table. The product sits in the middle. Buttons sit around the edges.",
        "Most people only need three things: **Add Text**, **Upload image**, or **Add Graphic**. Then they drag the design into place. Use the numbered notes on the picture below.",
      ],
      figure: {
        src: "/images/help/design-lab-overview.png",
        alt: "Full Custy Design Lab screen with product in the center",
        caption:
          "The whole Design Lab. Top tools, add buttons on the left, product in the middle, sides on the right, size and cart at the bottom.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Top tools",
            body: "**SELECT ALL**, Undo, Redo, Zoom, **CLEAR ALL**, **EDIT LAYER**, Preview, **Save Design**, and Download.",
          },
          {
            n: 2,
            title: "Add design",
            body: "**Add Text**, **Upload image**, and **Add Graphic**. Those are the three main ways to decorate.",
          },
          {
            n: 3,
            title: "Product preview",
            body: "The live product photo. The dashed box is where artwork may go (your **print area**).",
          },
          {
            n: 4,
            title: "Choose color",
            body: "Color dots so shoppers can change the product color (when you offer colors).",
          },
          {
            n: 5,
            title: "Product side",
            body: "Switch sides such as Front and Back.",
          },
          {
            n: 6,
            title: "Size and cart",
            body: "**SELECT SIZE & QUANTITY**. Pick sizes and amounts, then add to cart.",
          },
        ],
      },
    },
    {
      id: "top-tools",
      title: "Buttons along the top",
      paragraphs: [
        "These sit along the top of the **Design Lab**:",
      ],
      actions: [
        "**SELECT ALL**: grabs every design piece on this side so they can move together. When it is on, it says **DESELECT**.",
        "Undo: go back one step.",
        "Redo: bring that step back.",
        "Zoom out / Zoom in: make the product smaller or bigger on the screen.",
        "**CLEAR ALL**: remove every design from this side. They can click Undo if they clicked by mistake.",
        "**EDIT LAYER**: open a list of each piece on this side (see the next section).",
        "Preview (eye picture): open **DESIGN PREVIEW** to see all sides before buying.",
        "**Save Design** (disk picture): save the design to come back later.",
        "Download: save a proof picture of the design.",
      ],
      figure: {
        src: "/images/help/design-lab-top-toolbar.png",
        alt: "Design Lab top toolbar with Select All, Undo, Redo, Zoom, Clear All, Edit Layer, Preview, Save, Download",
        caption: "The top row of buttons.",
        ...FIG,
        markers: [
          { n: 1, title: "SELECT ALL", body: "Select every design piece on this side." },
          { n: 2, title: "Undo / Redo", body: "Go back one step, or bring that step back." },
          { n: 3, title: "Zoom", body: "Zoom out and zoom in." },
          { n: 4, title: "CLEAR ALL", body: "Remove all designs from the current side." },
          { n: 5, title: "EDIT LAYER", body: "Open the list of design pieces." },
          { n: 6, title: "Preview", body: "Open DESIGN PREVIEW." },
          { n: 7, title: "Save Design", body: "Save the design for later." },
          { n: 8, title: "Download", body: "Download a proof of the design." },
        ],
      },
    },
    {
      id: "edit-layer",
      title: "EDIT LAYER (the list of pieces)",
      paragraphs: [
        "Click **EDIT LAYER**. A list opens. It shows every word, upload, and graphic on the current side.",
      ],
      actions: [
        "Drag a row to change what sits on top.",
        "Or use the up and down arrows if you prefer.",
        "Delete one piece, or Clear All from this list.",
        "If nothing is on the side yet, it says No elements added yet.",
      ],
      figure: {
        src: "/images/help/design-lab-edit-layer.png",
        alt: "Layers panel open from EDIT LAYER",
        caption: "**EDIT LAYER** opens the list. Reorder or delete design pieces.",
        ...FIG,
        markers: [
          { n: 1, title: "EDIT LAYER", body: "Button that opens this list." },
          { n: 2, title: "Layers list", body: "Each text, image, and graphic on this side." },
          { n: 3, title: "Reorder / Delete", body: "Drag to reorder, or delete one piece." },
        ],
      },
    },
    {
      id: "choose-color",
      title: "CHOOSE COLOR",
      paragraphs: [
        "If you set colors on the product in Custy, shoppers see **CHOOSE COLOR** with colored dots. Click a color to change how the product looks on screen.",
        "If you did not set colors, this section will not show. That is normal.",
      ],
      figure: {
        src: "/images/help/design-lab-choose-color.png",
        alt: "Choose Color swatches in the Design Lab",
        caption: "**CHOOSE COLOR**. Shoppers pick a product color from the colors you set up.",
        ...FIG,
        markers: [
          { n: 1, title: "CHOOSE COLOR", body: "Title for product colors." },
          { n: 2, title: "Swatches", body: "Click a color to change the product look." },
          { n: 3, title: "Selected color name", body: "Shows which color is active." },
        ],
      },
      links: [
        {
          label: "How to Set Up Your First Customizable Product?",
          href: "/help/products/custom-products/first-product",
        },
      ],
    },
    {
      id: "product-side",
      title: "PRODUCT SIDE",
      paragraphs: [
        "**PRODUCT SIDE** shows each side you added (for example Front and Back). Shoppers click a side to design it. Under the product you may also see side buttons.",
        "If a side is turned off for designing, they will see a message that this side is not enabled for customization. That means they cannot put art on that side. Your store is fine.",
      ],
      figure: {
        src: "/images/help/design-lab-product-side.png",
        alt: "Product Side panel with Front and Back thumbnails",
        caption: "**PRODUCT SIDE**. Switch between Front, Back, and other sides you set up.",
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
        "Under **ADD DESIGN OBJECT**, shoppers click **Add Text**. That button goes away and a small form opens on the left. The picture below shows that form after **Add Text** was already clicked.",
        "They type words, pick a font and size, pick a text color, then click **Add Text** again to put the words on the product.",
      ],
      actions: [
        "Type in the box that says Enter your text...",
        "Pick a font (the list may say SELECT A FONT).",
        "Set the size and TEXT COLOR.",
        "Click **Add Text** to place it, or Cancel to close.",
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
        "When a shopper clicks the text on the product, TEXT OPTIONS open on the right. This is where they change the words and how they look.",
      ],
      actions: [
        "CONTENT: **Edit Text Content** to change the words. Duplicate makes a copy. Remove deletes the text.",
        "PRINT & COLOR: pick **PRINTING TYPE** if you offer more than one way to print, and pick COLOR for the ink.",
        "Font tools: **SELECT FONT**, **FONT SIZE**, Bold, Italic, Underline.",
        "Size: WIDTH and HEIGHT. Flip H flips left-right. Flip V flips up-down.",
        "Advanced tools: letter spacing, line height, outline and shadow, rotate, and move left/center/right or top/middle/bottom.",
      ],
      figure: {
        src: "/images/help/design-lab-text-options.png",
        alt: "TEXT OPTIONS panel for selected text: content, printing, typography, and advanced tools",
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
        "Shoppers click **Upload image**. A window titled UPLOAD IMAGE opens.",
      ],
      actions: [
        "Choose Upload A File or From URL.",
        "Click Choose File (or paste a web link and click Load). Allowed file types: JPG, PNG, GIF, BMP, or WebP. Biggest size: 20MB.",
        "Optional: crop the picture, put it in a shape, add a photo effect, or remove the background.",
        "Click Continue (or Add Image) to put the picture on the product.",
      ],
      figure: {
        src: "/images/help/design-lab-upload.png",
        alt: "Upload image flow: button, choose file, then crop and continue",
        caption:
          "UPLOAD IMAGE flow. Top: click Upload image. Middle: Upload A File and Choose File. Bottom: crop and mask, then CONTINUE.",
        width: 2048,
        height: 3362,
        markers: [
          { n: 1, title: "Upload image", body: "Click this to open the upload window." },
          { n: 2, title: "Upload A File / From URL", body: "Two ways to add artwork." },
          { n: 3, title: "Choose File", body: "Pick a JPG, PNG, GIF, BMP, or WebP file." },
          { n: 4, title: "Crop & Mask", body: "Optional crop, shapes, and photo effects." },
          { n: 5, title: "CONTINUE", body: "Places the image on the product." },
        ],
      },
      note: {
        title: "After the picture is on the product",
        body: "Shoppers can click it to change size, flip, rotate, or printing type. Uploaded pictures keep their own colors. There is no color picker for uploads.",
      },
    },
    {
      id: "add-graphic",
      title: "Add Graphic",
      paragraphs: [
        "**Add Graphic** opens your art library (the window says ADD GRAPHIC). Shoppers pick a group, search if they want, and click a graphic to put it on the product.",
        "After it is on the product, they can change size, color (for library art), printing type, flip, and rotate, similar to text.",
      ],
      figure: {
        src: "/images/help/design-lab-add-graphic.png",
        alt: "Add Graphic button, then ADD GRAPHIC library with categories and search",
        caption:
          "ADD GRAPHIC flow. Top: click Add Graphic. Bottom: pick a group, search, then click a graphic to place it.",
        width: 2048,
        height: 2232,
        markers: [
          { n: 1, title: "Add Graphic", body: "Opens the art library." },
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
        "Preview opens **DESIGN PREVIEW** so shoppers can check every side before they buy. From there they can also download a proof.",
        "**Save Design** asks for a name and email. After they save, they get a link they can Copy to open the design later. You can find saved designs under Orders in Custy.",
        "The Download button on the top also saves a proof picture of the design.",
      ],
      figure: {
        src: "/images/help/design-lab-preview.png",
        alt: "Preview icon and DESIGN PREVIEW modal with sides, Download Proof, and Close",
        caption:
          "DESIGN PREVIEW flow. Top: click the eye (Preview). Bottom: check each side, Download Proof, or Close.",
        width: 2048,
        height: 2232,
        markers: [
          { n: 1, title: "Preview", body: "Eye button that opens this window." },
          { n: 2, title: "Preview sides", body: "See each side of the product." },
          { n: 3, title: "Download Proof", body: "Save a proof picture." },
          { n: 4, title: "Close", body: "Go back to designing." },
        ],
      },
    },
    {
      id: "save-design",
      title: "SAVE YOUR DESIGN",
      paragraphs: [
        "Click the **Save Design** button on the top. Enter a design name and email, then click **Save Design**.",
        "When it works, they see **DESIGN SAVED** with a link and a Copy button. There is no separate Share button. They share by copying that link. Your store is not changed by saving a design.",
      ],
      figure: {
        src: "/images/help/design-lab-save.png",
        alt: "Save Design icon, SAVE YOUR DESIGN form, then DESIGN SAVED with copy link",
        caption:
          "Save Design flow. Top: click Save. Middle: enter name and email, then Save Design. Bottom: copy the link.",
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
        "At the bottom, shoppers click **SELECT SIZE & QUANTITY**. A window opens. They pick sizes and how many of each, see the totals, then click ADD TO CART.",
        "**CONTINUE DESIGNING** takes them back to the design screen. On a phone, they may see **CHECKOUT**. That opens the same size and quantity window.",
        "If they try to add to cart with no design, a friendly reminder asks them to Add Design or Continue Anyway. Nothing is broken.",
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
        "Sometimes the **Design Lab** shows a warning. That protects your print quality. It does not mean your store is broken.",
        "You can turn these warnings off in Custy **Settings** for your store, so shoppers do not see them. Open **Settings** and check the warning options (such as low-quality picture and outside the **print area**).",
      ],
      highlights: [
        "Design is outside the **print area**. Move the art inside the dashed box",
        "Picture looks soft or low quality. Upload a larger, clearer file, or make the picture smaller on the product",
        "Too many colors for this printing type. Use fewer colors to match the limit you set",
      ],
      callout: {
        variant: "important",
        title: "You stay in control",
        bullets: [
          "Open **Settings** in Custy to turn shopper warnings on or off.",
          "You can turn off **Add Text**, Upload, **Add Graphic**, or Add to Cart on each product under Restrictions.",
          "Shoppers only design inside the **print areas** and options you set up.",
          "Shopify still runs the cart, payment, and shipping.",
        ],
      },
    },
  ],
};
