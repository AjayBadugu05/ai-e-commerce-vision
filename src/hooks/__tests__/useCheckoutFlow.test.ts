import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCheckoutFlow } from '../useCheckoutFlow';

describe('useCheckoutFlow', () => {
  it('applies valid discount coupon code correctly', () => {
    const { result } = renderHook(() => useCheckoutFlow());
    let success = false;
    act(() => {
      success = result.current.applyCoupon('AETHER20');
    });
    expect(success).toBe(true);
    expect(result.current.appliedCoupon?.code).toBe('AETHER20');
    expect(result.current.calculateDiscount(10000)).toBe(2000);
  });

  it('rejects invalid coupon codes gracefully', () => {
    const { result } = renderHook(() => useCheckoutFlow());
    let success = true;
    act(() => {
      success = result.current.applyCoupon('INVALID123');
    });
    expect(success).toBe(false);
    expect(result.current.couponError).toContain('Invalid coupon code');
  });

  it('calculates shipping cost and submits order successfully', async () => {
    const { result } = renderHook(() => useCheckoutFlow());
    expect(result.current.calculateShippingCost()).toBe(499);

    let order;
    await act(async () => {
      order = await result.current.submitOrder(50000);
    });

    expect(order).toBeDefined();
    expect(order?.orderId).toMatch(/^AETH-\d+$/);
    expect(result.current.step).toBe(4);
  });
});
