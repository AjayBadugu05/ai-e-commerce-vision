import { useState } from "react";
import { UploadCloud, Camera, Sparkles, X, CheckCircle2 } from "lucide-react";
import { AIService } from "@/services/aiService";
import { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PHOTOS = [
  { name: "Black Studio Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { name: "Titanium Metal Chronograph", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { name: "Performance Running Shoes", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop" }
];

export const VisualSearchModal = ({ isOpen, onClose }: VisualSearchModalProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedResults, setMatchedResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelectSample = (sampleName: string, imgUrl: string) => {
    setSelectedPhoto(imgUrl);
    setIsAnalyzing(true);
    setTimeout(() => {
      const matches = AIService.searchByImage(sampleName);
      setMatchedResults(matches);
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleProductClick = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-xl bg-card/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-magic flex items-center justify-center text-white shadow-glow">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Visual AI Match</h3>
              <p className="text-xs text-muted-foreground">Find visually similar luxury items via image recognition</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-3xl p-8 text-center bg-primary/5 transition-all duration-300 cursor-pointer">
          <UploadCloud className="w-10 h-10 mx-auto text-primary mb-3 animate-float" />
          <h4 className="font-semibold text-sm mb-1">Drag & Drop or Click to Upload Image</h4>
          <p className="text-xs text-muted-foreground">Supports PNG, JPG, WebP up to 10MB</p>
        </div>

        {/* Sample Selection */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Or select a visual sample to test:
          </p>
          <div className="grid grid-cols-3 gap-3">
            {SAMPLE_PHOTOS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSelectSample(sample.name, sample.img)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all group ${
                  selectedPhoto === sample.img ? "border-primary shadow-glow scale-105" : "border-border/60 hover:border-primary/40"
                }`}
              >
                <img src={sample.img} alt={sample.name} className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-medium line-clamp-1">{sample.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Analyzing Indicator */}
        {isAnalyzing && (
          <div className="py-8 text-center space-y-3 animate-pulse">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-primary">AETHER Neural Engine Analyzing Features & Vectors...</p>
          </div>
        )}

        {/* Matched Results */}
        {!isAnalyzing && matchedResults.length > 0 && (
          <div className="space-y-3 animate-slide-up pt-2">
            <p className="text-xs font-semibold text-success flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> AI Matches Found:
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {matchedResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 hover:bg-muted border border-border/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-semibold text-xs">{product.name}</h4>
                      <span className="text-[10px] text-primary font-bold">{product.aiMatchScore}% Visual Feature Match</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
