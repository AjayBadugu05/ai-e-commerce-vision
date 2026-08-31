import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface Order {
  id: string;
  date: string;
  items: { product: Product; quantity: number; selectedColor?: string; selectedSize?: string }[];
  totalAmount: number;
  status: "Placed" | "Processing" | "Shipped" | "Out for Delivery" | "Delivered";
  trackingNumber: string;
  estimatedDelivery: string;
  shippingAddress: string;
  paymentMethod: string;
}

interface UserContextType {
  user: {
    name: string;
    email: string;
    tier: string;
    avatar: string;
  };
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => Order;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  activeOrderTracker: Order | null;
  setActiveOrderTracker: (order: Order | null) => void;
  promoDiscount: number;
  applyPromoCode: (code: string) => boolean;
  activeCoupon: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState({
    name: "Alex Vance",
    email: "alex.vance@aether.luxury",
    tier: "AETHER Obsidian VIP",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("aether_orders");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: "AETH-904281",
        date: "2026-08-29",
        items: [],
        totalAmount: 34999,
        status: "Out for Delivery",
        trackingNumber: "ATH-IND-88204-X",
        estimatedDelivery: "Today by 6:00 PM",
        shippingAddress: "Penthouse 42, Sky View Towers, Cyber City, IN",
        paymentMethod: "Apple Pay (•••• 9012)"
      }
    ];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("aether_recent");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrderTracker, setActiveOrderTracker] = useState<Order | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("aether_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("aether_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addOrder = (newOrderData: Omit<Order, "id" | "date">): Order => {
    const createdOrder: Order = {
      ...newOrderData,
      id: `AETH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split("T")[0],
    };
    setOrders((prev) => [createdOrder, ...prev]);
    return createdOrder;
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "AETHER20") {
      setPromoDiscount(0.20);
      setActiveCoupon("AETHER20 (20% OFF)");
      return true;
    } else if (clean === "WELCOME10") {
      setPromoDiscount(0.10);
      setActiveCoupon("WELCOME10 (10% OFF)");
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        orders,
        addOrder,
        recentlyViewed,
        addRecentlyViewed,
        activeOrderTracker,
        setActiveOrderTracker,
        promoDiscount,
        applyPromoCode,
        activeCoupon
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
