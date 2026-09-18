import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useUser } from "@/contexts/UserContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { OrderTrackerModal } from "@/components/orders/OrderTrackerModal";
import { Link } from "react-router-dom";
import {
  Package,
  Heart,
  MapPin,
  LogOut,
  Gift,
  Truck,
  ShieldCheck,
  Sparkles
} from "lucide-react";

const Profile = () => {
  const { user, orders, setActiveOrderTracker, activeOrderTracker } = useUser();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedTab, setSelectedTab] = useState<"orders" | "wishlist" | "addresses">("orders");

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Header Profile Dashboard Banner */}
          <div className="neu-flat-lg p-8 rounded-4xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-3xl neu-pressed overflow-hidden flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <h1 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">{user.name}</h1>
                    <span className="neu-badge text-primary text-xs font-black">
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{user.email}</p>
                  <p className="text-[11px] text-emerald-500 font-extrabold flex items-center gap-1 justify-center md:justify-start mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Biometric AI Security & Local Storage Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="neu-btn px-5 py-2.5 text-xs font-extrabold text-foreground">Edit Settings</button>
                <button className="w-11 h-11 rounded-2xl neu-btn flex items-center justify-center text-rose-500">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Neumorphic Tabs */}
            <div className="lg:col-span-4 neu-flat p-4 rounded-3xl space-y-2">
              <button
                onClick={() => setSelectedTab("orders")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all ${
                  selectedTab === "orders" ? "neu-pressed text-primary font-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-primary" /> Orders & Tracking
                </span>
                <span className="neu-badge text-foreground font-black">{orders.length}</span>
              </button>

              <button
                onClick={() => setSelectedTab("wishlist")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all ${
                  selectedTab === "wishlist" ? "neu-pressed text-primary font-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-rose-500" /> Saved Wishlist
                </span>
                <span className="neu-badge text-foreground font-black">{wishlist.length}</span>
              </button>

              <button
                onClick={() => setSelectedTab("addresses")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-extrabold transition-all ${
                  selectedTab === "addresses" ? "neu-pressed text-primary font-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" /> Saved Addresses
                </span>
                <span className="neu-badge text-foreground font-black">2</span>
              </button>

              {/* VIP Referral Card */}
              <div className="p-5 rounded-3xl neu-pressed space-y-2 pt-6 mt-4">
                <div className="flex items-center gap-2 text-primary font-extrabold text-xs">
                  <Gift className="w-4 h-4 text-primary" /> AETHERIA VIP Referral
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Use promo code <strong className="text-foreground font-mono font-bold">AETHER20</strong> for 20% privilege savings.
                </p>
              </div>
            </div>

            {/* Main Content View */}
            <div className="lg:col-span-8 space-y-6">
              {/* ORDERS TAB */}
              {selectedTab === "orders" && (
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-extrabold text-foreground">Order History & Air Tracking</h3>

                  {orders.length === 0 ? (
                    <div className="neu-flat p-12 rounded-3xl text-center text-muted-foreground">
                      <p className="text-xs font-extrabold">No active orders placed yet.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="neu-card p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-3 gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-foreground">{order.id}</span>
                              <span className="neu-badge text-primary text-[10px] uppercase font-black">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Placed on {order.date}</p>
                          </div>

                          <button
                            onClick={() => setActiveOrderTracker(order)}
                            className="neu-btn px-4 py-2 text-xs font-extrabold text-primary flex items-center gap-2"
                          >
                            <Truck className="w-4 h-4 text-primary" /> Track Air Dispatch
                          </button>
                        </div>

                        <div className="space-y-2 text-xs font-semibold">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Air Tracking Waybill:</span>
                            <span className="font-mono text-foreground font-bold">{order.trackingNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Paid Total:</span>
                            <span className="font-black text-primary">{formatPrice(order.totalAmount)}</span>
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
                  <h3 className="font-display text-xl font-extrabold text-foreground">Saved Wishlist ({wishlist.length})</h3>

                  {wishlist.length === 0 ? (
                    <div className="neu-flat p-12 rounded-3xl text-center text-muted-foreground space-y-3">
                      <Heart className="w-10 h-10 mx-auto text-muted-foreground/40" />
                      <p className="text-xs font-bold">Your saved collection is currently empty.</p>
                      <Link to="/shop" className="inline-block neu-btn-primary px-5 py-2.5 text-xs font-extrabold">
                        Browse Catalog
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="neu-card p-4 flex gap-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover neu-image-frame" />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="font-extrabold text-xs text-foreground truncate">{item.name}</h4>
                              <p className="font-black text-sm text-primary mt-1">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => addItem(item)} className="neu-btn-primary text-[11px] font-bold py-1.5 px-3 flex-1">
                                Add Bag
                              </button>
                              <button onClick={() => toggleWishlist(item)} className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-rose-500">
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
                  <h3 className="font-display text-xl font-extrabold text-foreground">Shipping Addresses</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="neu-card p-5 space-y-2">
                      <span className="neu-badge text-primary text-[10px] font-black">Primary Address</span>
                      <h4 className="font-extrabold text-sm text-foreground">Penthouse Residence</h4>
                      <p className="text-xs text-muted-foreground font-medium">Penthouse 42, Sky View Towers, Cyber City, Mumbai - 400001</p>
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
