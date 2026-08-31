import { useState, useEffect } from "react";
import { Search, Sparkles, X, ArrowRight, Tag } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightSearch = ({ isOpen, onClose }: SpotlightSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4));
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSelectProduct = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-slide-up">
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />

      <div className="w-full max-w-2xl bg-card/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-border/60 gap-3">
          <Search className="w-5 h-5 text-primary animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, or ask AI (Cmd+K)..."
            className="flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono bg-muted rounded-lg border border-border/80 text-muted-foreground">
            ESC
          </span>
        </div>

        {/* Categories Quick Bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border/40 overflow-x-auto text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1 text-primary font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Quick Filter:
          </span>
          {["Electronics", "Accessories", "Footwear", "Eyewear", "Bags"].map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery(cat)}
              className="px-3 py-1 rounded-full bg-muted/60 hover:bg-primary/20 hover:text-primary transition-all whitespace-nowrap"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No items matching "{query}"</p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-muted/80 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-border/40 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{product.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-foreground">{formatPrice(product.price)}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-muted/40 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-primary" /> Instant AI Indexing Enabled
          </span>
          <span>{results.length} items available</span>
        </div>
      </div>
    </div>
  );
};
