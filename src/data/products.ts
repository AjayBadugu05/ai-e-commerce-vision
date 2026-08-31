export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  isNew?: boolean;
  isSale?: boolean;
  isTrending?: boolean;
  stock: number;
  aiMatchScore: number;
  pros: string[];
  cons: string[];
  complementaryProductIds: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "aether-headphones-pro",
    name: "AETHER Studio Pro ANC Headphones",
    tagline: "Spatial Audio with Titanium Dynamic Drivers",
    price: 34999,
    originalPrice: 42999,
    brand: "AETHER Sound",
    category: "Electronics",
    rating: 4.9,
    reviewsCount: 382,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1000&h=1000&fit=crop"
    ],
    description: "Architected for acoustic mastery. Featuring custom 45mm titanium diaphragms, real-time spatial head tracking, active adaptive noise cancellation, and up to 55 hours of uncompromised hi-res playback.",
    features: [
      "Adaptive Spatial ANC with 8-microphones",
      "Custom 45mm Titanium Acoustic Drivers",
      "55-Hour Continuous Battery Life",
      "Ultra-Soft Anodized Memory Foam Earcups"
    ],
    specs: {
      "Frequency Response": "5Hz - 40,000Hz",
      "Bluetooth Version": "5.4 LE Audio",
      "Charging": "Fast USB-C (10 min = 6 hrs)",
      "Weight": "260 grams"
    },
    colors: [
      { name: "Obsidian Black", hex: "#0f172a" },
      { name: "Space Silver", hex: "#94a3b8" },
      { name: "Champagne Gold", hex: "#d4af37" }
    ],
    isNew: true,
    isSale: true,
    isTrending: true,
    stock: 14,
    aiMatchScore: 98,
    pros: [
      "Unmatched spatial soundstage with head tracking",
      "Battery life exceeds competitors by 15+ hours",
      "Zero ear fatigue after 6+ hours continuous wear"
    ],
    cons: [
      "Carrying case is slightly bulky for small bags"
    ],
    complementaryProductIds: ["aether-keyboard-mesh", "aether-leather-backpack"]
  },
  {
    id: "aether-watch-monolith",
    name: "Monolith Titanium Automatic Watch",
    tagline: "Swiss Self-Winding Chronograph in Grade 5 Titanium",
    price: 89999,
    originalPrice: 105000,
    brand: "Horology Lab",
    category: "Accessories",
    rating: 5.0,
    reviewsCount: 146,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1000&h=1000&fit=crop"
    ],
    description: "Engineering precision meets haute horology. Crafted from Grade 5 aerospace titanium with anti-reflective double-domed sapphire crystal and 200m water resistance.",
    features: [
      "Caliber A-800 Self-Winding Swiss Movement",
      "Grade 5 Aerodynamic Titanium Case",
      "72-Hour Power Reserve Indicator",
      "Water Resistance up to 200m / 20 BAR"
    ],
    specs: {
      "Case Diameter": "41mm",
      "Glass": "Double Curved Sapphire Crystal",
      "Strap Width": "20mm Interchangeable",
      "Movement": "28,800 vph (4Hz)"
    },
    colors: [
      { name: "Titanium Grey", hex: "#475569" },
      { name: "Midnight Rose", hex: "#9f1239" }
    ],
    isNew: true,
    isTrending: true,
    stock: 6,
    aiMatchScore: 96,
    pros: [
      "Indestructible Grade 5 Titanium body",
      "Stunning skeletonized case back",
      "Holds value extremely well"
    ],
    cons: [
      "Limited batch production"
    ],
    complementaryProductIds: ["aether-sunglasses-polar"]
  },
  {
    id: "aether-sunglasses-polar",
    name: "Vapour Titanium Aviator Sunglasses",
    tagline: "Ultra-Lightweight Polarized Zeiss Optics",
    price: 18999,
    originalPrice: 24999,
    brand: "Spectra Eyewear",
    category: "Eyewear",
    rating: 4.8,
    reviewsCount: 219,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1000&h=1000&fit=crop"
    ],
    description: "Handcrafted in Japan with seamless laser-cut titanium frames. Integrated HD polarized lenses reduce 99.9% of glare while offering full UV400 spectrum defense.",
    features: [
      "Japanese Laser-Cut Titanium Frame",
      "HD Polarized Lenses with Anti-Reflective Coating",
      "Weightless Hydrophobic Nose Pads",
      "100% UV400 Full Spectrum Shielding"
    ],
    specs: {
      "Frame Weight": "18g",
      "Lens Tech": "Zeiss HD Polarization",
      "UV Rating": "UV400 Category 3"
    },
    colors: [
      { name: "Gunmetal Black", hex: "#1e293b" },
      { name: "Electrum Gold", hex: "#ca8a04" }
    ],
    isSale: true,
    stock: 22,
    aiMatchScore: 92,
    pros: [
      "Feels practically weightless on the nose",
      "Crystal clear contrast in harsh glare"
    ],
    cons: [
      "Needs protective case when travelling"
    ],
    complementaryProductIds: ["aether-watch-monolith"]
  },
  {
    id: "aether-leather-backpack",
    name: "Nomad Full-Grain Leather Pack",
    tagline: "Handcrafted Italian Leather Travel Companion",
    price: 27999,
    originalPrice: 34999,
    brand: "Vanguard Goods",
    category: "Bags",
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&h=1000&fit=crop"
    ],
    description: "Built for lifetime voyages. Hand-stitched from vegetable-tanned Tuscan full-grain leather, equipped with padded 16-inch laptop sleeves and magnetic quick-access compartments.",
    features: [
      "Tuscan Full-Grain Vegetable Tanned Leather",
      "Padded 16\" Laptop + Tablet Compartment",
      "YKK Excella Waterproof Zippers",
      "Ergonomic Breathable Air-Mesh Backing"
    ],
    specs: {
      "Capacity": "24 Liters",
      "Dimensions": "44cm x 30cm x 15cm",
      "Material": "Full Grain Leather + Brass Hardware"
    },
    colors: [
      { name: "Cognac Brown", hex: "#78350f" },
      { name: "Midnight Onyx", hex: "#020617" }
    ],
    isNew: true,
    stock: 11,
    aiMatchScore: 95,
    pros: [
      "Develops a gorgeous rich patina over time",
      "Water-resistant interior lining protects tech"
    ],
    cons: [
      "Slightly heavier than canvas alternatives"
    ],
    complementaryProductIds: ["aether-headphones-pro"]
  },
  {
    id: "aether-keyboard-mesh",
    name: "CyberDeck Wireless Mechanical Keyboard",
    tagline: "Low-Profile CNC Aluminum with Hot-Swap Switches",
    price: 16999,
    originalPrice: 21999,
    brand: "AETHER Peripheral",
    category: "Electronics",
    rating: 4.7,
    reviewsCount: 195,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&h=1000&fit=crop"
    ],
    description: "Precision engineered tactile feedback. Machined from solid aircraft aluminum with low-profile Gateron hot-swappable mechanical switches and per-key RGB backlighting.",
    features: [
      "CNC Anodized Aluminum Unibody Chassis",
      "Tri-Mode Connectivity (2.4Ghz / Bluetooth 5.2 / USB-C)",
      "Hot-Swappable Custom Mechanical Switches",
      "Sound-Damping Silicone Gasket Mount"
    ],
    specs: {
      "Layout": "75% Compact (84 Keys)",
      "Battery": "4000mAh (up to 200 hours)",
      "Compatibility": "macOS, Windows, iOS, Android"
    },
    colors: [
      { name: "Space Grey", hex: "#334155" },
      { name: "Chalk White", hex: "#f8fafc" }
    ],
    isSale: true,
    stock: 19,
    aiMatchScore: 94,
    pros: [
      "Creamy, satisfying acoustic sound profile",
      "Seamless switching across 3 devices instantly"
    ],
    cons: [
      "Takes 1 day to adjust to low-profile keys"
    ],
    complementaryProductIds: ["aether-headphones-pro"]
  },
  {
    id: "aether-sneaker-apex",
    name: "Apex Kinetic Cushioning Runners",
    tagline: "Carbon Fiber Plate Performance Sneakers",
    price: 21999,
    originalPrice: 27999,
    brand: "Kinetix Lab",
    category: "Footwear",
    rating: 4.9,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&h=1000&fit=crop"
    ],
    description: "Engineered speed meets street aesthetic. Features a full-length curved carbon fiber propulsion plate suspended inside high-rebound Nitrogen-injected foam for maximum energy return.",
    features: [
      "Full-Length Carbon Propulsion Plate",
      "Nitrogen-Injected High Energy Return Foam",
      "Breathable Seamless Fly-Knit Upper",
      "High-Traction Continental Rubber Outsole"
    ],
    specs: {
      "Drop": "8mm",
      "Weight": "210g (Size 9)",
      "Terrain": "Road / Urban Running"
    },
    colors: [
      { name: "Triple Pure White", hex: "#ffffff" },
      { name: "Stealth Slate", hex: "#1e293b" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    isNew: true,
    isTrending: true,
    stock: 25,
    aiMatchScore: 97,
    pros: [
      "Exceptional energy return propels every stride",
      "Ultralight upper feels like wearing socks"
    ],
    cons: [
      "Runs half a size tight for wide feet"
    ],
    complementaryProductIds: ["aether-fitness-ring"]
  },
  {
    id: "aether-fitness-ring",
    name: "AETHER Halo Biometric Smart Ring",
    tagline: "Titanium Continuous Health & Sleep Tracker",
    price: 22999,
    originalPrice: 28999,
    brand: "AETHER Health",
    category: "Fitness",
    rating: 4.8,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1000&h=1000&fit=crop"
    ],
    description: "Unobtrusive wellness monitoring. Forged from polished Grade 5 titanium, tracking heart rate variability, sleep stages, skin temperature, and activity readiness without subscription fees.",
    features: [
      "Continuous HRV, SpO2 & Sleep Tracking",
      "7-Day Battery Life with Fast Wireless Dock",
      "100m Water Resistance Rating",
      "Zero Monthly Subscription Fees"
    ],
    specs: {
      "Water Resistance": "10 ATM / 100m",
      "Weight": "4.5 grams",
      "Connectivity": "Bluetooth LE"
    },
    colors: [
      { name: "Stealth Black", hex: "#0f172a" },
      { name: "Polished Gold", hex: "#eab308" },
      { name: "Titanium Silver", hex: "#cbd5e1" }
    ],
    sizes: ["Size 7", "Size 8", "Size 9", "Size 10", "Size 11"],
    isNew: true,
    stock: 16,
    aiMatchScore: 93,
    pros: [
      "Forget you are wearing it compared to heavy watches",
      "Deep actionable sleep & recovery insights"
    ],
    cons: [
      "Requires sizing kit prior to order confirmation"
    ],
    complementaryProductIds: ["aether-sneaker-apex"]
  },
  {
    id: "aether-coffee-artisan",
    name: "Barista One Precision Espresso System",
    tagline: "Dual Stainless Boiler with PID Temperature Control",
    price: 64999,
    originalPrice: 79999,
    brand: "Artisan Brew",
    category: "Home",
    rating: 5.0,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&h=1000&fit=crop"
    ],
    description: "Café-quality espresso at home. Dual stainless steel boilers allow simultaneous extraction and micro-foam steaming with 0.1°C digital PID temperature accuracy.",
    features: [
      "Dual Italian Stainless Steel Boilers",
      "Digital PID Temperature Controller (±0.1°C)",
      "Commercial 58mm Stainless Portafilter",
      "Integrated Conical Burr Grinder with 30 Settings"
    ],
    specs: {
      "Pressure": "19 Bar Italian Pump",
      "Water Tank": "2.5 Liters",
      "Power": "1800W Fast Heat"
    },
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Brushed Steel", hex: "#94a3b8" }
    ],
    isSale: true,
    stock: 8,
    aiMatchScore: 91,
    pros: [
      "Commercial grade espresso shot quality",
      "Dual boiler allows steaming milk while pulling shots"
    ],
    cons: [
      "Requires counter space for machine footprint"
    ],
    complementaryProductIds: ["aether-desk-lamp"]
  },
  {
    id: "aether-desk-lamp",
    name: "Aura OLED Ambient Task Lamp",
    tagline: "Circadian Rhythm Lighting with Wireless Charging Base",
    price: 12999,
    originalPrice: 16999,
    brand: "Lumina Studio",
    category: "Home",
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&h=1000&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&h=1000&fit=crop"
    ],
    description: "Designed for eye wellness and deep focus. Automatically adjusts color temperature and brightness based on natural solar time, featuring an integrated 15W Qi fast charging base.",
    features: [
      "Auto-Sync Circadian Color Temperature Tuning",
      "Flicker-Free Zero Blue-Light Glare Panel",
      "Integrated 15W Wireless Qi Charging Pad",
      "Precision Touch & Gesture Dimming Controls"
    ],
    specs: {
      "Brightness": "up to 1200 Lux",
      "CRI Rating": "> 98 Ra (Sunlight Match)",
      "Lifespan": "50,000 Hours"
    },
    colors: [
      { name: "Space Grey", hex: "#334155" },
      { name: "Silver Metal", hex: "#e2e8f0" }
    ],
    stock: 14,
    aiMatchScore: 90,
    pros: [
      "CRI 98 color accuracy makes reading & work effortless",
      "Frees desk space by combining light + phone charger"
    ],
    cons: [
      "Power adapter cable is 1.5m long"
    ],
    complementaryProductIds: ["aether-coffee-artisan", "aether-keyboard-mesh"]
  }
];

export const CATEGORIES = [
  { id: "All", name: "All Collections", icon: "Sparkles", desc: "Discover curated luxury items" },
  { id: "Electronics", name: "Electronics", icon: "Headphones", desc: "Hi-Res Audio, Keyboards & Tech" },
  { id: "Accessories", name: "Horology & Accessories", icon: "Watch", desc: "Titanium watches & leather craft" },
  { id: "Eyewear", name: "Eyewear", icon: "Glasses", desc: "Polarized Japanese optical frames" },
  { id: "Footwear", name: "Performance Footwear", icon: "Footprints", desc: "Carbon plate kinetic runners" },
  { id: "Bags", name: "Leather Goods & Bags", icon: "Briefcase", desc: "Full-grain Italian carry packs" },
  { id: "Fitness", name: "Biometric Fitness", icon: "Activity", desc: "Titanium health tracking rings" },
  { id: "Home", name: "Home & Living", icon: "Home", desc: "Precision brewing & lighting" }
];
