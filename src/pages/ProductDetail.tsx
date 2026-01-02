import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
  ThumbsUp,
  User,
} from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones Pro",
    price: 24999,
    originalPrice: 32999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 5,
    reviews: 234,
    description: "Experience premium sound quality with our Wireless Noise-Canceling Headphones Pro. Features 40-hour battery life, premium leather ear cushions, and advanced ANC technology.",
    features: ["40-hour battery", "Active Noise Cancellation", "Premium leather", "Bluetooth 5.2"],
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Premium Leather Watch - Rose Gold Edition",
    price: 37999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop",
    ],
    category: "Accessories",
    rating: 5,
    reviews: 189,
    description: "Elegant rose gold watch with genuine leather strap. Swiss movement, sapphire crystal glass, water-resistant up to 50m.",
    features: ["Swiss movement", "Sapphire crystal", "Water-resistant 50m", "Genuine leather"],
    isNew: true,
  },
  {
    id: "3",
    name: "Designer Sunglasses - Titanium Frame",
    price: 15699,
    originalPrice: 20699,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
    ],
    category: "Eyewear",
    rating: 4,
    reviews: 156,
    description: "Lightweight titanium frame sunglasses with polarized lenses. UV400 protection for ultimate eye care.",
    features: ["Titanium frame", "Polarized lenses", "UV400 protection", "Lightweight"],
    isSale: true,
  },
];

const customerReviews = [
  { id: 1, name: "Rahul S.", rating: 5, date: "2 days ago", comment: "Absolutely love these! The sound quality is incredible and the noise cancellation is top-notch. Worth every rupee! 🎧", helpful: 24 },
  { id: 2, name: "Priya M.", rating: 5, date: "1 week ago", comment: "Best purchase I've made this year. Super comfortable for long listening sessions. Highly recommend! ⭐", helpful: 18 },
  { id: 3, name: "Amit K.", rating: 4, date: "2 weeks ago", comment: "Great product overall. Battery life is amazing. Only wish the case was a bit more compact.", helpful: 12 },
  { id: 4, name: "Sneha R.", rating: 5, date: "3 weeks ago", comment: "Premium quality! The leather feels luxurious and the sound is crystal clear. Perfect gift! 🎁", helpful: 31 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = allProducts.find((p) => p.id === id) || allProducts[0];
  const images = product.images || [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    toast.success(`${quantity}x ${product.name} added to cart! 🎉`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-slide-down">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4 animate-slide-up">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted fun-card">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 badge-new animate-wiggle">NEW ✨</span>
                )}
                {product.isSale && discount > 0 && (
                  <span className="absolute top-4 right-4 badge-sale animate-bounce-slow">-{discount}% 🔥</span>
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-card/90 backdrop-blur flex items-center justify-center shadow-card hover:scale-110 transition-transform"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-card/90 backdrop-blur flex items-center justify-center shadow-card hover:scale-110 transition-transform"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all hover:scale-105 ${
                        selectedImage === idx ? "border-primary shadow-pop" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < product.rating ? "fill-accent text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating}.0 ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl font-bold text-gradient-hero">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-success/20 text-success font-bold text-sm">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features?.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-muted text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 p-2 bg-muted rounded-2xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-card flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl bg-card flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-bouncy h-14 text-lg gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast.success(isLiked ? "Removed from wishlist" : "Added to wishlist! 💖");
                  }}
                  className={`w-14 h-14 rounded-2xl border-2 ${
                    isLiked ? "border-secondary bg-secondary/10 text-secondary" : "border-border"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-secondary" : ""}`} />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center p-4 rounded-2xl bg-muted/50 hover-lift">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Orders over ₹999</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-muted/50 hover-lift">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="text-sm font-semibold">2 Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-muted/50 hover-lift">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 text-magic" />
                  <p className="text-sm font-semibold">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day policy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-accent animate-wiggle" />
              <h2 className="font-display text-3xl font-bold">
                Customer <span className="text-gradient-hero">Reviews</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {customerReviews.map((review, idx) => (
                <div
                  key={review.id}
                  className="fun-card p-6 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-magic flex items-center justify-center text-white font-bold">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{review.comment}</p>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
