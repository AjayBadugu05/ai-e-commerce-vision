import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Maximize2, Minimize2, Bot, ShoppingBag } from "lucide-react";
import { AIService, ChatMessage } from "@/services/aiService";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addItem } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Greetings! 👋 I am your **AETHERIA AI Concierge**. I can search our catalog, match products with zero-cost precision, and assist your tactile shopping experience. How can I help you today?",
      timestamp: "Just now"
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (customQuery?: string) => {
    const query = customQuery || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInput("");
    setIsLoading(true);

    try {
      const responseMsg = await AIService.getConciergeResponse(query, messages);
      setMessages((prev) => [...prev, responseMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: "Neural query processed. Let me know if you need further item specifications.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      {/* Floating Neumorphic Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl neu-flat text-foreground hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 shadow-neu-flat hover:shadow-neu-flat-lg group"
          title="Open AI Concierge"
        >
          <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <span className="hidden sm:inline-block font-display font-extrabold text-xs tracking-wide text-foreground">
            AETHERIA AI Assistant
          </span>
        </button>
      )}

      {/* Floating Neumorphic Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 neu-flat-lg rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
            isExpanded
              ? "inset-4 md:inset-8"
              : "bottom-6 right-6 w-[calc(100%-3rem)] md:w-[420px] h-[580px]"
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 neu-flat border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl neu-pressed flex items-center justify-center text-primary">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm text-foreground">AETHERIA AI Assistant</h4>
                <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Zero-Cost Local Intelligence</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Bar */}
          <div className="flex items-center gap-2 p-3 neu-pressed overflow-x-auto text-[11px] font-bold">
            <span className="text-primary font-black whitespace-nowrap">Prompts:</span>
            {["Audio under ₹40k", "Titanium Watches", "Kinetic Shoes", "Active Offers"].map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="neu-badge px-3 py-1 text-[11px] font-extrabold text-foreground hover:text-primary transition-all whitespace-nowrap cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                    msg.sender === "user"
                      ? "neu-pressed text-primary font-extrabold"
                      : "neu-flat text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Recommended Product Embedded Chips */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <p className="text-[10px] font-black text-primary uppercase tracking-wider">Matches:</p>
                      {msg.recommendedProducts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2 rounded-xl neu-pressed gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${p.id}`} className="font-bold text-[11px] truncate block text-foreground hover:text-primary">
                              {p.name}
                            </Link>
                            <span className="text-[10px] font-black text-primary">₹{p.price.toLocaleString("en-IN")}</span>
                          </div>
                          <button
                            onClick={() => addItem(p)}
                            className="neu-btn-primary p-2 rounded-lg"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] text-muted-foreground text-right">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl neu-flat flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="text-xs text-muted-foreground font-bold">Matching visual vectors...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 neu-flat border-t border-border/40 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI Concierge..."
              className="neu-input flex-1 text-xs"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="neu-btn-primary w-11 h-11 rounded-2xl flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};
