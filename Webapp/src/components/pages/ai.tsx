"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, RotateCcw, Loader } from "lucide-react";
import axios from "axios";

const AIChatBotInterface: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true); // Track auto-scroll state

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001/api/chat";

  const scrollToBottom = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages, autoScrollEnabled]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(backendUrl, { message: input.trim() });
      const aiMessage = { text: response.data.response, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      { text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai" },
    ]);
    setInput("");
    setError(null);
    setAutoScrollEnabled(true); // Re-enable auto-scroll on reset
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

      // Check if the user is near the bottom of the chat
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
      setAutoScrollEnabled(isAtBottom);
    }
  };

  const handleVoiceInput = () => {
    alert("Voice input feature is under development.");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex-1 m-4 border-4 border-gray-700 rounded-lg overflow-hidden flex flex-col shadow-lg">
        <div className="bg-gray-800 p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-mono">AI Assistant</div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg shadow-md ${
                  message.sender === "user" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg bg-gray-700 flex items-center space-x-2">
                <Loader size={18} className="animate-spin" />
                <span>Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 p-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md flex items-center justify-center ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <button
          onClick={handleVoiceInput}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <Mic size={20} />
          <span>Voice Input</span>
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2"
        >
          <RotateCcw size={20} />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default AIChatBotInterface;