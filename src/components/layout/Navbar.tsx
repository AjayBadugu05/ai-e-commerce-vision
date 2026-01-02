import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-magic to-secondary flex items-center justify-center shadow-pop animate-pulse-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold text-gradient-hero">
                ShopZap
              </span>
              <p className="text-[10px] text-muted-foreground -mt-1">by AjayBadugu</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" active={isActive("/")}>Home</NavLink>
            <NavLink to="/shop" active={isActive("/shop")}>Shop</NavLink>
            <NavLink to="/categories" active={isActive("/categories")}>Categories</NavLink>
            <NavLink to="/deals" active={isActive("/deals")}>Deals</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-2xl hover:bg-primary/10 hover:text-primary transition-all hover-pop"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl hover:bg-magic/10 hover:text-magic transition-all hover-pop"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-2xl hover:bg-secondary/10 hover:text-secondary transition-all hover-pop relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full text-xs flex items-center justify-center text-white font-bold animate-pop-in">
                  {cartCount}
                </span>
              )}
            </Button>

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

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for awesome products..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-muted border-2 border-transparent focus:border-primary focus:outline-none transition-all text-lg"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t-2 border-border animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)} active={isActive("/")}>Home</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsMenuOpen(false)} active={isActive("/shop")}>Shop</MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMenuOpen(false)} active={isActive("/categories")}>Categories</MobileNavLink>
            <MobileNavLink to="/deals" onClick={() => setIsMenuOpen(false)} active={isActive("/deals")}>Deals</MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)} active={isActive("/profile")}>Profile</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
      active 
        ? "bg-primary text-primary-foreground shadow-pop" 
        : "hover:bg-primary/10 hover:text-primary"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, active }: { to: string; children: React.ReactNode; onClick: () => void; active: boolean }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-4 py-3 rounded-2xl font-semibold transition-all ${
      active 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-primary/10"
    }`}
  >
    {children}
  </Link>
);
