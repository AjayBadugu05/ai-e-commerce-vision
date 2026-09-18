import { useState } from 'react';
import { sanitizeHtml } from '../lib/sanitizer';

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'upi' | 'netbanking' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  upiId?: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  freeShipping?: boolean;
}

const VALID_COUPONS: Record<string, Coupon> = {
  AETHER20: { code: 'AETHER20', discountPercentage: 20 },
  NEU10: { code: 'NEU10', discountPercentage: 10 },
  FREESHIP: { code: 'FREESHIP', discountPercentage: 0, freeShipping: true },
};

export function useCheckoutFlow() {
  const [step, setStep] = useState<number>(1);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'card',
  });
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    date: string;
    totalAmount: number;
  } | null>(null);

  const applyCoupon = (code: string) => {
    const cleanCode = sanitizeHtml(code.trim().toUpperCase());
    if (!cleanCode) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    if (VALID_COUPONS[cleanCode]) {
      setAppliedCoupon(VALID_COUPONS[cleanCode]);
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try AETHER20 or FREESHIP');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!appliedCoupon) return 0;
    return Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
  };

  const calculateShippingCost = (): number => {
    if (appliedCoupon?.freeShipping) return 0;
    return shippingMethod === 'express' ? 499 : 0;
  };

  const submitOrder = async (cartSubtotal: number) => {
    setIsProcessing(true);
    // Simulate high-performance zero-cost local backend order creation
    await new Promise((res) => setTimeout(res, 1200));

    const discount = calculateDiscount(cartSubtotal);
    const shipping = calculateShippingCost();
    const finalTotal = cartSubtotal - discount + shipping;

    const orderId = `AETH-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      totalAmount: finalTotal,
    };

    setCompletedOrder(orderData);
    setIsProcessing(false);
    setStep(4);
    return orderData;
  };

  const resetCheckout = () => {
    setStep(1);
    setShippingDetails({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'India',
    });
    setPaymentDetails({ method: 'card' });
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    setCompletedOrder(null);
    setIsProcessing(false);
  };

  return {
    step,
    setStep,
    shippingDetails,
    setShippingDetails,
    paymentDetails,
    setPaymentDetails,
    shippingMethod,
    setShippingMethod,
    appliedCoupon,
    couponInput,
    setCouponInput,
    couponError,
    applyCoupon,
    removeCoupon,
    calculateDiscount,
    calculateShippingCost,
    isProcessing,
    completedOrder,
    submitOrder,
    resetCheckout,
  };
}
