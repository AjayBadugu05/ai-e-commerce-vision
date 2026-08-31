import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
  CheckCircle2,
  XCircle,
  Check,
  MessageSquare
} from "lucide-react";

export const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addRecentlyViewed } = useUser();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const isLiked = isInWishlist(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "fit">("specs");

  // Review Form State
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [userReviews, setUserReviews] = useState([
    { id: 1, name: "Julian Vance", rating: 5, date: "Yesterday", text: "The engineering precision on this piece is breathtaking. The Grade 5 titanium feel is second to none." },
    { id: 2, name: "Siddharth R.", rating: 5, date: "3 days ago", text: "AETHER delivered this via air express in under 36 hours. The spatial acoustic clarity is uncompromised." }
  ]);

  useEffect(() => {
    addRecentlyViewed(product);
  }, [product.id]);

  const images = product.images.length > 0 ? product.images : [product.image];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    toast.success(`Added ${quantity}x ${product.name} to your bag! 🚀`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;
    setUserReviews((prev) => [
      { id: Date.now(), name: newReviewName, rating: 5, date: "Just now", text: newReviewText },
      ...prev
    ]);
    setNewReviewName("");
    setNewReviewText("");
    toast.success("Thank you for submitting your verified review! 🌟");
  };

  const complementaryProducts = PRODUCTS.filter((p) => product.complementaryProductIds?.includes(p.id));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-primary transition-colors">Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-semibold truncate">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden glass-card group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>{product.aiMatchScore}% AI Match</span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? "border-primary shadow-lg scale-105" : "border-border/60 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="font-semibold text-primary uppercase tracking-wider">{product.brand}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" /> {product.rating} ({product.reviewsCount} verified reviews)
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.tagline}</p>
              </div>

              {/* Price & Stock Meter */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Includes taxes & 2-year AETHER warranty</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {product.stock} Units Left
                  </span>
                  <p className="text-[10px] text-muted-foreground">Dispatched in 24 Hours</p>
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Select Color Finish: <strong className="text-foreground">{selectedColor}</strong></label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color.name ? "border-primary shadow-lg scale-110" : "border-border"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Select Size Option:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-muted/60 border-border/60 hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart Action Bar */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 bg-muted/60 p-2 rounded-2xl border border-border/60">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="flex-1 btn-apple py-4 text-sm flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isLiked ? "bg-rose-500 text-white border-rose-400" : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                </button>
              </div>

              {/* AI Synthesized Pros & Cons */}
              <div className="glass-panel p-5 space-y-3">
                <h4 className="font-semibold text-xs text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> AETHER AI Review Synthesis
                </h4>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <p className="font-bold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Key Highlights:
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      {product.pros.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold text-amber-500 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Considerations:
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      {product.cons.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Specs & Reviews */}
          <div className="mt-16 glass-panel p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-border/60 pb-4 text-sm font-semibold">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-2 border-b-2 transition-all ${activeTab === "specs" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-2 border-b-2 transition-all ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
              >
                Collector Reviews ({userReviews.length})
              </button>
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl bg-muted/40 border border-border/40">
                    <span className="text-muted-foreground block mb-1">{key}</span>
                    <strong className="text-foreground text-sm">{val}</strong>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Submit Form */}
                <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-3">
                  <h5 className="font-semibold text-xs flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-primary" /> Write a Verified Collector Review
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="h-10 px-3 rounded-xl bg-card border border-border/60 text-xs outline-none"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Share your experience regarding craft, sound, or precision..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-card border border-border/60 text-xs outline-none h-20"
                    required
                  />
                  <button type="submit" className="btn-apple text-xs py-2 px-4">
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {userReviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-card border border-border/40 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-foreground">{r.name}</span>
                        <span className="text-muted-foreground text-[10px]">{r.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Complementary Products ("Complete the Look") */}
          {complementaryProducts.length > 0 && (
            <div className="mt-16 space-y-6">
              <h3 className="font-display text-2xl font-bold">Complete The Look</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {complementaryProducts.map((p) => (
                  <div key={p.id} className="glass-card-hover p-4 flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs line-clamp-1">{p.name}</h4>
                      <p className="font-bold text-sm text-primary mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                      <Link to={`/product/${p.id}`} className="text-[11px] text-muted-foreground hover:text-primary underline mt-1 block">
                        View Item
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;


