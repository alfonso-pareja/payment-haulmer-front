
/**
 * Formats a card number with spaces every 4 digits.
 */
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) ?? [];
  return groups.join(' ').substring(0, 19);
}

/**
 * Detects card brand based on number prefix.
 */
export type CardBrand = 'visa' | 'mastercard' | 'unknown';

export function detectCardBrand(cardNumber: string): CardBrand {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  return 'unknown';
}
