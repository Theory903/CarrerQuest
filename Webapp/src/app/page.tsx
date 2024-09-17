// src/pages/index.tsx
"use client";
import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareerInterestRadar from '@/components/Dashboard/CareerInterestRadar';
import StrengthsWeaknessesBarChart from '@/components/Dashboard/StrengthsWeaknessesBarChart';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>CareerQuest | Home</title>
        <meta name="description" content="Welcome to CareerQuest - Your ultimate career navigation tool." />
      </Head>

      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="text-center py-16 bg-gray-800">
        <h1 className="text-5xl font-bold mb-4">Welcome to CareerQuest</h1>
        <p className="text-lg mb-8">Your ultimate tool for navigating career choices and achieving your goals.</p>
        <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
          Get Started
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Dashboard Overview */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8">Dashboard Overview</h2>
          <div className="space-y-8">
            <CareerInterestRadar />
            <StrengthsWeaknessesBarChart />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="text-center py-16 bg-gray-800 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to take control of your career?</h3>
          <p className="text-lg mb-8">Explore our dashboard and get actionable insights to help you on your career journey.</p>
          <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            Explore Dashboard
          </Link>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
