import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { PRODUCTS } from '../../data/products';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext Critical Path & Edge Cases', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.rawSubtotal).toBe(0);
  });

  it('adds an item to cart and calculates subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const sampleProduct = PRODUCTS[0];

    act(() => {
      result.current.addItem(sampleProduct, 2);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.cartCount).toBe(2);
    expect(result.current.rawSubtotal).toBe(sampleProduct.price * 2);
  });

  it('accumulates quantity when adding the same item with same options', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const sampleProduct = PRODUCTS[0];

    act(() => {
      result.current.addItem(sampleProduct, 1);
      result.current.addItem(sampleProduct, 3);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.cartCount).toBe(4);
  });

  it('removes item when updateQuantity is called with zero or negative value', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const sampleProduct = PRODUCTS[0];

    act(() => {
      result.current.addItem(sampleProduct, 2);
    });
    expect(result.current.items.length).toBe(1);

    act(() => {
      result.current.updateQuantity(sampleProduct.id, 0);
    });
    expect(result.current.items.length).toBe(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('clears all items when clearCart is called', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(PRODUCTS[0], 1);
      result.current.addItem(PRODUCTS[1], 2);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.rawSubtotal).toBe(0);
  });
});
