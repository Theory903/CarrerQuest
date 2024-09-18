import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, RotateCcw } from 'lucide-react';

const AIChatBotInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm processing your request. Please wait a moment.", sender: 'ai' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Monitor frame */}
      <div className="flex-1 m-4 border-4 border-gray-700 rounded-lg overflow-hidden flex flex-col">
        {/* Monitor top bar */}
        <div className="bg-gray-800 p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-mono">AI Monitor v1.0</div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="bg-gray-800 p-4 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none"
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md">
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {/* Control panel */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2">
          <Mic size={20} />
          <span>Voice Input</span>
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center space-x-2">
          <RotateCcw size={20} />
          <span>Reset Conversation</span>
        </button>
      </div>
    </div>
  );
};

export default AIChatBotInterface;