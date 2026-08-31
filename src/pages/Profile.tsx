import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useUser, Order } from "@/contexts/UserContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { OrderTrackerModal } from "@/components/orders/OrderTrackerModal";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Sparkles,
  ShoppingBag,
  Gift,
  Truck,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

const Profile = () => {
  const { user, orders, setActiveOrderTracker, activeOrderTracker, recentlyViewed } = useUser();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedTab, setSelectedTab] = useState<"orders" | "wishlist" | "addresses" | "settings">("orders");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header Dashboard Banner */}
          <div className="glass-panel p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-primary shadow-lg"
                />
                <div className="text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="font-display text-2xl md:text-3xl font-bold">{user.name}</h1>
                    <span className="px-3 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 justify-center md:justify-start">
                    <ShieldCheck className="w-3.5 h-3.5" /> Biometric AI Security Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="btn-apple-secondary text-xs">Edit Profile</button>
                <button className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold transition-all">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-4 glass-panel p-4 space-y-2">
              <button
                onClick={() => setSelectedTab("orders")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold transition-all ${
                  selectedTab === "orders" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Package className="w-4 h-4" /> Order History & Tracking
                </span>
                <span className="px-2 py-0.5 rounded-full bg-card text-foreground font-bold">{orders.length}</span>
              </button>

              <button
                onClick={() => setSelectedTab("wishlist")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold transition-all ${
                  selectedTab === "wishlist" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-4 h-4" /> Saved Wishlist
                </span>
                <span className="px-2 py-0.5 rounded-full bg-card text-foreground font-bold">{wishlist.length}</span>
              </button>

              <button
                onClick={() => setSelectedTab("addresses")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-semibold transition-all ${
                  selectedTab === "addresses" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" /> Saved Addresses
                </span>
                <span className="text-[10px]">2 Saved</span>
              </button>

              {/* VIP Promo Referral Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-primary/10 via-magic/10 to-accent/10 border border-primary/20 space-y-2 pt-6">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Gift className="w-4 h-4" /> AETHER VIP Referral
                </div>
                <p className="text-xs text-muted-foreground">Share code <strong className="text-foreground font-mono">AETHER20</strong> for 20% off luxury orders.</p>
              </div>
            </div>

            {/* Main Tab Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* ORDERS TAB */}
              {selectedTab === "orders" && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold">Active Orders & History</h3>

                  {orders.length === 0 ? (
                    <div className="glass-card p-12 text-center text-muted-foreground">
                      <p className="text-sm">No orders placed yet.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="glass-card p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-3 gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-foreground">{order.id}</span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-primary/20 text-primary font-bold">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">Placed on {order.date}</p>
                          </div>

                          <button
                            onClick={() => setActiveOrderTracker(order)}
                            className="btn-apple-glass text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
                          >
                            <Truck className="w-4 h-4 text-primary" /> Track Live Air Progress
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Waybill Air Number:</span>
                            <span className="font-mono">{order.trackingNumber}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Paid Total:</span>
                            <span className="font-bold text-foreground">{formatPrice(order.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* WISHLIST TAB */}
              {selectedTab === "wishlist" && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold">Saved Wishlist Items ({wishlist.length})</h3>

                  {wishlist.length === 0 ? (
                    <div className="glass-card p-12 text-center text-muted-foreground space-y-3">
                      <Heart className="w-10 h-10 mx-auto text-muted-foreground/50" />
                      <p className="text-sm">Your wishlist is currently empty.</p>
                      <Link to="/shop" className="inline-block btn-apple text-xs">
                        Browse Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="glass-card-hover p-4 flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="font-semibold text-xs truncate">{item.name}</h4>
                              <p className="font-bold text-sm text-primary mt-1">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => addItem(item)} className="btn-apple text-[11px] py-1.5 px-3 flex-1">
                                Add Bag
                              </button>
                              <button onClick={() => toggleWishlist(item)} className="p-2 rounded-xl bg-muted text-rose-500">
                                <Heart className="w-4 h-4 fill-rose-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ADDRESSES TAB */}
              {selectedTab === "addresses" && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold">Shipping Destination Addresses</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass-card p-5 space-y-2 border-primary/40">
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">Default Primary</span>
                      <h4 className="font-bold text-sm">Penthouse Residence</h4>
                      <p className="text-xs text-muted-foreground">Penthouse 42, Sky View Towers, Cyber City, Mumbai - 400001</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal order={activeOrderTracker} onClose={() => setActiveOrderTracker(null)} />
    </div>
  );
};

export default Profile;


