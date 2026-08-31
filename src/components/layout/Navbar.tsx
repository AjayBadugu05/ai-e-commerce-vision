import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Sparkles, Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { SpotlightSearch } from "@/components/ui/SpotlightSearch";
import { VisualSearchModal } from "@/components/ai/VisualSearchModal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-magic to-accent flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  AETHER
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold -mt-1">
                  Visionary Commerce
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl">
              <NavLink to="/" active={isActive("/")}>Home</NavLink>
              <NavLink to="/shop" active={isActive("/shop")}>Catalog</NavLink>
              <NavLink to="/categories" active={isActive("/categories")}>Collections</NavLink>
              <NavLink to="/deals" active={isActive("/deals")}>Flash Deals</NavLink>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Spotlight Search Launcher */}
              <button
                onClick={() => setIsSpotlightOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 text-xs font-medium text-muted-foreground transition-all"
              >
                <Search className="w-4 h-4 text-primary" />
                <span>Search</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-card rounded-md border border-border">⌘K</span>
              </button>

              {/* Visual AI Search Launcher */}
              <button
                onClick={() => setIsVisualSearchOpen(true)}
                className="p-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all hover:scale-105"
                title="AI Visual Image Search"
              >
                <Camera className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist Link */}
              <Link to="/profile">
                <button className="relative p-2.5 rounded-2xl bg-card/60 hover:bg-card border border-border/60 text-foreground transition-all hover:scale-105">
                  <Heart className="w-4.5 h-4.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-md">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-md shadow-primary/30 transition-all flex items-center gap-2 px-4"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span className="hidden sm:inline-block text-xs font-bold">Bag</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-white text-primary rounded-full text-[11px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              <ThemeToggle />

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-2xl border-t border-border p-4 space-y-2 animate-slide-up">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)} active={isActive("/")}>Home</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsMenuOpen(false)} active={isActive("/shop")}>Catalog</MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMenuOpen(false)} active={isActive("/categories")}>Collections</MobileNavLink>
            <MobileNavLink to="/deals" onClick={() => setIsMenuOpen(false)} active={isActive("/deals")}>Flash Deals</MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)} active={isActive("/profile")}>Dashboard & Wishlist</MobileNavLink>
          </div>
        )}
      </nav>

      {/* Global Spotlight Search Overlay */}
      <SpotlightSearch isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />

      {/* Global Visual Search Overlay */}
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
      active 
        ? "bg-primary text-primary-foreground shadow-sm" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, active }: { to: string; children: React.ReactNode; onClick: () => void; active: boolean }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
      active 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-muted text-foreground"
    }`}
  >
    {children}
  </Link>
);

