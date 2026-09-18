import { useState, useRef } from "react";
import { UploadCloud, Camera, Sparkles, X, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { AIService } from "@/services/aiService";
import { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PHOTOS = [
  { name: "Acoustic Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
  { name: "Titanium Chronograph", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { name: "Kinetic Runners", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop" }
];

export const VisualSearchModal = ({ isOpen, onClose }: VisualSearchModalProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [matchedResults, setMatchedResults] = useState<Product[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const runNeuralScan = (sampleName: string, imgUrl: string) => {
    setSelectedPhoto(imgUrl);
    setIsAnalyzing(true);
    setMatchedResults([]);
    setTimeout(() => {
      const matches = AIService.searchByImage(sampleName);
      setMatchedResults(matches);
      setIsAnalyzing(false);
    }, 900);
  };

  const handleSelectSample = (sampleName: string, imgUrl: string) => {
    runNeuralScan(sampleName, imgUrl);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const resultUrl = e.target?.result as string;
      runNeuralScan(file.name, resultUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleProductClick = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-xl neu-flat-lg rounded-4xl p-6 sm:p-8 space-y-6">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl neu-pressed flex items-center justify-center text-primary">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold text-foreground">Visual AI Lens</h3>
              <p className="text-xs text-muted-foreground font-medium">Instant feature extraction & zero-cost neural indexing</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Drag & Drop Area */}
        <div
          onClick={handleDropzoneClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`neu-pressed rounded-3xl p-6 text-center cursor-pointer relative overflow-hidden transition-all group ${
            isDragging ? "border-2 border-primary bg-primary/5" : ""
          }`}
        >
          {/* Laser Scanner animation effect */}
          {isAnalyzing && (
            <div className="absolute left-0 right-0 h-1 bg-primary shadow-neu-glow animate-laser-scan z-20" />
          )}

          {selectedPhoto ? (
            <div className="flex items-center justify-center gap-4">
              <img src={selectedPhoto} alt="Uploaded vector" className="w-16 h-16 rounded-2xl object-cover neu-flat" />
              <div className="text-left">
                <span className="neu-badge text-[10px] text-primary font-black uppercase mb-1">Vector Input Active</span>
                <p className="text-xs text-foreground font-bold">Image loaded for neural indexing</p>
                <span className="text-[10px] text-muted-foreground">Click to upload another photo</span>
              </div>
            </div>
          ) : (
            <>
              <UploadCloud className="w-10 h-10 mx-auto text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-extrabold text-sm text-foreground mb-1">Drag & Drop Image or Click to Scan</h4>
              <p className="text-xs text-muted-foreground font-medium">Supports PNG, JPG, WebP (Processed 100% locally)</p>
            </>
          )}
        </div>

        {/* Sample Photos selection */}
        <div>
          <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Or test with sample visual vectors:
          </p>
          <div className="grid grid-cols-3 gap-3">
            {SAMPLE_PHOTOS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleSelectSample(sample.name, sample.img)}
                className={`relative rounded-2xl overflow-hidden p-1 transition-all ${
                  selectedPhoto === sample.img ? "neu-pressed ring-2 ring-primary" : "neu-flat hover:scale-[1.03]"
                }`}
              >
                <div className="aspect-square rounded-xl overflow-hidden relative">
                  <img src={sample.img} alt={sample.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white font-extrabold truncate">{sample.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Analyzing Status Indicator */}
        {isAnalyzing && (
          <div className="py-4 text-center space-y-2">
            <div className="w-7 h-7 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-extrabold text-primary animate-pulse">Extracting visual features & matching vectors...</p>
          </div>
        )}

        {/* Matched Results Feed */}
        {!isAnalyzing && matchedResults.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-black text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Neural Match Results:
            </p>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {matchedResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center justify-between p-3 rounded-2xl neu-flat hover:shadow-neu-flat-lg cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-11 h-11 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-extrabold text-xs text-foreground">{product.name}</h4>
                      <span className="text-[10px] text-primary font-black">{product.aiMatchScore}% Feature Match</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
