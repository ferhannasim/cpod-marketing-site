import type { HelpArticle } from "./types";

const FIG = { width: 1718, height: 915 } as const;
const FIG_WIDE = { width: 1904, height: 1023 } as const;

export const productColors: HelpArticle = {
  slug: "product-colors",
  categorySlug: "products",
  subCategorySlug: "custom-products",
  title: "How to Set Up Product Colors?",
  description:
    "Create color sets with hex codes, optional extra prices, and dark-color flags, then assign them to a custom product.",
  summary:
    "Build reusable color lists, set extra prices, assign a color set on each product, and upload grayscale or per-color photos.",
  readMinutes: 7,
  updatedOn: "11 September 2026",
  lead: [
    "With Custy you can offer shoppers a list of product colors, and charge a little more for premium colors if you want. Shoppers pick a color in the **Design Lab**.",
    "You can build color sets once and reuse them on many products. Changing a color set does not delete your Shopify products.",
  ],
  leadLinks: [
    {
      label: "How to Set Up Product Sizes?",
      href: "/help/products/custom-products/product-sizes",
    },
    {
      label: "How to Set Up Your First Customizable Product?",
      href: "/help/products/custom-products/first-product",
    },
  ],
  sections: [
    {
      id: "two-places",
      title: "Two places to work with colors",
      paragraphs: [
        "You will use colors in two spots. Both use the same color sets.",
      ],
      highlights: [
        "**Products** → **Create Colors** tab: build and edit shared color sets for the whole store",
        "**Customize Product** → **Product Colors**: pick which color set this one product uses",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "For solid colors, upload a grayscale product photo in **Advanced Settings**. Custy tints that photo with the color hex shoppers pick. For camo, heather, or other special looks, set **Image Instead of Color** to **Yes** and upload a full photo (Steps 5–5c below).",
        ],
      },
    },
    {
      id: "open-create-colors",
      title: "Step 1: Open Create Colors",
      paragraphs: [
        "In Custy, click **Products** on the left. At the top, click the **Create Colors** tab. This is where you manage shared color sets.",
      ],
      figure: {
        src: "/images/help/create-colors-tab.png",
        alt: "Products page with Create Colors tab and color set list",
        caption: "Open **Create Colors** to build color lists you can reuse.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Create Colors",
            body: "Top tab for shared color catalogs (next to Products and Product Size).",
          },
          {
            n: 2,
            title: "Add Color Set",
            body: "Create a new color list from scratch.",
          },
          {
            n: 3,
            title: "Color set list",
            body: "Each row shows the set name, swatches, and actions (Edit, copy, Delete).",
          },
        ],
      },
    },
    {
      id: "create-color-set",
      title: "Step 2: Create a new color set",
      paragraphs: [
        "Click **Add Color Set**. The **Create Color Set** window opens.",
      ],
      actions: [
        "Enter a **Color Set Name** (for example Tee Basics or Mug Solids).",
        "Under **Colors**, click **Add Color** for each color you sell.",
        "Fill in **Color Name**, **Hex Value** (6 digits, no #), optional **Icon**, **Price ($)**, **Dark Color**, and **Image Instead of Color**.",
        "Drag rows to reorder. Use the trash icon to remove a color.",
        "Click **Save**.",
      ],
      figure: {
        src: "/images/help/create-color-set-modal.png",
        alt: "Create Color Set modal with color name, hex, price, and dark color",
        caption: "Name the set, add colors and optional extra prices, then click **Save**.",
        ...FIG_WIDE,
        markers: [
          {
            n: 1,
            title: "Color Set Name",
            body: "A clear name you will recognize when assigning this set to products.",
          },
          {
            n: 2,
            title: "Color Name / Hex Value",
            body: "What shoppers see, plus the 6-digit hex used to tint the mockup.",
          },
          {
            n: 3,
            title: "Price ($)",
            body: "Optional add-on when shoppers pick this color. Use 0.00 if there is no extra charge.",
          },
          {
            n: 4,
            title: "Dark Color",
            body: "Turn on for dark garments so printing prices that use light/dark rules can apply.",
          },
          {
            n: 5,
            title: "Image Instead of Color",
            body: "Choose **Yes** when you will upload a full photo for that color instead of tinting grayscale.",
          },
          {
            n: 6,
            title: "Save",
            body: "Creates the color set. On edit, this button says **Update**.",
          },
        ],
      },
      callout: {
        variant: "important",
        title: "Dark Color and printing fees",
        paragraphs: [
          "If your printing type charges differently for light and dark garments, set **Dark Color** correctly on each row. You set those fees under **Printing Types & Pricing**.",
        ],
        link: {
          label: "Printing Types & Pricing",
          href: "/help/products/printing-types-and-pricing/pricing-rules",
        },
      },
    },
    {
      id: "full-color-set",
      title: "Full Color Set (built in)",
      paragraphs: [
        "Custy includes a system set named **Full Color Set**. It is marked **Default** in the list. Shoppers get a free color picker instead of a fixed swatch list.",
      ],
      note: {
        title: "You cannot edit Full Color Set",
        body: "Edit, copy, and Delete stay disabled for **Full Color Set**. Build your own set when you want a fixed list of store colors.",
      },
    },
    {
      id: "edit-color-set",
      title: "Step 3: Edit, copy, or delete a color set",
      paragraphs: [
        "On the **Create Colors** list, use the row actions:",
      ],
      actions: [
        "**Edit**: open **Edit Color Set**, change names or prices, then click **Update**.",
        "Duplicate (copy icon): makes **{name} (Copy)** so you can tweak a new list without changing the original.",
        "**Delete**: confirm **Delete color set**. You cannot delete **Full Color Set**.",
      ],
      figure: {
        src: "/images/help/create-colors-list-actions.png",
        alt: "Color set table with Edit, duplicate, and Delete actions",
        caption: "Edit or copy a set anytime. **Full Color Set** cannot be edited or deleted.",
        ...FIG,
        markers: [
          {
            n: 1,
            title: "Default badge",
            body: "Marks the system **Full Color Set**.",
          },
          {
            n: 2,
            title: "Edit",
            body: "Change the set name, colors, or prices (not available on Full Color Set).",
          },
          {
            n: 3,
            title: "Delete",
            body: "Removes a custom set. Confirm in the dialog before it is gone.",
          },
        ],
      },
    },
    {
      id: "assign-on-product",
      title: "Step 4: Assign a color set on Customize Product",
      paragraphs: [
        "Open the product (**Make it customizable** or **Edit**). Scroll to **Product Colors**.",
      ],
      actions: [
        "Open **Select Color Set** and pick a set (or leave **Select color set** empty).",
        "Optional: click **New Color Set** (or the + icon) to create a set here.",
        "Optional: click the pencil to edit the selected custom set.",
        "Check **Applied To** for the side names on this product (for example Front, Back).",
      ],
      figure: {
        src: "/images/help/customize-product-colors.png",
        alt: "Customize Product Product Colors section with color set dropdown",
        caption: "Pick a color set for this product. Shoppers switch colors from that list in the Design Lab.",
        ...FIG_WIDE,
        markers: [
          {
            n: 1,
            title: "Select Color Set",
            body: "Choose an existing color list for this product.",
          },
          {
            n: 2,
            title: "New Color Set",
            body: "Create a new list of colors shoppers can choose.",
          },
          {
            n: 3,
            title: "Applied To",
            body: "Shows which product sides exist on this product.",
          },
        ],
      },
      note: {
        title: "Default color",
        body: "The starting color shoppers see is set in **Advanced Settings** (Design Tool Setup), not in this table. Open **Advanced Settings**, click **Set default color**, pick a color, then **Save**.",
      },
    },
    {
      id: "image-instead-of-color",
      title: "Step 5: Mark colors that need their own photo",
      paragraphs: [
        "Some colors look better as a real photo (camo, heather, prints) instead of tinting a grayscale mockup. For those colors, turn on **Image Instead of Color** in the color set first. Then you will upload a matching photo on the product.",
      ],
      actions: [
        "Open **Create Colors** (or edit the set from **Product Colors** with the pencil).",
        "Find the color row (for example Black Heather or Camo).",
        "Under **Image Instead of Color**, click **Yes**.",
        "Leave **No** on colors you want Custy to tint from grayscale with the hex code.",
        "Click **Update** (or **Save** if you are creating the set).",
      ],
      figure: {
        src: "/images/help/create-color-set-image-instead.png",
        alt: "Color set modal with Image Instead of Color Yes and No on a color row",
        caption: "Set **Image Instead of Color** to **Yes** for any color that needs its own product photo.",
        ...FIG_WIDE,
        markers: [
          {
            n: 1,
            title: "Color row",
            body: "The color that should show a real photo in the Design Lab.",
          },
          {
            n: 2,
            title: "Image Instead of Color",
            body: "Click **Yes** for a photo. Click **No** to tint the grayscale mockup with the hex.",
          },
          {
            n: 3,
            title: "Update / Save",
            body: "Save the color set before you upload photos on the product.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "You can mix both in one set: most colors use grayscale + hex, and one or two special colors use **Yes** with their own photos.",
        ],
      },
    },
    {
      id: "open-upload-images",
      title: "Step 5a: Open Upload Images & Styles",
      paragraphs: [
        "Photos are uploaded per product side, not on the color set screen. After the color set is assigned to the product, open Advanced Settings for each side that shoppers can design.",
      ],
      actions: [
        "On **Customize Product**, scroll to **Design Tool Setup**.",
        "On the side you want (Front, Back, and so on), click **Advanced Settings**.",
        "Open the **Upload Images & Styles** tab.",
      ],
      figure: {
        src: "/images/help/design-tool-advanced-upload-entry.png",
        alt: "Design Tool Setup with Advanced Settings leading to Upload Images and Styles",
        caption: "Open **Advanced Settings** on a side, then choose **Upload Images & Styles**.",
        ...FIG_WIDE,
        markers: [
          {
            n: 1,
            title: "Design Tool Setup",
            body: "Your product sides live here.",
          },
          {
            n: 2,
            title: "Advanced Settings",
            body: "Click this on the side you are setting up.",
          },
          {
            n: 3,
            title: "Upload Images & Styles",
            body: "Tab where you add grayscale and per-color photos.",
          },
        ],
      },
      note: {
        title: "Do this for each side",
        body: "If Front and Back both need color photos, repeat the upload steps for each side.",
      },
    },
    {
      id: "upload-grayscale",
      title: "Step 5b: Upload Default (Grayscale) for tintable colors",
      paragraphs: [
        "For every color still set to **Image Instead of Color = No**, Custy needs one grayscale mockup. It recolors that photo with the hex when shoppers pick a color.",
      ],
      actions: [
        "On **Upload Images & Styles**, find the card **Default (Grayscale)**.",
        "Click **Upload Image** and choose a clear product photo (solid look, good lighting; a light/gray base works best for tinting).",
        "Wait until the preview shows. Use **Remove** if you need to replace it.",
      ],
      figure: {
        src: "/images/help/advanced-upload-grayscale.png",
        alt: "Upload Images and Styles with Default Grayscale card",
        caption: "Upload **Default (Grayscale)** so tintable colors can recolor the mockup.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Upload Images & Styles",
            body: "Stay on this tab while you add photos.",
          },
          {
            n: 2,
            title: "Default (Grayscale)",
            body: "One shared photo for all colors that use hex tinting (Image Instead = No).",
          },
          {
            n: 3,
            title: "Upload Image",
            body: "Click to add or replace the grayscale mockup.",
          },
        ],
      },
      callout: {
        variant: "important",
        title: "When you only use Image Instead colors",
        paragraphs: [
          "If every color in the set is **Image Instead of Color = Yes**, you may not need grayscale. Upload a photo for each color instead (next step).",
        ],
      },
    },
    {
      id: "upload-per-color",
      title: "Step 5c: Upload a photo for each Image Instead color",
      paragraphs: [
        "After you marked colors as **Yes**, Advanced Settings shows a card for each of those colors (named like the color, for example Black or Camo). Upload the real product photo for that color.",
      ],
      actions: [
        "Confirm the product still uses this color set under **Product Colors**.",
        "In **Advanced Settings** → **Upload Images & Styles**, find the card named after the color (not Default Grayscale).",
        "Click **Upload Image** on that card and choose the photo of the product in that color.",
        "Repeat for every color that has **Image Instead of Color = Yes**.",
        "Click **Update** at the bottom of Advanced Settings to save this side.",
        "Back on **Customize Product**, click **Save** if you still need to save the whole product.",
      ],
      figure: {
        src: "/images/help/advanced-upload-per-color.png",
        alt: "Upload Images and Styles with per-color image cards for Image Instead colors",
        caption: "Each **Image Instead** color gets its own upload card. Add a photo, then click **Update**.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Color name card",
            body: "Appears for each color with Image Instead of Color = Yes.",
          },
          {
            n: 2,
            title: "Upload Image",
            body: "Add the real product photo for that color.",
          },
          {
            n: 3,
            title: "Update",
            body: "Save Advanced Settings for this side when the photos look right.",
          },
        ],
      },
      callout: {
        variant: "tip",
        title: "Check in the Design Lab",
        paragraphs: [
          "Open **Design Panel** or your live **Customize It** button. Switch product colors. Tintable colors should recolor the grayscale photo. Image Instead colors should show the photo you uploaded.",
        ],
      },
      links: [
        {
          label: "Print Areas & Mark Areas",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
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
        "Next, finish print areas if needed, or set printing types and fees. Then set **Active on designer** to **Yes** and click **Save** on the product.",
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
          label: "How to Set Up Your First Customizable Product?",
          href: "/help/products/custom-products/first-product",
        },
      ],
    },
  ],
};
