import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductCatalog } from '../useProductCatalog';

describe('useProductCatalog', () => {
  it('initializes with default products and categories', () => {
    const { result } = renderHook(() => useProductCatalog());
    expect(result.current.selectedCategory).toBe('All');
    expect(result.current.categories).toContain('Electronics');
    expect(result.current.products.length).toBeGreaterThan(0);
  });

  it('filters products by category correctly', () => {
    const { result } = renderHook(() => useProductCatalog());
    act(() => {
      result.current.setSelectedCategory('Electronics');
    });
    expect(result.current.products.every((p) => p.category === 'Electronics')).toBe(true);
  });

  it('sorts products by price low to high', () => {
    const { result } = renderHook(() => useProductCatalog());
    act(() => {
      result.current.setSortOption('price-low');
    });
    const prices = result.current.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  it('resets all filters back to default state', () => {
    const { result } = renderHook(() => useProductCatalog());
    act(() => {
      result.current.setSelectedCategory('Electronics');
      result.current.setSearchQuery('Headphones');
      result.current.resetFilters();
    });
    expect(result.current.selectedCategory).toBe('All');
    expect(result.current.searchQuery).toBe('');
  });
});
