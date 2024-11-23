"use client";
import React, { Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Dynamic import for lazy loading the AIChatBotInterface
const AIChatBotInterface = dynamic(() => import("@/components/pages/ai"), { ssr: false });

const Career: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Career Fields | CareerQuest</title>
        <meta name="description" content="Explore detailed blog posts and insights into various career fields." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Career Fields | CareerQuest" />
        <meta
          property="og:description"
          content="Explore detailed blog posts and insights into various career fields."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://careerquest.example.com/career-fields" />
        <meta property="og:image" content="/assets/images/career-quest-banner.png" />
      </Head>

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex-grow">
        <section aria-labelledby="ai-chatbot" className="container mx-auto p-8">
          <h1 id="ai-chatbot" className="text-4xl font-extrabold text-center mb-6">
            Explore Career Fields
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Dive into career insights, advice, and personalized recommendations powered by AI.
          </p>

          {/* AI Chatbot Interface */}
          <Suspense fallback={<p className="text-center text-gray-500">Loading AI Assistant...</p>}>
            <AIChatBotInterface />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Career;