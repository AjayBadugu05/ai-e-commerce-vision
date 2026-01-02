import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-gradient-gold">
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/deals">Deals</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-secondary"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* User */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-secondary"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-secondary relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground font-semibold">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</MobileNavLink>
            <MobileNavLink to="/deals" onClick={() => setIsMenuOpen(false)}>Deals</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-3 rounded-xl hover:bg-secondary transition-colors font-medium"
  >
    {children}
  </Link>
);
