import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const recentOrders = [
  {
    id: "ORD-2024001",
    date: "Jan 1, 2026",
    status: "Delivered",
    total: 24999,
    items: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-2024002",
    date: "Dec 28, 2025",
    status: "In Transit",
    total: 15699,
    items: 1,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-2024003",
    date: "Dec 20, 2025",
    status: "Delivered",
    total: 37999,
    items: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
];

const wishlistItems = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    price: 14999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Designer Sneakers",
    price: 23999,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
  },
];

const menuItems = [
  { icon: Package, label: "My Orders", count: 12 },
  { icon: Heart, label: "Wishlist", count: 5 },
  { icon: MapPin, label: "Addresses", count: 2 },
  { icon: CreditCard, label: "Payment Methods", count: 3 },
  { icon: Bell, label: "Notifications", badge: true },
  { icon: Settings, label: "Settings" },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-success/20 text-success";
      case "In Transit":
        return "bg-primary/20 text-primary";
      case "Processing":
        return "bg-accent/20 text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="fun-card p-8 mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-magic to-secondary p-1 animate-pulse-glow">
                  <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-success flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="font-display text-3xl font-bold mb-1">Welcome, Shopper! 👋</h1>
                <p className="text-muted-foreground mb-3">shopper@example.com</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 rounded-xl bg-accent/20 text-sm font-semibold">
                    🏆 Gold Member
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-muted text-sm font-semibold">
                    📦 12 Orders
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-muted text-sm font-semibold">
                    💖 5 Wishlist
                  </span>
                </div>
              </div>

              <Button variant="outline" className="gap-2 rounded-xl border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="fun-card p-4">
                <h3 className="font-display font-semibold mb-4 px-2">Menu</h3>
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.count !== undefined && (
                          <span className="text-xs text-muted-foreground">{item.count}</span>
                        )}
                        {item.badge && (
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Promo Card */}
              <div className="fun-card p-6 bg-gradient-to-br from-magic/20 to-primary/20 border-magic/30">
                <Gift className="w-10 h-10 text-magic mb-3 animate-bounce-slow" />
                <h4 className="font-display font-bold mb-2">Refer & Earn! 🎁</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Invite friends and get ₹500 off on your next order!
                </p>
                <Button className="w-full btn-bouncy">Share Now</Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="fun-card p-6 text-center hover-lift">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-display text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
                <div className="fun-card p-6 text-center hover-lift">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="font-display text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                </div>
                <div className="fun-card p-6 text-center hover-lift">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <p className="font-display text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Wishlist</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent animate-wiggle" />
                    <h3 className="font-display text-xl font-bold">Recent Orders</h3>
                  </div>
                  <Button variant="ghost" className="text-primary gap-1 rounded-xl">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order, idx) => (
                    <div
                      key={order.id}
                      className="fun-card p-4 flex items-center gap-4 hover-lift"
                      style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                    >
                      <img
                        src={order.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold">{order.id}</p>
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.items} item{order.items > 1 ? "s" : ""}
                        </p>
                      </div>
                      <p className="font-display font-bold text-lg">{formatPrice(order.total)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wishlist Preview */}
              <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary animate-bounce-slow" />
                    <h3 className="font-display text-xl font-bold">Wishlist</h3>
                  </div>
                  <Button variant="ghost" className="text-primary gap-1 rounded-xl">
                    View All <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="fun-card p-4 flex items-center gap-4 hover-lift">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                        <p className="font-display font-bold text-primary mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <Button size="sm" className="rounded-xl">
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Profile;
