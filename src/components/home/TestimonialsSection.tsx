import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "The quality of products here is unmatched. I've never been disappointed with any purchase. The AI recommendations are spot-on!",
    rating: 5,
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Fast shipping, excellent packaging, and premium products. This has become my go-to shopping destination for everything.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "The curated collections make it so easy to find unique pieces. Customer service is exceptional. Highly recommend!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          What Our <span className="text-gradient-gold">Customers</span> Say
        </h2>
        <p className="text-muted-foreground">
          Join thousands of satisfied shoppers worldwide
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="glass-card p-6 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Quote Icon */}
            <Quote className="w-10 h-10 text-primary/30 mb-4" />

            {/* Content */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
