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

      <div className="w-full max-w-2xl neu-flat-lg rounded-4xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-border/40 gap-3">
          <Search className="w-5 h-5 text-primary animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog or zero-cost AI index (⌘K)..."
            className="flex-1 bg-transparent text-base font-bold text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="w-7 h-7 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block neu-badge text-muted-foreground font-mono text-[10px]">
            ESC
          </span>
        </div>

        {/* Categories Quick Bar */}
        <div className="flex items-center gap-2 px-6 py-3 neu-pressed border-b border-border/40 overflow-x-auto text-xs font-bold text-muted-foreground">
          <span className="flex items-center gap-1 text-primary font-black whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5" /> Quick Filter:
          </span>
          {["Electronics", "Accessories", "Footwear", "Eyewear", "Bags"].map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery(cat)}
              className="neu-badge px-3 py-1 text-[11px] font-extrabold text-foreground hover:text-primary transition-all whitespace-nowrap cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-xs font-bold">No items matching "{query}"</p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="group flex items-center justify-between p-3.5 rounded-3xl neu-flat hover:shadow-neu-flat-lg cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl neu-image-frame overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <span className="neu-badge text-[9px] text-primary font-black">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 font-medium">{product.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-sm text-foreground">{formatPrice(product.price)}</span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 neu-flat border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-bold">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-primary" /> Zero-Cost Instant Local Indexing
          </span>
          <span>{results.length} items available</span>
        </div>
      </div>
    </div>
  );
};
