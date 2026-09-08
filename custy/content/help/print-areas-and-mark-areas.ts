import type { HelpArticle } from "./types";

export const printAreasAndMarkAreas: HelpArticle = {
  slug: "print-areas-and-mark-areas",
  categorySlug: "getting-started",
  subCategorySlug: "product-setup",
  title: "Print Areas & Mark Areas",
  description:
    "Add product sides, upload mockups, define each print area in inches or centimeters, and optionally add mark areas for placement reference.",
  summary:
    "Tell Custy exactly where customers may place text, images, and graphics on every side.",
  readMinutes: 5,
  lead: [
    "In Design Tool Setup you define sides (for example Front and Back), upload the images shoppers see, and set a Print Area on each part. The print area is the printable boundary. Mark Areas are optional rectangles or ellipses inside that boundary for placement reference — they are not a separate production print box.",
    "Plan limits apply: Free allows 1 print side, Starter up to 6, Pro unlimited.",
  ],
  sections: [
    {
      id: "design-tool-setup",
      title: "Open Design Tool Setup",
      paragraphs: [
        "On Customize Product, scroll to Design Tool Setup. Add, rename, reorder, or delete sides. Each side can contain parts, styles, and a print area configured in Advanced Settings.",
      ],
      actions: [
        "Select Add Side and name the side clearly (Front, Back, Left Sleeve, and so on).",
        "Reorder sides so the default view matches how you sell the product.",
        "Open Advanced Settings on the side you are configuring.",
      ],
      figure: {
        src: "/images/help/design-tool-setup-sides.png",
        alt: "Custy Design Tool Setup with product sides and Advanced Settings",
        caption: "Create every side customers can design, then open Advanced Settings.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Add Side",
            body: "Create a new product side for the designer.",
          },
          {
            n: 2,
            title: "Side list",
            body: "Rename, reorder, or delete sides. The live overlay previews the print area.",
          },
          {
            n: 3,
            title: "Advanced Settings",
            body: "Upload images, set the print area, and add mark areas for this side.",
          },
        ],
      },
    },
    {
      id: "upload-images-styles",
      title: "Upload Images & Styles",
      paragraphs: [
        "In Advanced Settings, open Upload Images & Styles. Upload the product mockup shoppers should see. You can provide grayscale defaults and per-color product images so garment color changes look correct in the editor.",
      ],
      actions: [
        "Upload at least one clear product image for the side.",
        "Add per-color images when a single mockup cannot represent every color.",
        "Confirm the part selected in the left sidebar (a default part is created for you).",
      ],
      figure: {
        src: "/images/help/advanced-upload-styles.png",
        alt: "Advanced Settings Upload Images and Styles tab for a product side",
        caption: "Upload Product Images so the Design Lab shows the correct mockup.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Upload Images & Styles",
            body: "Tab for mockups and style variants on this part.",
          },
          {
            n: 2,
            title: "Parts",
            body: "Left sidebar parts belonging to this side.",
          },
          {
            n: 3,
            title: "Upload Product Images",
            body: "Grayscale and per-color images used in the live preview.",
          },
        ],
      },
    },
    {
      id: "define-print-area",
      title: "Define the Print Area",
      paragraphs: [
        "Open the Print Area tab. A dashed Print Area overlay appears on the mockup. Set Unit to INCH or CM, then enter Actual Width, Height, Left, and Top. Changing Actual Width recalibrates PPI so digital size matches real production size. Select Save when the boundary matches your printable region.",
      ],
      actions: [
        "Choose INCH or CM to match how you measure production art.",
        "Set Actual Width and Height to the real printable size.",
        "Adjust Left and Top so the dashed box sits on the printable region of the mockup.",
        "Select Save, then repeat for every side and part that accepts artwork.",
      ],
      figure: {
        src: "/images/help/advanced-print-area.png",
        alt: "Advanced Settings Print Area tab with dashed overlay on the product mockup",
        caption: "Align the dashed Print Area with the real printable boundary.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Print Area tab",
            body: "Controls for the printable boundary on this part.",
          },
          {
            n: 2,
            title: "Unit",
            body: "INCH or CM for width, height, left, and top.",
          },
          {
            n: 3,
            title: "Actual Width",
            body: "Real-world width. Changing it recalibrates PPI.",
          },
          {
            n: 4,
            title: "Height",
            body: "Real-world height of the printable region.",
          },
          {
            n: 5,
            title: "Left",
            body: "Horizontal offset of the print area on the mockup.",
          },
          {
            n: 6,
            title: "Top",
            body: "Vertical offset of the print area on the mockup.",
          },
          {
            n: 7,
            title: "Print Area overlay",
            body: "Dashed boundary shoppers must stay inside when designing.",
          },
          {
            n: 8,
            title: "Save",
            body: "Commit print area measurements for this side and part.",
          },
        ],
      },
      note: {
        title: "Why this matters",
        body: "Customers can only place designs inside the print area you define. Match it to production so artwork does not shift or clip when you print.",
      },
    },
    {
      id: "mark-areas",
      title: "Add Mark Areas (optional)",
      paragraphs: [
        "Mark Areas are secondary shapes inside the print area. Use Add Rectangle or Add Circle/Ellipse when you need placement guides. Production and export still key off the Print Area, not mark areas alone.",
      ],
      actions: [
        "Open the Mark Areas tab.",
        "Select Add Rectangle or Add Circle/Ellipse.",
        "Position and resize shapes with the drag handles.",
        "Save when the guides look correct.",
      ],
      figure: {
        src: "/images/help/advanced-mark-areas.png",
        alt: "Advanced Settings Mark Areas tab with rectangle and ellipse tools",
        caption: "Optional mark areas help placement inside the print area.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Mark Areas tab",
            body: "Optional placement shapes inside the print area.",
          },
          {
            n: 2,
            title: "Add Rectangle",
            body: "Place a rectangular mark area on the canvas.",
          },
          {
            n: 3,
            title: "Add Circle/Ellipse",
            body: "Place an elliptical mark area on the canvas.",
          },
          {
            n: 4,
            title: "Shapes on canvas",
            body: "Drag and resize mark areas to match your template guides.",
          },
        ],
      },
    },
  ],
};
