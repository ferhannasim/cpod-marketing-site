import type { HelpArticle } from "./types";

export const printAreasAndMarkAreas: HelpArticle = {
  slug: "print-areas-and-mark-areas",
  categorySlug: "getting-started",
  subCategorySlug: "product-setup",
  title: "Print Areas & Mark Areas",
  description:
    "Add each side of the product, upload a photo, and draw the box where artwork can go.",
  summary:
    "Show Custy where shoppers may place text and pictures on each side of the product.",
  readMinutes: 5,
  lead: [
    "Think of a print area like the printable window on a shirt. You tell Custy: “artwork can go here, and nowhere else.” Mark areas are optional helper shapes inside that window. They are guides only — printing still follows the print area.",
    "Plan limits: Free allows 1 print side. Starter allows up to 6. Pro allows as many as you need.",
  ],
  sections: [
    {
      id: "design-tool-setup",
      title: "Open Design Tool Setup",
      paragraphs: [
        "On Customize Product, scroll to Design Tool Setup. Here you add sides such as Front and Back. For each side you will upload a photo and set the print area.",
      ],
      actions: [
        "Click Add Side and give it a clear name (Front, Back, Left Sleeve, and so on).",
        "Drag sides into the order you want shoppers to see first.",
        "Click Advanced Settings on the side you are working on.",
      ],
      figure: {
        src: "/images/help/design-tool-setup-sides.png",
        alt: "Design Tool Setup with sides and Advanced Settings",
        caption: "Add every side shoppers can design, then open Advanced Settings.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Add Side",
            body: "Click to add a new side (for example Front).",
          },
          {
            n: 2,
            title: "Side list",
            body: "Rename, reorder, or delete sides. The preview shows the print box.",
          },
          {
            n: 3,
            title: "Advanced Settings",
            body: "Click here to upload photos and set the print area for this side.",
          },
        ],
      },
    },
    {
      id: "upload-images-styles",
      title: "Upload your product photos",
      paragraphs: [
        "In Advanced Settings, open Upload Images & Styles. Upload a clear photo of the product on that side — the picture shoppers will see while they design. If one photo cannot show every color well, you can add a photo per color.",
      ],
      actions: [
        "Upload at least one clear product photo for the side.",
        "Add per-color photos if you need them.",
        "Check that the part on the left is selected (Custy makes a default part for you).",
      ],
      figure: {
        src: "/images/help/advanced-upload-styles.png",
        alt: "Upload Images and Styles tab for a product side",
        caption: "Upload product photos so the design screen shows the right mockup.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Upload Images & Styles",
            body: "This tab is for product photos on this side.",
          },
          {
            n: 2,
            title: "Parts",
            body: "Parts for this side appear on the left.",
          },
          {
            n: 3,
            title: "Upload Product Images",
            body: "Add the photos shoppers will see in the design screen.",
          },
        ],
      },
    },
    {
      id: "define-print-area",
      title: "Set the Print Area",
      paragraphs: [
        "Open the Print Area tab. You will see a dashed box on the photo. That box is the printable window. Choose INCH or CM. Fill in Actual Width, Height, Left, and Top so the dashed box sits on the real printable part of the garment. Click Save when it looks right.",
      ],
      actions: [
        "Choose INCH or CM — use the same units you use when you measure for print.",
        "Set Actual Width and Height to the real printable size.",
        "Move Left and Top until the dashed box sits on the printable area of the photo.",
        "Click Save. Repeat for every side that accepts artwork.",
      ],
      figure: {
        src: "/images/help/advanced-print-area.png",
        alt: "Print Area tab with dashed box on the product photo",
        caption: "Line up the dashed Print Area with the real printable spot.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Print Area tab",
            body: "Controls for the printable window on this side.",
          },
          {
            n: 2,
            title: "Unit",
            body: "Pick INCH or CM.",
          },
          {
            n: 3,
            title: "Actual Width",
            body: "How wide the printable area is in real life.",
          },
          {
            n: 4,
            title: "Height",
            body: "How tall the printable area is in real life.",
          },
          {
            n: 5,
            title: "Left",
            body: "Moves the box left or right on the photo.",
          },
          {
            n: 6,
            title: "Top",
            body: "Moves the box up or down on the photo.",
          },
          {
            n: 7,
            title: "Dashed box",
            body: "Shoppers must keep their design inside this box.",
          },
          {
            n: 8,
            title: "Save",
            body: "Click Save when the box looks correct.",
          },
        ],
      },
      note: {
        title: "Why this matters",
        body: "Shoppers can only place designs inside the print area you set. Match it to how you really print so artwork does not shift or get cut off.",
      },
    },
    {
      id: "mark-areas",
      title: "Add Mark Areas (optional)",
      paragraphs: [
        "Mark areas are extra shapes inside the print area. Use them as placement guides (for example “put the logo here”). Printing still follows the Print Area, not the mark areas alone.",
      ],
      actions: [
        "Open the Mark Areas tab.",
        "Click Add Rectangle or Add Circle/Ellipse.",
        "Drag the corners to move and resize the shape.",
        "Click Save when the guides look right.",
      ],
      figure: {
        src: "/images/help/advanced-mark-areas.png",
        alt: "Mark Areas tab with rectangle and circle tools",
        caption: "Optional mark areas help show where to place artwork.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Mark Areas tab",
            body: "Optional guide shapes inside the print area.",
          },
          {
            n: 2,
            title: "Add Rectangle",
            body: "Add a square or rectangle guide.",
          },
          {
            n: 3,
            title: "Add Circle/Ellipse",
            body: "Add a round guide.",
          },
          {
            n: 4,
            title: "Shapes on the photo",
            body: "Drag and resize until the guide matches what you want.",
          },
        ],
      },
    },
  ],
};
