import { Link } from "react-router-dom";
import { Sparkles, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="glass border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold text-gradient-gold">
                LUXE
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover premium products curated for the discerning shopper. 
              Experience luxury redefined with AI-powered recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink to="/shop">Shop All</FooterLink>
              <FooterLink to="/categories">Categories</FooterLink>
              <FooterLink to="/deals">Hot Deals</FooterLink>
              <FooterLink to="/new-arrivals">New Arrivals</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/shipping">Shipping Info</FooterLink>
              <FooterLink to="/returns">Returns</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                support@luxe.shop
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 LUXE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  </li>
);
