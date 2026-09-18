import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-4 pb-2 transition-all duration-300">
        <div 
          className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${
            scrolled ? "neu-flat-lg py-1 px-4 sm:px-6" : "neu-flat py-2 px-4 sm:px-6"
          }`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Tactile Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl neu-flat flex items-center justify-center text-primary group-hover:scale-105 active:shadow-neu-pressed transition-all duration-300 relative overflow-hidden">
                <span className="font-display font-black text-xl text-gradient-hero select-none">Æ</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  AETHERIA
                </span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-extrabold -mt-1">
                  Tactile Visual Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links Container */}
            <div className="hidden md:flex items-center gap-2 p-1.5 neu-pressed rounded-2xl">
              <NavLink to="/" active={isActive("/")}>Home</NavLink>
              <NavLink to="/shop" active={isActive("/shop")}>Catalog</NavLink>
              <NavLink to="/categories" active={isActive("/categories")}>Collections</NavLink>
              <NavLink to="/deals" active={isActive("/deals")}>Offers</NavLink>
            </div>

            {/* Actions & Utilities */}
            <div className="flex items-center gap-2.5">
              {/* Spotlight Recessed Search Button */}
              <button
                onClick={() => setIsSpotlightOpen(true)}
                className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl neu-pressed text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                title="Search Catalog (⌘K)"
              >
                <Search className="w-4 h-4 text-primary" />
                <span>Search collection...</span>
                <kbd className="px-2 py-0.5 text-[10px] font-mono neu-flat rounded-md text-foreground">⌘K</kbd>
              </button>

              {/* Visual AI Search Trigger */}
              <button
                onClick={() => setIsVisualSearchOpen(true)}
                className="p-3 rounded-2xl neu-btn text-primary hover:text-primary transition-all"
                title="AI Visual Lens Search"
              >
                <Camera className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist Link */}
              <Link to="/profile">
                <button className="relative p-3 rounded-2xl neu-btn text-foreground hover:text-rose-500 transition-all">
                  <Heart className="w-4.5 h-4.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full text-[10px] flex items-center justify-center text-white font-extrabold shadow-md">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative neu-btn-primary px-4 py-2.5 flex items-center gap-2"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-white" />
                <span className="hidden sm:inline-block text-xs font-bold text-white">Bag</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-white text-primary rounded-full text-[11px] flex items-center justify-center font-black shadow-inner">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Tactile Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-2xl neu-btn text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Neumorphic Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden max-w-7xl mx-auto mt-2 neu-flat-lg rounded-3xl p-4 space-y-2 animate-slide-up">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)} active={isActive("/")}>Home</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsMenuOpen(false)} active={isActive("/shop")}>Catalog</MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMenuOpen(false)} active={isActive("/categories")}>Collections</MobileNavLink>
            <MobileNavLink to="/deals" onClick={() => setIsMenuOpen(false)} active={isActive("/deals")}>Flash Deals</MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)} active={isActive("/profile")}>Dashboard & Wishlist</MobileNavLink>
          </div>
        )}
      </header>

      {/* Global Search Overlays */}
      <SpotlightSearch isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
      active 
        ? "neu-pressed text-primary font-black" 
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, active }: { to: string; children: React.ReactNode; onClick: () => void; active: boolean }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
      active 
        ? "neu-pressed text-primary" 
        : "neu-flat hover:text-primary text-foreground"
    }`}
  >
    {children}
  </Link>
);
