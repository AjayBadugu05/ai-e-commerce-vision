import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones Pro",
    price: 24999,
    originalPrice: 32999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 5,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Premium Leather Watch - Rose Gold Edition",
    price: 37999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Accessories",
    rating: 5,
    isNew: true,
  },
  {
    id: "3",
    name: "Designer Sunglasses - Titanium Frame",
    price: 15699,
    originalPrice: 20699,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    category: "Eyewear",
    rating: 4,
    isSale: true,
  },
  {
    id: "4",
    name: "Smart Fitness Tracker - Limited Edition",
    price: 16599,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
    category: "Fitness",
    rating: 4,
    isNew: true,
  },
  {
    id: "5",
    name: "Artisan Coffee Maker - Matte Black",
    price: 28999,
    originalPrice: 37299,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
    category: "Home",
    rating: 5,
    isSale: true,
  },
  {
    id: "6",
    name: "Premium Leather Backpack",
    price: 23199,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Bags",
    rating: 5,
    isNew: true,
  },
  {
    id: "7",
    name: "Wireless Mechanical Keyboard",
    price: 13249,
    originalPrice: 16599,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4,
    isSale: true,
  },
  {
    id: "8",
    name: "Minimalist Desk Lamp - LED",
    price: 7449,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    category: "Home",
    rating: 4,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-accent animate-wiggle" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Trending Now
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient-hero">Products</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Handpicked just for you! 🎯
          </p>
        </div>
        <Link to="/shop" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <button className="btn-outline-fun flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};
