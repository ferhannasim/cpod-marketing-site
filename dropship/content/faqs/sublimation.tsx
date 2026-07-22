import type { FaqItem } from "./types";

export const sublimationFaq: FaqItem[] = [
  {
    question: "DTF (Direct to Film) vs. Sublimation Printing",
    answer: (
      <>
        <p>
          You&rsquo;re exactly right in your summary — sublimation bonds ink with polyester fibers in gas form,
          while DTF transfers designs onto a film and can be applied to many materials. Here&rsquo;s a detailed
          comparison:
        </p>
      </>
    ),
  },
  {
    question: "1. Printing Process",
    answer: (
      <>
        <p>
          <strong>DTF (Direct to Film):</strong>
        </p>
        <ul>
          <li>Designs are printed onto a special film using pigment-based ink.</li>
          <li>A powder adhesive is applied to the printed film.</li>
          <li>The film is then heat-pressed onto the garment.</li>
          <li>The design is transferred and sits on top of the material.</li>
        </ul>
        <p>
          <strong>Sublimation:</strong>
        </p>
        <ul>
          <li>Designs are printed onto sublimation paper using sublimation ink.</li>
          <li>When heat is applied, the ink turns into gas and bonds with the polyester fibers.</li>
          <li>The ink becomes part of the fabric, not a layer on top.</li>
        </ul>
      </>
    ),
  },
  {
    question: "2. Materials/Substrates Supported",
    answer: (
      <>
        <p>
          <strong>DTF:</strong>
        </p>
        <ul>
          <li>Compatible with cotton, polyester, blends, leather, and some non-textile surfaces (with proper coatings).</li>
          <li>Can be used on both light and dark-colored garments.</li>
        </ul>
        <p>
          <strong>Sublimation:</strong>
        </p>
        <ul>
          <li>Requires polyester or poly-coated surfaces.</li>
          <li>Best results on white or light-colored fabrics.</li>
          <li>Works on rigid items like mugs and plaques only if they&rsquo;re coated for sublimation.</li>
        </ul>
      </>
    ),
  },
  {
    question: "3. Feel & Durability",
    answer: (
      <>
        <p>
          <strong>DTF:</strong>
        </p>
        <ul>
          <li>Produces a slightly raised, rubbery texture.</li>
          <li>Generally durable, but designs may crack or peel over time with heavy washing if not applied properly.</li>
        </ul>
        <p>
          <strong>Sublimation:</strong>
        </p>
        <ul>
          <li>Leaves no texture; ink is fused into the material.</li>
          <li>Extremely durable — designs won&rsquo;t crack, peel, or fade, since there&rsquo;s no surface layer.</li>
        </ul>
      </>
    ),
  },
  {
    question: "4. Color Vibrancy & Detail",
    answer: (
      <>
        <p>
          <strong>DTF:</strong>
        </p>
        <ul>
          <li>Offers vivid, bold colors, even on dark fabrics, thanks to white ink underbase.</li>
          <li>Great for detailed, colorful, or complex designs.</li>
        </ul>
        <p>
          <strong>Sublimation:</strong>
        </p>
        <ul>
          <li>Produces clean, sharp prints but is not as vibrant as DTF or screen printing, especially on light fabrics.</li>
          <li>
            However, for budget-conscious creators, sublimation is still a great option — particularly if working
            with white/light polyester garments where high saturation isn&rsquo;t critical.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "5. Equipment Cost & Ease of Use",
    answer: (
      <>
        <p>
          <strong>DTF:</strong>
        </p>
        <ul>
          <li>Requires a DTF printer, adhesive powder, film, and a heat press.</li>
          <li>Can be more complex to maintain (especially with white ink).</li>
        </ul>
        <p>
          <strong>Sublimation:</strong>
        </p>
        <ul>
          <li>Needs a sublimation printer, sublimation paper, and a heat press.</li>
          <li>Easier setup and maintenance; ideal for hobbyists, crafters, or small business startups.</li>
        </ul>
      </>
    ),
  },
  {
    question: "Side-by-Side Summary Table",
    answer: (
      <>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>DTF Printing</th>
              <th>Sublimation Printing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Substrates</strong>
              </td>
              <td>Cotton, polyester, blends, hard surfaces</td>
              <td>Polyester or poly-coated items only</td>
            </tr>
            <tr>
              <td>
                <strong>Feel</strong>
              </td>
              <td>Slightly raised, rubbery feel</td>
              <td>Seamless, soft feel (ink embedded in fibers)</td>
            </tr>
            <tr>
              <td>
                <strong>Color Compatibility</strong>
              </td>
              <td>Works on both light and dark fabrics</td>
              <td>Only on light-colored fabrics</td>
            </tr>
            <tr>
              <td>
                <strong>Color Vibrancy</strong>
              </td>
              <td>Very vibrant, especially with white ink</td>
              <td>
                <strong>Less vibrant than DTF</strong>, but good for budget-friendly projects on light polyester
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
];
