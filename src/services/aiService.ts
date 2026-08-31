import { PRODUCTS, Product } from "@/data/products";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionType?: "add_to_cart" | "view_catalog" | "apply_coupon";
}

export class AIService {
  // Conversational response generation with full product context
  static async getConciergeResponse(userQuery: string, history: ChatMessage[]): Promise<ChatMessage> {
    const query = userQuery.toLowerCase();
    let responseText = "";
    let matchedProducts: Product[] = [];

    if (query.includes("headphone") || query.includes("audio") || query.includes("sound") || query.includes("music")) {
      matchedProducts = PRODUCTS.filter((p) => p.category === "Electronics");
      responseText = "I highly recommend the **AETHER Studio Pro ANC Headphones**. They deliver an immersive spatial soundstage with 55 hours of battery life and active head tracking. Would you like me to reserve one in your cart?";
    } else if (query.includes("watch") || query.includes("time") || query.includes("titanium")) {
      matchedProducts = PRODUCTS.filter((p) => p.id === "aether-watch-monolith" || p.id === "aether-fitness-ring");
      responseText = "For titanium horology, our **Monolith Titanium Automatic** (Grade 5 Titanium case, Swiss self-winding movement) is the ultimate statement piece. If you prefer health tracking, check out the **Halo Biometric Smart Ring**!";
    } else if (query.includes("shoe") || query.includes("runner") || query.includes("sneaker") || query.includes("workout")) {
      matchedProducts = PRODUCTS.filter((p) => p.category === "Footwear" || p.category === "Fitness");
      responseText = "Our **Apex Kinetic Cushioning Runners** feature a full-length carbon propulsion plate designed for effortless energy return. Paired with the **Halo Smart Ring**, you get complete workout recovery tracking.";
    } else if (query.includes("discount") || query.includes("coupon") || query.includes("deal") || query.includes("offer")) {
      responseText = "🎉 Use coupon code **`AETHER20`** at checkout to get an extra **20% OFF** your entire luxury order, plus complimentary express shipping over ₹999!";
    } else if (query.includes("under") || query.includes("cheap") || query.includes("budget") || query.includes("price")) {
      matchedProducts = PRODUCTS.filter((p) => p.price <= 20000);
      responseText = `Here are curated items under ₹20,000 in our collection: **${matchedProducts.map((p) => p.name).join(", ")}**. Let me know if you want to explore any in detail!`;
    } else {
      matchedProducts = PRODUCTS.slice(0, 3);
      responseText = `Welcome to AETHER Visionary Commerce! I've curated our top-rated flagship recommendations for you based on your taste vector. How can I assist your shopping journey today?`;
    }

    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      recommendedProducts: matchedProducts.length > 0 ? matchedProducts : undefined
    };
  }

  // Visual Image Search Simulation
  static searchByImage(sampleName: string): Product[] {
    const term = sampleName.toLowerCase();
    if (term.includes("headphone") || term.includes("black")) {
      return [PRODUCTS[0], PRODUCTS[4], PRODUCTS[6]];
    }
    if (term.includes("watch") || term.includes("metallic")) {
      return [PRODUCTS[1], PRODUCTS[2], PRODUCTS[6]];
    }
    return [PRODUCTS[5], PRODUCTS[3], PRODUCTS[0]];
  }

  // Calculate Interest Match Score for User
  static calculatePersonalizedMatch(product: Product, viewedCategories: string[]): number {
    if (viewedCategories.includes(product.category)) {
      return Math.min(99, product.aiMatchScore + 3);
    }
    return product.aiMatchScore;
  }
}
