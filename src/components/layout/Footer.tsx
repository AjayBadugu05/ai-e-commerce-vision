import { Link } from "react-router-dom";
import { Zap, Mail, MapPin, Phone, Heart, Github, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-magic to-secondary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white">
                  ShopZap
                </span>
                <p className="text-xs text-background/60">by AjayBadugu</p>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Your favorite shopping destination with amazing products and super fast delivery! 
              Shop smart, shop happy! ⚡
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Github className="w-4 h-4" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink to="/shop">All Products</FooterLink>
              <FooterLink to="/categories">Categories</FooterLink>
              <FooterLink to="/deals">Hot Deals 🔥</FooterLink>
              <FooterLink to="/new">New Arrivals ✨</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">Help & Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/shipping">Shipping Info</FooterLink>
              <FooterLink to="/returns">Easy Returns</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                hello@shopzap.com
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <div className="w-8 h-8 rounded-xl bg-magic/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-magic" />
                </div>
                Hyderabad, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> by AjayBadugu © 2026
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-background/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-background/60 text-sm hover:text-white transition-colors">
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
      className="text-background/70 text-sm hover:text-white transition-colors hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all"
  >
    {icon}
  </a>
);
