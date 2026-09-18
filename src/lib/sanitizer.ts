/**
 * Security input sanitizer & validation module.
 * Sanitizes strings, URLs, search queries, and validates user input formats.
 */

/**
 * Escapes HTML characters to prevent XSS attacks when rendering raw input.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips HTML tags and potential script injections completely.
 */
export function stripTags(input: string): string {
  if (!input) return '';
  return input.replace(/<[^>]*>?/gm, '');
}

/**
 * Sanitizes search queries by trimming extra whitespace and stripping potential code injection chars.
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  return stripTags(query)
    .trim()
    .replace(/[\0\x08\x09\x1a\n\r"'\\%]/g, '');
}

/**
 * Validates whether a given URL is safe (http/https protocol only, no javascript: or data: URIs).
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return false;
  }
  return true;
}

/**
 * Sanitizes input email address for basic security hygiene.
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Simple standard email format validator.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
