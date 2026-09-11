import type { HelpArticle } from "./types";

const FIG_TAB = { width: 1718, height: 915 } as const;
const FIG_MODAL = { width: 1904, height: 1023 } as const;
const FIG_ASSIGN = { width: 1904, height: 1023 } as const;

export const productSizes: HelpArticle = {
  slug: "product-sizes",
  categorySlug: "products",
  subCategorySlug: "custom-products",
  title: "How to Set Up Product Sizes?",
  description:
    "Create size sets, add sizes with optional extra prices, and assign them to a custom product. No coding needed.",
  summary:
    "Build reusable size lists (Adult, Youth, Open), set extra prices, and pick a size set on each product.",
  readMinutes: 3,
  updatedOn: "11 September 2026",
  lead: [
    "Custy **Product Size** options let you offer several sizes and charge a little more for bigger ones if you want. Shoppers pick sizes in the **Design Lab** when they add the design to the cart.",
    "You can build size lists once and reuse them on many products. Changing a size set does not delete your Shopify products.",
  ],
  leadLinks: [
    {
      label: "How to Set Up Your First Customizable Product?",
      href: "/help/products/custom-products/first-product",
    },
  ],
  sections: [
    {
      id: "two-places",
      title: "Two places to work with sizes",
      paragraphs: [
        "You will use sizes in two spots. Both use the same size lists.",
      ],
      highlights: [
        "**Products** → **Product Size** tab: build and edit shared size sets for the whole store",
        "**Customize Product** → **Product Sizes**: pick which size set this one product uses",
      ],
      callout: {
        variant: "tip",
        title: "Tip",
        paragraphs: [
          "If you already made a product customizable, open it with **Edit** and scroll to **Product Sizes**. You can also create a new size set from that screen.",
        ],
      },
    },
    {
      id: "open-product-size-tab",
      title: "Step 1: Open the Product Size tab",
      paragraphs: [
        "In Custy, click **Products** on the left. At the top, click the **Product Size** tab. This is where you manage shared size sets.",
      ],
      figure: {
        src: "/images/help/product-size-tab.png",
        alt: "Products page with Product Size tab and size set list",
        caption: "Open **Product Size** to build size lists you can reuse.",
        ...FIG_TAB,
        markers: [
          {
            n: 1,
            title: "Product Size",
            body: "Top tab for shared size catalogs (next to Create Colors and Printing Types).",
          },
          {
            n: 2,
            title: "Category tabs",
            body: "**Open Sizes**, **Adult Sizes**, and **Youth Sizes**. Pick the group that matches the product.",
          },
          {
            n: 3,
            title: "Add Size Set",
            body: "Create a new size list for the category you selected.",
          },
          {
            n: 4,
            title: "Size set list",
            body: "Each row shows the set name, sizes, and whether products already use it.",
          },
        ],
      },
    },
    {
      id: "size-categories",
      title: "Step 2: Pick a size category",
      paragraphs: [
        "Custy gives you three categories. They work the same way: each holds size sets with named sizes (S, M, L, and so on).",
      ],
      highlights: [
        "**Adult Sizes**: for adult apparel and most everyday products",
        "**Youth Sizes**: for kids and youth products",
        "**Open Sizes**: another labeled group for size lists (same setup as Adult and Youth)",
      ],
      note: {
        title: "Good to know",
        body: "Shoppers do not type free-form measurements here. They pick from the size titles you add. If a product has no size set, the Design Lab may show a simple quantity step instead.",
      },
    },
    {
      id: "create-size-set",
      title: "Step 3: Create a new size set",
      paragraphs: [
        "On the **Product Size** tab, pick a category, then click **Add Size Set**. The **Create Size Set** window opens.",
      ],
      actions: [
        "Enter a **Size Set Name** (for example Adult Tee or Mug One Size).",
        "For each size, fill in **Size Title** (S, M, L, XL) and optional **Extra Price ($)**.",
        "Click **Add Size** for more rows.",
        "Drag the handle to reorder sizes. Use the trash icon to remove a size.",
        "Click **Save**.",
      ],
      figure: {
        src: "/images/help/product-size-create-set.png",
        alt: "Create Size Set modal with name, size titles, and extra prices",
        caption: "Name the set, add sizes and optional extra prices, then click **Save**.",
        ...FIG_MODAL,
        markers: [
          {
            n: 1,
            title: "Size Set Name",
            body: "A clear name you will recognize when assigning this set to products.",
          },
          {
            n: 2,
            title: "Size Title",
            body: "What shoppers see (for example S, M, L, or 2XL).",
          },
          {
            n: 3,
            title: "Extra Price ($)",
            body: "Optional add-on for that size. Use 0.00 if there is no extra charge.",
          },
          {
            n: 4,
            title: "Add Size",
            body: "Add another size row to the list.",
          },
          {
            n: 5,
            title: "Save",
            body: "Creates the size set. On edit, this button says **Update**.",
          },
        ],
      },
      callout: {
        variant: "important",
        title: "Extra price",
        paragraphs: [
          "If XL costs more to print or ship, put that amount in **Extra Price ($)**. Shoppers see it next to the size when they choose quantity in the Design Lab.",
        ],
      },
    },
    {
      id: "edit-size-set",
      title: "Step 4: Edit, copy, or delete a size set",
      paragraphs: [
        "On the **Product Size** list, use the row actions:",
      ],
      actions: [
        "**Edit**: open **Edit Size Set**, change names or prices, then click **Update**.",
        "Duplicate (copy icon): makes **{name} (Copy)** so you can tweak a new list without changing the original.",
        "**Delete**: only when the set is **Not used**. If products already use it, remove it from those products first.",
      ],
      figure: {
        src: "/images/help/product-size-list-actions.png",
        alt: "Size set table with Edit, duplicate, and Delete actions",
        caption: "Edit or copy a set anytime. Delete only when no product is using it.",
        ...FIG_TAB,
        markers: [
          {
            n: 1,
            title: "Status",
            body: "Shows how many products use this set, or **Not used**.",
          },
          {
            n: 2,
            title: "Edit",
            body: "Change the set name, sizes, or extra prices.",
          },
          {
            n: 3,
            title: "Delete",
            body: "Available when the set is not assigned to any product.",
          },
        ],
      },
    },
    {
      id: "assign-on-product",
      title: "Step 5: Assign a size set on Customize Product",
      paragraphs: [
        "Open the product (**Make it customizable** or **Edit**). Scroll to **Product Sizes**.",
      ],
      actions: [
        "Choose **Adult Sizes**, **Youth Sizes**, or **Open Sizes**.",
        "Open the **Size Set** dropdown and pick a set (or leave **No Size Set**).",
        "Optional: click **Edit Set** to change the selected set, or **+ New Size Set** to create one here.",
        "Check the size badges under the dropdown. Custy saves the choice as you go.",
      ],
      figure: {
        src: "/images/help/customize-product-sizes.png",
        alt: "Customize Product Product Sizes section with Size Set dropdown",
        caption: "Pick a **Size Set** for this product. Shoppers only see the sizes you enable here.",
        ...FIG_ASSIGN,
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
      note: {
        title: "After you assign sizes",
        body: "Finish the rest of **Customize Product** if needed, set **Active on designer** to **Yes**, and click **Save**. Shoppers then pick these sizes in the Design Lab.",
      },
      links: [
        {
          label: "How to Set Up Your First Customizable Product?",
          href: "/help/products/custom-products/first-product",
        },
        {
          label: "Print Areas & Mark Areas",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
        },
      ],
    },
    {
      id: "whats-next",
      title: "What to do next",
      paragraphs: [
        "Next, set up product colors, then print areas so artwork stays in the right place.",
      ],
      links: [
        {
          label: "How to Set Up Product Colors?",
          href: "/help/products/custom-products/product-colors",
        },
        {
          label: "Print Areas & Mark Areas",
          href: "/help/products/custom-products/print-areas-and-mark-areas",
        },
        {
          label: "Printing Types & Pricing",
          href: "/help/products/printing-types-and-pricing/pricing-rules",
        },
      ],
    },
  ],
};
