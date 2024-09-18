"use client";
import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AIChatBotInterface from '@/components/pages/ai'; // Import the chatbot interface

const Career: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Career Fields | CareerQuest</title>
        <meta name="description" content="Explore detailed blog posts on various career fields." />
      </Head>

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-gray-100 mb-6 text-center">Career Fields</h1>

        {/* AI Chatbot Interface */}
        <div className="mt-8">
          <AIChatBotInterface />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Career;