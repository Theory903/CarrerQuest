"use client";

import React, { useState, KeyboardEvent } from 'react';

const getDummyAIResponse = (message: string): string => {
  const responses = [
    "That's interesting!",
    "I see. What else can you share?",
    "Hmm, that's a good point.",
    "Thanks for sharing!",
    "Got it. How can I help further?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'ai' }[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue.trim(), type: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      setTimeout(() => {
        const aiMessage = { text: getDummyAIResponse(inputValue), type: 'ai' };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      }, 1000); // Simulate AI response delay

      setInputValue(""); // Clear input field
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line on Enter key press
      if (e.shiftKey) {
        // Shift+Enter for new line
        setInputValue(prev => prev + '\n');
      } else {
        // Enter key to send message
        handleSendMessage();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Chat Area */}
      <main className="flex-grow overflow-y-auto p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg ${msg.type === 'user' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300'}`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Message Input */}
      <footer className="bg-gray-800 border-t border-gray-700 p-4 fixed bottom-0 left-0 right-0">
        <div className="flex items-center gap-2">
          <textarea
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            className="flex-grow p-2 border border-gray-700 rounded-lg outline-none resize-none bg-gray-900 text-gray-100"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatUI;
