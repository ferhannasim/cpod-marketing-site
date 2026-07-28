// Shipping is quoted in CAD. App and service charges are USD — see
// docs/superpowers/specs/2026-07-28-currency-custy-links-video-library-design.md.
// The constant is deliberately not named CURRENCY so app pricing cannot be
// rendered through money() by mistake.
export const SHIPPING_CURRENCY = "CAD";

export const FREE_SHIPPING_THRESHOLD = 199;
export const SECURE_SHIPPING_FEE = 5.99;

export type ShippingRate = { provinces: string[]; amount: number };

export const shippingRates: ShippingRate[] = [
  { provinces: ["ON", "QC", "NB", "NS", "NL", "PE"], amount: 14.99 },
  { provinces: ["AB", "SK", "MB"], amount: 19.99 },
  { provinces: ["BC"], amount: 24.99 },
];

/** Every distinct published amount. Used by the MDX prose guard. */
export const allShippingAmounts: number[] = [
  FREE_SHIPPING_THRESHOLD,
  SECURE_SHIPPING_FEE,
  ...shippingRates.map((rate) => rate.amount),
];

/** "$199 CAD" for whole amounts, "$14.99 CAD" for fractional ones. */
export function money(amount: number): string {
  return `$${amount.toFixed(Number.isInteger(amount) ? 0 : 2)} ${SHIPPING_CURRENCY}`;
}
