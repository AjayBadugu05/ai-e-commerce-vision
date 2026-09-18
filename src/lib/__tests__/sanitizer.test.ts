import { describe, it, expect } from 'vitest';
import {
  sanitizeHtml,
  stripTags,
  sanitizeSearchQuery,
  isSafeUrl,
  sanitizeEmail,
  isValidEmail,
} from '../sanitizer';

describe('Sanitizer Utilities', () => {
  describe('sanitizeHtml', () => {
    it('escapes HTML special characters', () => {
      const input = '<script>alert("xss")</script>';
      const sanitized = sanitizeHtml(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('returns empty string for empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });
  });

  describe('stripTags', () => {
    it('removes all HTML tags from string', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      expect(stripTags(input)).toBe('Hello World');
    });
  });

  describe('sanitizeSearchQuery', () => {
    it('strips HTML tags and unsafe characters', () => {
      const input = "  <script>headphones</script> ' OR 1=1  ";
      const sanitized = sanitizeSearchQuery(input);
      expect(sanitized).toBe('headphones  OR 1=1');
    });
  });

  describe('isSafeUrl', () => {
    it('validates safe http and https URLs', () => {
      expect(isSafeUrl('https://example.com/image.png')).toBe(true);
      expect(isSafeUrl('http://localhost:8080')).toBe(true);
    });

    it('rejects javascript: and data: URIs', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false);
      expect(isSafeUrl('DATA:text/html;base64,123')).toBe(false);
    });
  });

  describe('isValidEmail & sanitizeEmail', () => {
    it('validates standard email addresses', () => {
      expect(isValidEmail('user@aether.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });

    it('sanitizes email strings', () => {
      expect(sanitizeEmail('  User@Aether.COM  ')).toBe('user@aether.com');
    });
  });
});
