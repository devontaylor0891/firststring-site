export const BETA_FORM_URL = 'https://forms.google.com/placeholder';

/**
 * Published corporate identity.
 *
 * Apple and Google both check the organization's own domain for the legal
 * entity name and address during organization verification, and EU trader
 * status requires published contact details. These values must match the
 * federal corporate registry and the Dun & Bradstreet record EXACTLY —
 * a mismatch is the most common cause of failed store verification.
 *
 */
export const COMPANY = {
  /** Federal corporation's registered name. */
  legalName: '18239398 Canada Inc.',
  /** Saskatchewan operating / trade name shown to customers. */
  operatingName: 'FirstString',
  address: {
    street: '818 Alberni Street',
    city: 'Moosomin',
    region: 'SK',
    postalCode: 'S0G 3N0',
    country: 'Canada',
  },
  email: 'devon@firststringapp.com',
} as const;

/** Single-line address, e.g. '818 Alberni Street, Moosomin, SK S0G 3N0, Canada'. */
export function formatCompanyAddress(): string {
  const { street, city, region, postalCode, country } = COMPANY.address;
  const locality = [region, postalCode].filter(Boolean).join(' ');
  return [street, city, locality, country].filter(Boolean).join(', ');
}
