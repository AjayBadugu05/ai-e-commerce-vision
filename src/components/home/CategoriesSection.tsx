import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Acoustic Tech",
    tag: "Pro Audio Monitors",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop",
    count: "2.5K+ Items",
  },
  {
    id: "accessories",
    name: "Titanium Horology",
    tag: "Grade 5 Timepieces",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop",
    count: "1.2K+ Items",
  },
  {
    id: "footwear",
    name: "Kinetic Runners",
    tag: "Carbon Fiber Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
    count: "3.4K+ Items",
  },
  {
    id: "travel",
    name: "Leathercraft Travel",
    tag: "Italian Full Grain",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    count: "1.8K+ Items",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Curated Disciplines</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            Explore <span className="text-gradient-hero">Craft Collections</span>
          </h2>
        </div>

        <Link to="/categories" className="neu-btn px-5 py-2.5 text-xs font-extrabold text-primary flex items-center gap-2">
          <span>View All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop`}
            className="group neu-card p-4 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
          >
            <div className="neu-image-frame aspect-[4/3] relative overflow-hidden bg-muted">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 neu-badge text-[10px] text-primary font-black uppercase">
                {category.count}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">{category.tag}</p>
              </div>

              <div className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
