import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    emoji: "🎧",
    description: "Gadgets, devices & tech accessories",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop",
    count: "2,500+",
    color: "from-primary to-magic",
  },
  {
    id: "fashion",
    name: "Fashion",
    emoji: "👗",
    description: "Clothing, shoes & style essentials",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    count: "5,000+",
    color: "from-secondary to-accent",
  },
  {
    id: "home",
    name: "Home & Living",
    emoji: "🏠",
    description: "Furniture, decor & home essentials",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    count: "3,000+",
    color: "from-success to-primary",
  },
  {
    id: "accessories",
    name: "Accessories",
    emoji: "⌚",
    description: "Watches, jewelry & personal items",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop",
    count: "1,500+",
    color: "from-magic to-secondary",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    emoji: "🏃",
    description: "Equipment, gear & activewear",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
    count: "1,200+",
    color: "from-accent to-success",
  },
  {
    id: "beauty",
    name: "Beauty & Care",
    emoji: "💄",
    description: "Skincare, makeup & wellness",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    count: "2,000+",
    color: "from-secondary to-magic",
  },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-card border-2 border-primary/20 mb-6">
              <Sparkles className="w-5 h-5 text-accent animate-wiggle" />
              <span className="font-semibold text-sm">Explore Categories</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Shop by <span className="text-gradient-hero">Category</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Find exactly what you need! Browse through our amazing collections 🎯
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden fun-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div>
                    <span className="text-5xl mb-2 block animate-bounce-slow">{category.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                        {category.count} Products
                      </span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Categories;
