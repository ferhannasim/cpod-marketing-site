import type { HelpArticle } from "./types";

const FIG = { width: 1718, height: 915 } as const;
const FIG_OVERVIEW = { width: 3808, height: 4670 } as const;
const FIG_LIST = { width: 1600, height: 900 } as const;
const FIG_SIDES = { width: 1718, height: 916 } as const;
const FIG_DESIGN_TOOL = { width: 3808, height: 4072 } as const;
const FIG_RESTRICTIONS = { width: 3804, height: 4052 } as const;
const FIG_SAVE = { width: 3804, height: 4046 } as const;

export const firstProduct: HelpArticle = {
  slug: "first-product",
  categorySlug: "products",
  subCategorySlug: "custom-products",
  title: "How to Set Up Your First Customizable Product?",
  description:
    "Sync your Shopify products, make one customizable, set sizes, colors, printing, print areas, then save. No coding needed.",
  summary:
    "Turn a Shopify product into a custom product: sync, make it customizable, set options, draw print areas, and save.",
  readMinutes: 6,
  updatedOn: "10 September 2026",
  lead: [
    "To let shoppers design on your store, you first make a product **customizable** in Custy.",
    "Your products still live in Shopify. Custy adds the custom part on top: sizes, colors, printing methods, **print areas**, and which tools shoppers can use. Follow the steps below in order. You can change anything later. Nothing here deletes your Shopify store.",
  ],
  leadLinks: [
    {
      label: "Print Areas & Mark Areas (full guide)",
      href: "/help/products/custom-products/print-areas-and-mark-areas",
    },
    {
      label: "Printing Types & Pricing",
      href: "/help/products/printing-types-and-pricing/pricing-rules",
    },
  ],
  sections: [
    {
      id: "step-1-open-products",
      title: "Step 1: Open Products",
      paragraphs: [
        "In Custy, click **Products** on the left. This is where you sync Shopify products and turn them into custom products.",
        "At the top you will also see tabs for shared lists you can reuse on many products: **Create Colors**, **Product Size**, **Printing Types & Pricing**, and **Quantity Discount**.",
      ],
    },
    {
      id: "step-2-sync",
      title: "Step 2: Sync products from Shopify",
      paragraphs: [
        "If the list is empty, or a new product is missing, sync from Shopify first. Custy does not invent products. It imports the ones you already sell.",
      ],
      actions: [
        "Click **Sync Products** on the banner (or **Sync** in the toolbar after you already have products).",
        "Wait until the list fills. You may see **Syncing…** while it runs.",
        "If a product is still missing, add it in Shopify first, then click **Sync** again.",
      ],
      figure: {
        src: "/images/help/products-list-sync.png",
        alt: "Custy Products page with Sync, filters, search, and Make it customizable",
        caption: "Sync your catalog, find a product, then click **Make it customizable**.",
        ...FIG_LIST,
        markers: [
          {
            n: 1,
            title: "Products tab",
            body: "Your product list. Other top tabs hold shared colors, sizes, printing types, and **quantity discounts**.",
          },
          {
            n: 2,
            title: "Sync / Sync Products",
            body: "Pulls the latest products from Shopify into Custy.",
          },
          {
            n: 3,
            title: "All / Custom / Dropshipped",
            body: "**All** shows every synced product. **Custom** shows ones you already made customizable. **Dropshipped** shows dropship products.",
          },
          {
            n: 4,
            title: "Search products",
            body: "Type part of the product name to find it faster.",
          },
          {
            n: 5,
            title: "Make it customizable",
            body: "Click this on the product you want shoppers to design. If you hit your plan limit, you will see **Upgrade Plan** instead.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "On **Free**, you can make up to 5 custom products. Need more? Upgrade to **Starter** or **Pro**, then come back here.",
        ],
        link: {
          label: "Upgrade Your Plan",
          href: "/help/getting-started/installations/upgrade-your-plan",
        },
      },
    },
    {
      id: "step-3-make-customizable",
      title: "Step 3: Select a product and make it customizable",
      paragraphs: [
        "From the **Products** list, find the product you want. Click **Make it customizable** beside it. Custy opens the **Customize Product** screen for that item.",
        "Already set up? Click **Edit** instead to change it.",
      ],
      actions: [
        "Stay on the **All** filter (or search) until you find the product.",
        "Click **Make it customizable**.",
        "If the button says **Upgrade Plan**, raise your plan limit first, then try again.",
      ],
    },
    {
      id: "step-4-customize-overview",
      title: "Step 4: Work through Customize Product",
      paragraphs: [
        "After you click **Make it customizable**, the **Customize Product** page opens. Work from top to bottom. Only turn on sizes, colors, and printing methods you can really make in your shop.",
        "The page has six sections in this order:",
      ],
      highlights: [
        "**Product Overview**: photo and price from Shopify (turn the designer on later in Step 7)",
        "**Product Sizes**: which size list shoppers can pick",
        "**Printing Types & Pricing**: how it can be printed, plus optional **quantity discount**",
        "**Product Colors**: which colors shoppers can switch to",
        "**Design Tool Setup**: sides, photos, and **print areas**",
        "**Restrictions & Settings**: which tools shoppers may use, and optional stock rules",
      ],
      figure: {
        src: "/images/help/customize-product-overview.png",
        alt: "Customize Product page showing Product Overview and the sections below",
        caption: "Customize Product. Work down the page: sizes, printing, colors, then sides. **Save** and **Active on designer** come at the end (Step 7).",
        ...FIG_OVERVIEW,
        markers: [
          {
            n: 1,
            title: "Product Overview",
            body: "Photo and price from Shopify. Check you have the right product before you set options below.",
          },
          {
            n: 2,
            title: "Product Sizes",
            body: "Pick a size set (or create one).",
          },
          {
            n: 3,
            title: "Printing Types & Pricing",
            body: "Pick at least one printing type. Optional: a **quantity discount** list on **Starter** or higher.",
          },
          {
            n: 4,
            title: "Product Colors",
            body: "Pick a color set (or create one).",
          },
          {
            n: 5,
            title: "Design Tool Setup",
            body: "Add sides, upload photos, and set **print areas** (next steps).",
          },
          {
            n: 6,
            title: "Restrictions & Settings",
            body: "Optional. Limit design tools or stock rules after the main setup.",
          },
        ],
      },
      note: {
        title: "Photo and price",
        body: "The product photo and base price come from Shopify. Change those in Shopify if you need to, then sync again if the list looks out of date. You will click **Save** and set **Active on designer** after the setup steps below.",
      },
    },
    {
      id: "step-4-sizes",
      title: "Step 4a: Product Sizes",
      paragraphs: [
        "Under **Product Sizes**, choose which sizes shoppers can pick. Shoppers only see the sizes you enable here.",
      ],
      actions: [
        "Open the **Size Set** dropdown and pick a set (for example Adult Sizes).",
        "Click **Edit Set** to add or remove sizes in the set you selected.",
        "Click **+ New Size Set** to build a new list and assign it to this product.",
      ],
      figure: {
        src: "/images/help/customize-product-sizes.png",
        alt: "Product Sizes section with Size Set dropdown, Edit Set, and New Size Set",
        caption: "Pick a **Size Set**, or create one with **+ New Size Set**.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Size Set",
            body: "Choose an existing size list for this product.",
          },
          {
            n: 2,
            title: "Edit Set",
            body: "Change the sizes inside the selected set.",
          },
          {
            n: 3,
            title: "+ New Size Set",
            body: "Create a new size list and use it on this product.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "You can also build size lists on the **Product Size** tab at the top of **Products**, then pick them here on many products.",
        ],
      },
    },
    {
      id: "step-4-printing",
      title: "Step 4b: Printing Types & Pricing",
      paragraphs: [
        "Under **Printing Types & Pricing**, choose how this product can be printed. Pick at least one printing type (for example Screen Print or DTG).",
      ],
      actions: [
        "Select one or more printing types from the list.",
        "Click **Add / Edit Printing Types** if you need to create or change a printing method and its fees.",
        "Optional (Starter or higher): open **Quantity Discount** and pick a discount list, or leave **No Discount**.",
      ],
      figure: {
        src: "/images/help/customize-product-printing.png",
        alt: "Printing Types and Pricing section on Customize Product",
        caption: "Select printing types. Use **Add / Edit Printing Types** to build methods and fees.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Printing Types",
            body: "Select at least one method this product supports.",
          },
          {
            n: 2,
            title: "Add / Edit Printing Types",
            body: "Create or edit printing methods and pricing rules.",
          },
          {
            n: 3,
            title: "Quantity Discount",
            body: "Optional list for bulk discounts. Needs **Starter** or higher. On **Free** this tab stays locked.",
          },
        ],
      },
      note: {
        title: "Need help with fees?",
        body: "See the Printing Types & Pricing guide for setup fees, color limits, and quantity discounts.",
      },
      links: [
        {
          label: "How to Set Up Printing Types & Pricing",
          href: "/help/products/printing-types-and-pricing/pricing-rules",
        },
      ],
    },
    {
      id: "step-4-colors",
      title: "Step 4c: Product Colors",
      paragraphs: [
        "Under **Product Colors**, pick the color set shoppers will see in the design screen. They switch product color from that list.",
      ],
      actions: [
        "Open **Select Color Set** and choose a set.",
        "Click **New Color Set** if you need a new list (name, color code, optional swatch, optional extra price).",
        "Check **Applied To** so you know which sides use that color set.",
      ],
      figure: {
        src: "/images/help/customize-product-colors.png",
        alt: "Product Colors section with color set dropdown and New Color Set",
        caption: "Choose a color set, or click **New Color Set** to build one.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Select Color Set",
            body: "Pick an existing color list for this product.",
          },
          {
            n: 2,
            title: "New Color Set",
            body: "Create a new list of colors shoppers can choose.",
          },
          {
            n: 3,
            title: "Applied To",
            body: "Shows which product sides use this color set.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "Shared color lists also live under **Create Colors** on the **Products** page. Build once, reuse on many products.",
        ],
      },
    },
    {
      id: "step-5-design-tool",
      title: "Step 5: Design Tool Setup (sides and print areas)",
      paragraphs: [
        "Scroll to **Design Tool Setup**. Here you add each side shoppers can design (Front, Back, and so on), upload a photo for that side, and set the **print area**.",
        "Plan limits: **Free** allows 1 print side. **Starter** allows up to 6. **Pro** allows as many as you need.",
      ],
      actions: [
        "Click **Add Side** and give the side a clear name (Front, Back, Left Sleeve).",
        "Click **Advanced Settings** on the side you are working on to upload the photo and set the **print area**.",
      ],
      figure: {
        src: "/images/help/design-tool-setup-sides.png",
        alt: "Design Tool Setup with Add Side and Advanced Settings",
        caption: "Add every side shoppers can design, then open **Advanced Settings**.",
        ...FIG_DESIGN_TOOL,
        markers: [
          {
            n: 1,
            title: "Add Side",
            body: "Add a new side. Rename it so you and your print team know which side it is.",
          },
          {
            n: 2,
            title: "Side list",
            body: "Reorder or delete sides. The preview shows the **print area** box on the photo.",
          },
          {
            n: 3,
            title: "Advanced Settings",
            body: "Open **Advanced Settings** on a side. Use **Upload Images & Styles** to add the product photo, then set the **print area**.",
          },
        ],
      },
    },
    {
      id: "step-5-advanced",
      title: "Step 5a: Advanced Settings (print area)",
      paragraphs: [
        "**Advanced Settings** is where you finish each side. Upload the product photo, draw the printable box, set real width and height, and optionally add mark areas as guides.",
      ],
      actions: [
        "Open the **Upload Images & Styles** tab and upload a clear photo for the side.",
        "Open the **Print Area** tab. Drag the box onto the printable part of the product.",
        "Choose **INCH** or **CM**. Enter **Actual Width** and **Height** so the design file matches real print size.",
        "Optional: open **Mark Areas** and add a rectangle or circle as a placement guide.",
        "Click **Update** to save this side, then go back and **Save** the whole product.",
      ],
      figure: {
        src: "/images/help/advanced-print-area.png",
        alt: "Advanced Settings Print Area tab with box, units, and dimensions",
        caption: "Set the **print area** box and real width/height, then click **Update**.",
        ...FIG_SIDES,
        markers: [
          {
            n: 1,
            title: "Side tabs",
            body: "Switch between Front, Back, and other sides you added.",
          },
          {
            n: 2,
            title: "Upload Images & Styles",
            body: "Upload the product photo shoppers see while designing.",
          },
          {
            n: 3,
            title: "Print Area",
            body: "Drag and resize the dashed box over the printable surface.",
          },
          {
            n: 4,
            title: "Unit (INCH / CM)",
            body: "Use the same units you use when you measure for print.",
          },
          {
            n: 5,
            title: "Actual Width / Height",
            body: "Real print size for the output file.",
          },
          {
            n: 6,
            title: "Mark Areas",
            body: "Optional guides inside the **print area**. Printing still follows the print area.",
          },
          {
            n: 7,
            title: "Update",
            body: "Save these Advanced Settings for this side.",
          },
        ],
      },
      links: [
        {
          label: "Full Print Areas & Mark Areas guide",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
        },
      ],
      callout: {
        variant: "important",
        title: "Good to know",
        paragraphs: [
          "Shoppers can only place text and artwork inside the **print area** you set. That protects your print quality. It does not mean the store is broken.",
        ],
      },
    },
    {
      id: "step-6-restrictions",
      title: "Step 6: Restrictions & Settings (optional)",
      paragraphs: [
        "Scroll to **Restrictions & Settings** if you want to limit what shoppers can do on this product, or track stock.",
      ],
      actions: [
        "Under **Design Tool**, turn off tools you do not want (for example **Add text**, **Add clipart**, **Upload**, or **Add to cart**). Use **Select all** if you want every tool on.",
        "Under **Inventory** (Starter or higher), track stock by size, color, and style if you need to.",
      ],
      figure: {
        src: "/images/help/restrictions-settings.png",
        alt: "Restrictions and Settings with Design Tool options",
        caption: "Turn tools on or off per product. Inventory needs **Starter** or higher.",
        ...FIG_RESTRICTIONS,
        markers: [
          {
            n: 1,
            title: "Design Tool",
            body: "Choose which design tools shoppers may use on this product.",
          },
          {
            n: 2,
            title: "Add text / Add clipart / Upload / Add to cart",
            body: "Uncheck any tool you want to hide for this product.",
          },
          {
            n: 3,
            title: "Inventory",
            body: "Optional stock rules by size, color, and style. Needs **Starter** or higher.",
          },
        ],
      },
    },
    {
      id: "step-7-save-activate",
      title: "Step 7: Save and turn the designer on",
      paragraphs: [
        "When the options look right, set **Active on designer** to **Yes**, then click **Save**. You should see a short **Product saved** message.",
        "Custy does not use a separate Activate Now popup. **Active on designer** set to **Yes**, plus a successful **Save**, is what makes the product available in the design screen (after your theme shows **Customize It**).",
      ],
      actions: [
        "Set **Active on designer** to **Yes**.",
        "Click **Save** at the top of **Customize Product**.",
        "Optional: click **View in store** and confirm shoppers see the customize button on that product (often **Customize It**, or the label you set in the theme).",
      ],
      figure: {
        src: "/images/help/customize-product-save.png",
        alt: "Active on designer Yes, Save, then the live store product page",
        caption: "Set **Active on designer** to **Yes**, click **Save**, then check the live product page.",
        ...FIG_SAVE,
        markers: [
          {
            n: 1,
            title: "Active on designer",
            body: "Must be **Yes** for shoppers to open this product in the Design Lab.",
          },
          {
            n: 2,
            title: "Save",
            body: "Saves the custom setup. Toast message: **Product saved**.",
          },
          {
            n: 3,
            title: "Live store button",
            body: "On the product page, shoppers click the customize button (for example **Customize It** or **Design Now**) to open the Design Lab.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "You did not break anything",
        paragraphs: [
          "Saving in Custy does not delete the product from Shopify. You can come back, click **Edit**, and change settings anytime.",
        ],
      },
      links: [
        {
          label: "How to Embed Custy on Your Store?",
          href: "/help/getting-started/app-activation/embed-custy",
        },
        {
          label: "Overview of the Design Lab",
          href: "/help/products/overview-of-the-design-lab",
        },
      ],
    },
    {
      id: "whats-next",
      title: "What to do next",
      paragraphs: [
        "If **Customize It** is missing on the storefront, finish App Activation (theme block + cart editor). Then open the Design Lab overview so you know what shoppers see.",
      ],
      links: [
        {
          label: "Print Areas & Mark Areas",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
        },
        {
          label: "Printing Types & Pricing",
          href: "/help/products/printing-types-and-pricing/pricing-rules",
        },
        {
          label: "Overview of the Design Lab",
          href: "/help/products/overview-of-the-design-lab",
        },
      ],
    },
  ],
};
