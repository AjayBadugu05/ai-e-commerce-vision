import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    emoji: "🎧",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop",
    count: "2.5K+",
    color: "from-primary to-magic",
  },
  {
    id: "fashion",
    name: "Fashion",
    emoji: "👗",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    count: "5K+",
    color: "from-secondary to-accent",
  },
  {
    id: "home",
    name: "Home & Living",
    emoji: "🏠",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    count: "3K+",
    color: "from-success to-primary",
  },
  {
    id: "accessories",
    name: "Accessories",
    emoji: "⌚",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop",
    count: "1.5K+",
    color: "from-magic to-secondary",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-up">
        <span className="text-4xl mb-2 block">🛒</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
          Shop by <span className="text-gradient-energy">Category</span>
        </h2>
        <p className="text-muted-foreground">
          Find exactly what you're looking for!
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
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
            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <span className="text-4xl mb-2 animate-bounce-slow">{category.emoji}</span>
              <h3 className="font-display text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform">
                {category.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm opacity-90">{category.count} Products</p>
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
