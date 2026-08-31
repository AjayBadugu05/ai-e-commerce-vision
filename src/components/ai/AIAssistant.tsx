import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Maximize2, Minimize2, Bot, ShoppingBag, ArrowRight } from "lucide-react";
import { AIService, ChatMessage } from "@/services/aiService";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

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
      text: "Greetings! 👋 I am your **AETHER AI Concierge**. I can search our catalog, calculate personalized fit & style vectors, and reserve luxury items directly in your cart. How can I assist you today?",
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
          text: "I experienced a temporary neural network drop. Please ask again!",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-3xl bg-primary text-primary-foreground shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/20 shadow-glow"
        >
          <div className="w-8 h-8 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline-block font-display font-semibold text-xs tracking-wide">AETHER AI Concierge</span>
        </button>
      )}

      {/* Floating Chat Container */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-card/95 backdrop-blur-3xl rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/20 dark:border-white/10 transition-all duration-300 ${
            isExpanded
              ? "inset-4 md:inset-10"
              : "bottom-6 right-6 w-[calc(100%-3rem)] md:w-[420px] h-[580px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary via-magic to-accent text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base">AETHER AI Concierge</h4>
                <p className="text-[10px] opacity-90">Real-Time Neural Catalog Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-2 p-3 bg-muted/40 overflow-x-auto text-[11px] font-medium border-b border-border/40">
            <span className="text-primary font-bold whitespace-nowrap">Suggested:</span>
            {["Tech under ₹20,000", "Titanium Watches", "Running Shoes", "Promo Codes"].map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 rounded-full bg-card hover:bg-primary/20 hover:text-primary border border-border/60 transition-all whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-md"
                      : "bg-card border border-border/60 rounded-bl-none shadow-sm text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Embedded Recommended Product Cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Matched Products:</p>
                      {msg.recommendedProducts.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border/40 gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${p.id}`} className="font-bold text-[11px] truncate block hover:underline">
                              {p.name}
                            </Link>
                            <span className="text-[10px] font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</span>
                          </div>
                          <button
                            onClick={() => addItem(p)}
                            className="p-2 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="block text-[9px] opacity-60 text-right">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-card border border-border/60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="text-xs text-muted-foreground font-medium">AETHER Neural Engine thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-border/60 bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI Concierge anything..."
              className="flex-1 h-11 px-4 rounded-xl bg-muted/60 border border-transparent focus:border-primary focus:bg-card outline-none text-xs font-medium transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

