import { Link } from "react-router-dom";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop",
    count: "2.5K+ Products",
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    count: "5K+ Products",
  },
  {
    id: "home",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop",
    count: "3K+ Products",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop",
    count: "1.5K+ Products",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Shop by <span className="text-gradient-gold">Category</span>
        </h2>
        <p className="text-muted-foreground">
          Explore our diverse range of premium collections
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">{category.count}</p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
};
