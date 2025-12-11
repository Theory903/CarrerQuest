"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Mic, 
  RotateCcw, 
  Loader, 
  User, 
  Sparkles, 
  Brain,
  Briefcase,
  GraduationCap,
  AlertCircle
} from "lucide-react";

interface Message {
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
}

const suggestedQuestions = [
  { text: "What career suits my skills?", icon: Target },
  { text: "How to switch careers?", icon: Briefcase },
  { text: "Best skills for 2025?", icon: TrendingUp },
  { text: "How to prepare for interviews?", icon: GraduationCap },
];

import { Target, TrendingUp } from "lucide-react";

const AIChatBotInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm your AI Career Mentor, powered by advanced AI. I can help you with:\n\n• **Career Path Guidance** - Find careers that match your skills\n• **Interview Preparation** - Tips and practice questions\n• **Resume Building** - Make your resume stand out\n• **Skill Development** - Learn what skills to focus on\n• **Industry Insights** - Current trends and opportunities\n\nWhat would you like to explore today?", 
      sender: "ai",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  const scrollToBottom = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages, autoScrollEnabled]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { 
      text: messageText, 
      sender: "user",
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          conversationId: conversationId
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('rate_limit');
        }
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Save conversation ID for history
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      
      const aiMessage: Message = { 
        text: data.response, 
        sender: "ai",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (err: unknown) {
      console.error("Error fetching AI response:", err);
      
      let errorMessage = "I'm having trouble connecting right now.";
      const isRateLimit = err instanceof Error && err.message === 'rate_limit';
      if (isRateLimit) {
        errorMessage = "I'm receiving too many requests. Please wait a moment and try again.";
      }
      
      // Fallback response
      const fallbackMessage: Message = { 
        text: `${errorMessage}\n\nIn the meantime, here's a tip: Start by identifying your top 3 skills and interests. This self-awareness is the foundation of any good career decision!\n\nFeel free to try again in a moment.`, 
        sender: "ai",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      setError(isRateLimit ? "Rate limited - please wait" : "Offline mode");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    // Clear conversation on backend
    if (conversationId) {
      try {
        await fetch(`${backendUrl}/api/chat/clear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId })
        });
      } catch (e) {
        // Ignore errors when clearing
      }
    }

    setMessages([
      { 
        text: "Hello! I'm your AI Career Mentor, powered by advanced AI. I can help you with:\n\n• **Career Path Guidance** - Find careers that match your skills\n• **Interview Preparation** - Tips and practice questions\n• **Resume Building** - Make your resume stand out\n• **Skill Development** - Learn what skills to focus on\n• **Industry Insights** - Current trends and opportunities\n\nWhat would you like to explore today?", 
        sender: "ai",
        timestamp: new Date()
      },
    ]);
    setInput("");
    setError(null);
    setConversationId(null);
    setAutoScrollEnabled(true);
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setAutoScrollEnabled(isAtBottom);
    }
  };

  const handleVoiceInput = () => {
    setError("Voice input coming soon!");
    setTimeout(() => setError(null), 3000);
  };

  // Format message with markdown-like syntax
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="card-elevated p-0 overflow-hidden h-[700px] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Career Mentor</h3>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Powered by Llama 4
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
          title="New conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
              message.sender === "user" 
                ? "bg-primary-500" 
                : "bg-gradient-to-br from-slate-700 to-slate-800"
            }`}>
              {message.sender === "user" 
                ? <User className="w-4 h-4 text-white" />
                : <Sparkles className="w-4 h-4 text-primary-400" />
              }
            </div>
            
            {/* Message */}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-primary-500 text-white rounded-tr-md"
                  : "bg-slate-800/80 text-slate-200 rounded-tl-md"
              }`}
            >
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
              />
              <p className={`text-xs mt-2 ${
                message.sender === "user" ? "text-primary-200" : "text-slate-500"
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-400" />
            </div>
            <div className="bg-slate-800/80 px-4 py-3 rounded-2xl rounded-tl-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-slate-400 text-sm ml-2">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4">
          <p className="text-slate-500 text-xs mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSend(question.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-700/60 hover:text-white transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-400" />
                  {question.text}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="mx-6 mb-4 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-900/30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleVoiceInput}
            className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all flex-shrink-0"
            title="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
              placeholder="Ask about careers, skills, interviews..."
              disabled={isLoading}
            />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Conversation ID indicator */}
        {conversationId && (
          <p className="text-center text-slate-600 text-xs mt-2">
            Conversation memory active
          </p>
        )}
      </div>
    </div>
  );
};

export default AIChatBotInterface;
