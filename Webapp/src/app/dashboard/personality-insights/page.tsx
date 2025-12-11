// src/pages/personality-insights.tsx
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DashboardNavbar from '@/components/Dashboard/DashboardNavbar';
import PRC from '@/components/Dashboard/PersonalityRadarChart';

const PersonalityInsights: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Personality Insights
            </h1>
            <p className="text-slate-400">
              Discover your personality traits and strengths
            </p>
          </div>

          {/* Dashboard Navigation */}
          <DashboardNavbar />

          {/* Chart Content */}
          <div className="card-elevated p-0 overflow-hidden mt-8">
            <PRC />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalityInsights;
