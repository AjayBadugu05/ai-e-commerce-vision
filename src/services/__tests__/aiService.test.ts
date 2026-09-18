import { describe, it, expect } from 'vitest';
import { AIService } from '../aiService';
import { PRODUCTS } from '../../data/products';

describe('AIService', () => {
  it('returns matching headphone products for audio query', async () => {
    const res = await AIService.getConciergeResponse('looking for premium headphones', []);
    expect(res.sender).toBe('ai');
    expect(res.text).toContain('AETHER Studio Pro ANC Headphones');
    expect(res.recommendedProducts).toBeDefined();
    expect(res.recommendedProducts?.some((p) => p.category === 'Electronics')).toBe(true);
  });

  it('provides coupon code details when asked about deals', async () => {
    const res = await AIService.getConciergeResponse('do you have any coupon discount deals?', []);
    expect(res.text).toContain('AETHER20');
  });

  it('performs visual image search matching keywords', () => {
    const results = AIService.searchByImage('black headphone audio');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('aether-headphones-pro');
  });

  it('boosts match score for previously viewed categories', () => {
    const product = PRODUCTS[0];
    const boostedScore = AIService.calculatePersonalizedMatch(product, [product.category]);
    expect(boostedScore).toBeGreaterThanOrEqual(product.aiMatchScore);
  });
});
