import { Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Julian Vance",
    role: "Acoustic Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "The AETHERIA Studio ANC delivers a soundstage that competes with ₹1,50,000 planar magnetic studio monitors. Spatial tracking is astonishing.",
    rating: 5,
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Industrial Architect",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "The Grade 5 Titanium Monolith Watch is a masterpiece of modern horology. The tactile beveling and sapphire clarity under magnification is flawless.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Marcus Chen",
    role: "Biomechanics Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "Apex Kinetic Runners gave me a 4.2% energy efficiency improvement on tempo workouts. The carbon plate curvature is engineered to perfection.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary mb-1">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>AETHERIA Circle</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Verified Collector Experiences
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((story) => (
          <div key={story.id} className="neu-card p-6 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: story.rating }).map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium italic">"{story.content}"</p>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center gap-3">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-10 h-10 rounded-xl neu-pressed object-cover"
              />
              <div>
                <h5 className="font-extrabold text-xs text-foreground">{story.name}</h5>
                <p className="text-[10px] text-primary font-black">{story.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
