import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import {
  Star,
  Heart,
  ShoppingBag,
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
  const [activeTab, setActiveTab] = useState<"specs" | "reviews">("specs");

  // Review Form State
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [userReviews, setUserReviews] = useState([
    { id: 1, name: "Julian Vance", rating: 5, date: "Yesterday", text: "The engineering precision on this piece is breathtaking. The Grade 5 titanium feel is second to none." },
    { id: 2, name: "Siddharth R.", rating: 5, date: "3 days ago", text: "AETHERIA delivered this via air express in under 36 hours. The spatial acoustic clarity is uncompromised." }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-primary transition-colors">Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-black truncate">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Image Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="neu-card p-3 group relative aspect-square overflow-hidden">
                <div className="neu-image-frame w-full h-full relative">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute top-4 left-4 neu-badge text-primary text-xs font-black flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span>{product.aiMatchScore}% Match Vector</span>
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-2xl p-1 transition-all ${
                        selectedImage === idx ? "neu-pressed" : "neu-flat hover:scale-105"
                      }`}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span className="font-black text-primary uppercase tracking-widest">{product.brand}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-foreground">{product.name}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">{product.tagline}</p>
              </div>

              {/* Price & Guarantee Card */}
              <div className="p-5 rounded-3xl neu-pressed flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-black text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through font-bold">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-semibold mt-1">Includes all taxes & 2-year AETHERIA warranty</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-500 flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> {product.stock} Left
                  </span>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">24-Hour Dispatch</p>
                </div>
              </div>

              {/* Color Finish Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground">Color Finish: <strong className="text-foreground">{selectedColor}</strong></label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-9 h-9 rounded-2xl neu-btn flex items-center justify-center transition-all ${
                          selectedColor === color.name ? "neu-pressed text-primary font-bold" : ""
                        }`}
                        title={color.name}
                      >
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Option Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground">Select Size Option:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                          selectedSize === size
                            ? "neu-pressed text-primary font-black"
                            : "neu-flat text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Bag CTA */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 neu-pressed p-1.5 rounded-2xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="flex-1 neu-btn-primary py-4 text-xs font-extrabold flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-white" /> Add to Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-13 h-13 rounded-2xl neu-btn flex items-center justify-center transition-all ${
                    isLiked ? "text-rose-500 font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500" : ""}`} />
                </button>
              </div>

              {/* Pros & Cons AI Synthesis */}
              <div className="neu-flat p-5 rounded-3xl space-y-3">
                <h4 className="font-extrabold text-xs text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-primary" /> AI Specification Highlights
                </h4>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-medium">
                  <div className="space-y-1.5">
                    <p className="font-extrabold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strengths:
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      {product.pros.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-extrabold text-amber-500 flex items-center gap-1">
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

          {/* Specs & Verified Reviews */}
          <div className="mt-16 neu-flat p-6 md:p-8 rounded-4xl space-y-6">
            <div className="flex items-center gap-4 border-b border-border/40 pb-4 text-sm font-bold">
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === "specs" ? "neu-pressed text-primary font-black" : "text-muted-foreground"}`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === "reviews" ? "neu-pressed text-primary font-black" : "text-muted-foreground"}`}
              >
                Verified Reviews ({userReviews.length})
              </button>
            </div>

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-2xl neu-pressed">
                    <span className="text-muted-foreground block mb-1 font-bold">{key}</span>
                    <strong className="text-foreground text-sm font-extrabold">{val}</strong>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <form onSubmit={handleAddReview} className="p-4 rounded-3xl neu-pressed space-y-3">
                  <h5 className="font-extrabold text-xs text-foreground flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-primary" /> Leave a Verified Review
                  </h5>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="neu-input text-xs font-bold"
                    required
                  />
                  <textarea
                    placeholder="Share your experience regarding craft, sound, or precision..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="neu-input text-xs font-bold h-20"
                    required
                  />
                  <button type="submit" className="neu-btn-primary px-5 py-2.5 text-xs font-extrabold">
                    Submit Review
                  </button>
                </form>

                <div className="space-y-3">
                  {userReviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-3xl neu-flat space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-foreground">{r.name}</span>
                        <span className="text-muted-foreground text-[10px] font-bold">{r.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
