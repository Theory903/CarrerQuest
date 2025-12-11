"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Bot } from "lucide-react";

// Dynamic import for lazy loading the AIChatBotInterface
const AIChatBotInterface = dynamic(() => import("@/components/pages/ai"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-4">
          <Bot className="w-8 h-8 text-primary-400 animate-pulse" />
        </div>
        <p className="text-slate-400">Loading AI Assistant...</p>
      </div>
    </div>
  )
});

const AIMentorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Career Assistant
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Meet Your{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                AI Career Mentor
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Get instant, personalized career advice powered by advanced AI. 
              Ask anything about career paths, skills, or your professional journey.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="flex-1 pb-8">
        <div className="container mx-auto px-6 h-full">
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={
              <div className="flex items-center justify-center h-[600px]">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-primary-400 animate-pulse" />
                  </div>
                  <p className="text-slate-400">Loading AI Assistant...</p>
                </div>
              </div>
            }>
              <AIChatBotInterface />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIMentorPage;
