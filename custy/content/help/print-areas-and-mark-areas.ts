import type { HelpArticle } from "./types";

export const printAreasAndMarkAreas: HelpArticle = {
  slug: "print-areas-and-mark-areas",
  categorySlug: "products",
  subCategorySlug: "custom-products",
  title: "Print Areas & Mark Areas",
  description:
    "Add each side of the product, upload a photo, and draw the box where artwork can go.",
  summary:
    "Show Custy where shoppers may place text and pictures on each side of the product.",
  readMinutes: 5,
  updatedOn: "10 September 2026",
  lead: [
    "Think of a **print area** like the printable window on a shirt. You tell Custy: artwork can go here, and nowhere else. Mark areas are optional helper shapes inside that window. They are guides only. Printing still follows the **print area**.",
    "Plan limits: **Free** allows 1 print side. **Starter** allows up to 6. **Pro** allows as many as you need. Changing these settings does not wipe your store.",
  ],
  sections: [
    {
      id: "design-tool-setup",
      title: "Open Design Tool Setup",
      paragraphs: [
        "On **Customize Product**, scroll to **Design Tool Setup**. Here you add sides such as Front and Back. For each side you will upload a photo and set the **print area**.",
      ],
      actions: [
        "Click Add Side and give it a clear name (Front, Back, Left Sleeve, and so on).",
        "Drag sides into the order you want shoppers to see first.",
        "Click **Advanced Settings** on the side you are working on.",
      ],
      figure: {
        src: "/images/help/design-tool-setup-sides.png",
        alt: "Design Tool Setup with sides and Advanced Settings",
        caption: "Add every side shoppers can design, then open **Advanced Settings**.",
        width: 3808,
        height: 4072,
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
            body: "Open **Advanced Settings** on a side. Use **Upload Images & Styles** to add the product photo, then set the **print area**.",
          },
        ],
      },
    },
    {
      id: "upload-images-styles",
      title: "Upload your product photos",
      paragraphs: [
        "In **Advanced Settings**, open **Upload Images & Styles**. Upload a clear photo of the product on that side (the picture shoppers will see while they design). If one photo cannot show every color well, you can add a photo per color.",
      ],
      actions: [
        "Upload at least one clear product photo for the side.",
        "Add per-color photos if you need them.",
        "Leave the default selection on the left as it is unless you know you need something else.",
      ],
      figure: {
        src: "/images/help/advanced-upload-styles.png",
        alt: "Upload Images and Styles tab for a product side",
        caption: "Upload product photos so the design screen shows the right picture.",
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
            title: "Left list",
            body: "Custy sets this up for you. You usually do not need to change it.",
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
        "Open the **Print Area** tab. You will see a dashed box on the photo. That box is the printable window. Choose **INCH** or **CM**. Fill in **Actual Width** and **Height** so the file matches real print size. Drag the box (or adjust Left and Top) until it sits on the printable part of the garment. Click **Update** when it looks right.",
      ],
      actions: [
        "Choose **INCH** or **CM**. Use the same units you use when you measure for print.",
        "Set **Actual Width** and **Height** to the real printable size.",
        "Drag the dashed box (or use Left and Top) until it sits on the printable area of the photo.",
        "Click **Update**. Repeat for every side that accepts artwork.",
      ],
      figure: {
        src: "/images/help/advanced-print-area.png",
        alt: "Print Area tab with dashed box on the product photo",
        caption: "Line up the dashed **print area** with the real printable spot, then click **Update**.",
        width: 1718,
        height: 916,
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
            body: "Real print size for the output file. Left and Top help fine-tune placement.",
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
      note: {
        title: "Why this matters",
        body: "Shoppers can only place designs inside the **print area** you set. Match it to how you really print so artwork does not shift or get cut off.",
      },
    },
    {
      id: "mark-areas",
      title: "Add Mark Areas (optional)",
      paragraphs: [
        "Mark areas are extra shapes inside the **print area**. Use them as placement guides (for example “put the logo here”). Printing still follows the Print Area, not the **mark areas** alone. You can skip this step if you do not need guides.",
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
        caption: "Optional **mark areas** help show where to place artwork.",
        width: 1718,
        height: 916,
        markers: [
          {
            n: 1,
            title: "Mark Areas tab",
            body: "Optional guide shapes inside the **print area**.",
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
