import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Lover",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Amazing products and super fast delivery! I'm absolutely in love with everything I bought. Will definitely shop again! 💕",
    rating: 5,
    emoji: "🛍️",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Best prices I've found anywhere! The quality is top-notch and customer service is incredibly helpful. Highly recommend! 🚀",
    rating: 5,
    emoji: "💻",
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Home Decor Expert",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "The variety is incredible! Found everything I needed for my new apartment. The packaging was beautiful too! ✨",
    rating: 5,
    emoji: "🏠",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-up">
        <span className="text-4xl mb-2 block">💬</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-2">
          Happy <span className="text-gradient-magic">Customers</span>
        </h2>
        <p className="text-muted-foreground">
          See what people are saying about us!
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="fun-card p-6 animate-slide-up hover-lift"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Emoji & Quote */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">{testimonial.emoji}</span>
              <Quote className="w-8 h-8 text-primary/20" />
            </div>

            {/* Content */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-2xl object-cover ring-4 ring-primary/20"
              />
              <div>
                <h4 className="font-display font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
