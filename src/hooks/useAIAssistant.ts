import { useState, useCallback } from 'react';
import { AIService, ChatMessage } from '../services/aiService';
import { sanitizeSearchQuery } from '../lib/sanitizer';

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome',
  sender: 'ai',
  text: 'Greetings! I am your **AETHER AI Concierge**. I can match products based on your style, find instant coupon discounts, or recommend complementary luxury gear. What are you looking for today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function useAIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = useCallback(
    async (textToSend?: string) => {
      const query = sanitizeSearchQuery(textToSend || input);
      if (!query) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      if (!textToSend) setInput('');
      setIsTyping(true);

      try {
        // Simulate real AI processing latency
        await new Promise((res) => setTimeout(res, 600));
        const aiResponse = await AIService.getConciergeResponse(query, messages);
        setMessages((prev) => [...prev, aiResponse]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            sender: 'ai',
            text: 'I encountered a temporary connection glitch. Please feel free to re-ask or browse our curated catalog directly!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [input, messages]
  );

  const clearChat = useCallback(() => {
    setMessages([INITIAL_WELCOME]);
  }, []);

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    clearChat,
  };
}
